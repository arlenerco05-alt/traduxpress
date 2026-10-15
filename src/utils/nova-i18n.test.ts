import { describe, expect, it } from "vitest";
import { getNovaCopy, getNovaLocalePath } from "./nova-i18n";

describe("localized quote request flow", () => {
  it("links the homepage primary CTAs to localized quote pages", () => {
    const spanish = getNovaCopy("pl").sections["nova-hero-wireframe"];
    const english = getNovaCopy("en").sections["nova-hero-wireframe"];

    expect(spanish.primaryCTA.href).toBe("/pl/cotizar/");
    expect(english.primaryCTA.href).toBe("/quote/");
    expect(spanish.secondaryCTA.href).toBe("#uslugi");
    expect(english.secondaryCTA.href).toBe("#services");
  });

  it("switches between the Spanish and English quote page routes", () => {
    expect(getNovaLocalePath("en", "/pl/cotizar/")).toBe("/quote/");
    expect(getNovaLocalePath("pl", "/quote/")).toBe("/pl/cotizar/");
  });

  it("provides the requested Spanish quote page copy and English equivalent", () => {
    const spanish = getNovaCopy("pl").quote;
    const english = getNovaCopy("en").quote;

    expect(spanish.title).toBe("Hablemos de tu proyecto");
    expect(spanish.subtitle).toBe("Cuéntame qué necesitas y prepararé una cotización personalizada para ti");
    expect(spanish.submit).toBe("Enviar solicitud");
    expect(english.title).toBe("Let's discuss your project");
    expect(english.submit).toBe("Send request");
  });
});
