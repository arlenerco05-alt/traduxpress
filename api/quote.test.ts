import { afterEach, describe, expect, it, vi } from "vitest";
import type { CreateEmailOptions } from "resend";
import handler from "./quote";

const sendMock = vi.hoisted(() => vi.fn());
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

type TestResponse = {
  headers: Record<string, string>;
  statusCode: number;
  body?: Record<string, string>;
  setHeader(name: string, value: string): void;
  status(code: number): TestResponse;
  json(body: Record<string, string>): void;
};

function createResponse(): TestResponse {
  return {
    headers: {},
    statusCode: 200,
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
    },
  };
}

const validRequest = {
  method: "POST",
  headers: {
    origin: "https://traduxpress.test",
    host: "traduxpress.test",
    "content-type": "application/json",
    "x-forwarded-for": "198.51.100.42",
  },
  body: {
    name: "Test User",
    email: "person@example.com",
    service: "translation",
    language: "en-es",
    deadline: "",
    description: "A sample translation request.",
    website: "",
  },
};

function configureDelivery() {
  vi.stubEnv("RESEND_API_KEY", "re_test_key");
  sendMock.mockResolvedValue({ data: { id: "email_test_id" }, error: null });
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  sendMock.mockReset();
});

describe("Vercel quote request handler", () => {
  it("does not claim success when email settings are missing", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const response = createResponse();

    await handler(validRequest, response);

    expect(response.statusCode).toBe(503);
    expect(response.body).toEqual({ status: "error", code: "not_configured" });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects spam honeypot submissions without sending email", async () => {
    configureDelivery();
    const response = createResponse();

    await handler({
      ...validRequest,
      body: { ...validRequest.body, website: "spam" },
    }, response);

    expect(response.statusCode).toBe(400);
    expect(response.body?.code).toBe("spam_detected");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("validates required fields before contacting the email provider", async () => {
    configureDelivery();
    const response = createResponse();

    await handler({
      ...validRequest,
      body: { ...validRequest.body, description: "" },
    }, response);

    expect(response.statusCode).toBe(400);
    expect(response.body?.code).toBe("invalid_fields");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("returns success only after Resend accepts the email", async () => {
    configureDelivery();
    const response = createResponse();

    await handler({
      ...validRequest,
      headers: { ...validRequest.headers, "x-forwarded-for": "198.51.100.43" },
    }, response);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
    expect(sendMock).toHaveBeenCalledOnce();
    expect(sendMock).toHaveBeenCalledWith(expect.objectContaining({
      from: "TraduXpress <onboarding@resend.dev>",
      to: ["traduxpress.contacto@gmail.com"],
      replyTo: "person@example.com",
      html: expect.stringContaining("A sample translation request."),
    }));
  });

  it("does not return success when Resend rejects delivery", async () => {
    configureDelivery();
    sendMock.mockResolvedValue({
      data: null,
      error: { name: "validation_error", message: "The request was rejected." },
    });
    const response = createResponse();

    await handler({
      ...validRequest,
      headers: { ...validRequest.headers, "x-forwarded-for": "198.51.100.44" },
    }, response);

    expect(response.statusCode).toBe(502);
    expect(response.body).toEqual({ status: "error", code: "email_delivery_failed" });
  });

  it("rate-limits repeated requests from the same IP", async () => {
    configureDelivery();
    let lastResponse = createResponse();

    for (let attempt = 0; attempt < 5; attempt += 1) {
      lastResponse = createResponse();
      await handler({
        ...validRequest,
        headers: { ...validRequest.headers, "x-forwarded-for": "198.51.100.45" },
      }, lastResponse);
    }

    expect(lastResponse.statusCode).toBe(429);
    expect(lastResponse.body?.code).toBe("rate_limited");
    expect(sendMock).toHaveBeenCalledTimes(4);
  });

  it("escapes user-supplied HTML in the email body", async () => {
    configureDelivery();
    const response = createResponse();

    await handler({
      ...validRequest,
      headers: { ...validRequest.headers, "x-forwarded-for": "198.51.100.46" },
      body: { ...validRequest.body, name: "<script>alert(1)</script>" },
    }, response);

    const email = sendMock.mock.calls[0]?.[0] as CreateEmailOptions;
    expect(email.html).toContain("&lt;script&gt;");
    expect(email.html).not.toContain("<script>");
  });
});
