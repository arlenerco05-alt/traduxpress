import { describe, expect, it } from "vitest";
import { projects } from "./translation-projects";

describe("TraduXpress portfolio projects", () => {
  it("defines the five samples and a sixth upcoming project in both languages", () => {
    expect(projects.map((project) => project.slug)).toEqual([
      "skittles-taste-the-rainbow",
      "capricho-beach-house-localizacion-web",
      "northbridge-business-solutions-edicion",
      "capricho-beach-house-subtitulacion",
      "glossarie-subtitulacion-publicitaria",
      "traduccion-corporativa",
    ]);
    expect(projects.filter((project) => project.available)).toHaveLength(5);

    for (const project of projects) {
      expect(project.es.title).toBeTruthy();
      expect(project.en.title).toBeTruthy();
      expect(project.direction).toHaveLength(2);
      expect(project.media).toBeDefined();
    }
  });

  it("uses the supplied Skittles source line and Salvadoran Spanish adaptation", () => {
    const skittles = projects[0];
    expect(skittles.sourceText).toBe("Taste the Rainbow!");
    expect(skittles.targetText).toBe("¡Saboreá a todo color!");
    expect(skittles.es.note).toBe("Proyecto independiente de muestra. No afiliado ni encargado por Skittles.");
  });

  it("keeps the upcoming corporate project out of detail routes and without media", () => {
    const upcoming = projects.at(-1);
    expect(upcoming?.available).toBe(false);
    expect(upcoming?.media).toEqual({});
    expect(upcoming?.es.note).toBe("Próximamente.");
    expect(upcoming?.en.note).toBe("Coming soon.");
  });

  it("does not point to unprovided media or reuse the localization video", () => {
    const projectsWithVideo = projects.filter((project) => project.media.video);
    expect(projectsWithVideo).toHaveLength(0);
    expect(projects.every((project) => Object.values(project.media).every((value) => value === undefined))).toBe(true);
  });
});
