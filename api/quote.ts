import { Resend } from "resend";

type RequestLike = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
};

type ResponseLike = {
  setHeader(name: string, value: string): void;
  status(code: number): ResponseLike;
  json(body: Record<string, string>): void;
};

type QuoteRequest = {
  name?: unknown;
  email?: unknown;
  service?: unknown;
  language?: unknown;
  deadline?: unknown;
  description?: unknown;
  website?: unknown;
};

const services: Record<string, string> = {
  translation: "English–Spanish translation",
  localization: "Content localization",
  proofreading: "Proofreading and editing",
  subtitling: "Subtitling",
  advertising: "Advertising and communication adaptation",
};
const languages: Record<string, string> = {
  "en-es": "English → Spanish",
  "es-en": "Spanish → English",
  other: "Other",
};
const rateLimitWindowMs = 15 * 60 * 1000;
const maxRequestsPerWindow = 4;
const requestsByIp = new Map<string, { count: number; resetAt: number }>();

function headerValue(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function parseBody(body: unknown): QuoteRequest | null {
  if (typeof body === "string") {
    try {
      const parsed: unknown = JSON.parse(body);
      return typeof parsed === "object" && parsed !== null ? parsed as QuoteRequest : null;
    } catch {
      return null;
    }
  }
  return typeof body === "object" && body !== null ? body as QuoteRequest : null;
}

function respond(res: ResponseLike, status: number, body: Record<string, string>) {
  res.status(status).json(body);
}

function isValidEmail(email: string): boolean {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  })[character] ?? character);
}

function takeRateLimit(ip: string, now: number): boolean {
  for (const [key, entry] of requestsByIp) {
    if (entry.resetAt <= now) requestsByIp.delete(key);
  }
  if (requestsByIp.size > 1000) requestsByIp.clear();

  const current = requestsByIp.get(ip);
  if (!current || current.resetAt <= now) {
    requestsByIp.set(ip, { count: 1, resetAt: now + rateLimitWindowMs });
    return true;
  }
  if (current.count >= maxRequestsPerWindow) return false;
  current.count += 1;
  return true;
}

export default async function handler(req: RequestLike, res: ResponseLike): Promise<void> {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    respond(res, 405, { status: "error", code: "method_not_allowed" });
    return;
  }

  const origin = headerValue(req.headers.origin);
  const requestHost = headerValue(req.headers["x-forwarded-host"]) || headerValue(req.headers.host);
  try {
    if (!origin || !requestHost || new URL(origin).host !== requestHost.split(",")[0].trim()) {
      respond(res, 403, { status: "error", code: "invalid_origin" });
      return;
    }
  } catch {
    respond(res, 403, { status: "error", code: "invalid_origin" });
    return;
  }

  const contentLength = Number(headerValue(req.headers["content-length"]) || 0);
  if (contentLength > 12_000) {
    respond(res, 413, { status: "error", code: "request_too_large" });
    return;
  }

  const payload = parseBody(req.body);
  if (!payload) {
    respond(res, 400, { status: "error", code: "invalid_request" });
    return;
  }

  if (stringValue(payload.website)) {
    respond(res, 400, { status: "error", code: "spam_detected" });
    return;
  }

  const name = stringValue(payload.name);
  const email = stringValue(payload.email);
  const service = stringValue(payload.service);
  const language = stringValue(payload.language);
  const deadline = stringValue(payload.deadline);
  const description = stringValue(payload.description);

  if (
    name.length < 1 || name.length > 120 ||
    !isValidEmail(email) ||
    !Object.hasOwn(services, service) && service !== "" ||
    !Object.hasOwn(languages, language) && language !== "" ||
    deadline && !/^\d{4}-\d{2}-\d{2}$/.test(deadline) ||
    description.length < 1 || description.length > 5000
  ) {
    respond(res, 400, { status: "error", code: "invalid_fields" });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    respond(res, 503, { status: "error", code: "not_configured" });
    return;
  }

  const forwardedFor = headerValue(req.headers["x-forwarded-for"]);
  const ip = forwardedFor.split(",")[0]?.trim() || "unknown";
  if (!takeRateLimit(ip, Date.now())) {
    respond(res, 429, { status: "error", code: "rate_limited" });
    return;
  }

  const requestedService = service ? services[service] : "Not specified";
  const languageCombination = language ? languages[language] : "Not specified";
  const deliveryDate = deadline || "Not specified";
  const safeDescription = escapeHtml(description).replace(/\n/g, "<br>");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "TraduXpress <onboarding@resend.dev>",
      to: ["traduxpress.contacto@gmail.com"],
      replyTo: email,
      subject: "Nueva solicitud de cotización · TraduXpress",
      html: `
        <h1>Nueva solicitud de cotización</h1>
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
        <p><strong>Servicio:</strong> ${escapeHtml(requestedService)}</p>
        <p><strong>Combinación de idiomas:</strong> ${escapeHtml(languageCombination)}</p>
        <p><strong>Fecha de entrega deseada:</strong> ${escapeHtml(deliveryDate)}</p>
        <p><strong>Descripción del proyecto:</strong></p>
        <p>${safeDescription}</p>
      `,
    });

    if (error) {
      console.error("Quote request email delivery failed", error.name, error.message);
      respond(res, 502, { status: "error", code: "email_delivery_failed" });
      return;
    }
  } catch (error) {
    console.error("Quote request email delivery failed", error);
    respond(res, 502, { status: "error", code: "email_delivery_failed" });
    return;
  }

  respond(res, 200, { status: "ok" });
}
