import { describe, expect, it } from "vitest";
import { projects } from "./translation-projects";

describe("TraduXpress portfolio projects", () => {
  it("contains the six requested projects in both languages", () => {
    expect(projects.map((project) => project.slug)).toEqual([
      "skittles-taste-the-rainbow",
      "campana-gastronomica-salvadorena",
      "informe-de-actividades",
      "comunicacion-corporativa",
      "sitio-web-bilingue",
      "subtitulacion-de-video",
    ]);

    for (const project of projects) {
      expect(project.es.title).toBeTruthy();
      expect(project.en.title).toBeTruthy();
      expect(project.es.imageAlt).toMatch(/ilustrativa/i);
      expect(project.en.imageAlt).toMatch(/illustrative/i);
      expect(project.es.note).toMatch(/Ejercicio independiente de portafolio/i);
      expect(project.en.note).toMatch(/Independent portfolio exercise/i);
    }
  });

  it("keeps every project in preparation until it is explicitly published", () => {
    expect(projects.every((project) => !project.published)).toBe(true);
  });
});
