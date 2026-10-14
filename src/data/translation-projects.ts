type LanguageCode = "en" | "es" | "es-SV";
type PortfolioCategory = "marketing" | "institutional" | "localization" | "audiovisual";

type ProjectCopy = {
  title: string;
  category: string;
  type: string;
  context: string;
  objective: string;
  audience: string;
  decisions: string[];
  visual: string;
  imageAlt: string;
  note: string;
};

export type TranslationProject = {
  slug: string;
  image: string;
  categoryKey: PortfolioCategory;
  published: boolean;
  direction: [LanguageCode, LanguageCode];
  original: string;
  translated: string;
  es: ProjectCopy;
  en: ProjectCopy;
};

export const projects: TranslationProject[] = [
  {
    slug: "skittles-taste-the-rainbow",
    image: "/assets/images/t001-nova/t001-nova-project-laptop.webp",
    categoryKey: "marketing",
    published: false,
    direction: ["en", "es-SV"],
    original: "[Pendiente: texto original de la campaña en inglés.]",
    translated: "[Pendiente: propuesta de transcreación al español salvadoreño.]",
    es: {
      title: "Skittles — Taste the Rainbow",
      category: "Marketing",
      type: "Transcreación publicitaria",
      context: "Adaptación creativa de un eslogan publicitario internacional para el mercado salvadoreño.",
      objective: "Explorar una formulación en español salvadoreño que conserve la intención creativa del mensaje original.",
      audience: "Público del mercado salvadoreño.",
      decisions: ["Las decisiones de transcreación se documentarán cuando se desarrolle la propuesta."],
      visual: "Pendiente. La imagen de esta página es ilustrativa y no es una pieza de campaña.",
      imageAlt: "Imagen ilustrativa provisional para un ejercicio de transcreación publicitaria.",
      note: "Ejercicio independiente de portafolio; no es una colaboración oficial con Skittles ni un trabajo encargado, publicado o aprobado por la marca.",
    },
    en: {
      title: "Skittles — Taste the Rainbow",
      category: "Marketing",
      type: "Advertising transcreation",
      context: "Creative adaptation of an international advertising slogan for the Salvadoran market.",
      objective: "Explore Salvadoran Spanish wording that preserves the creative intent of the original message.",
      audience: "An audience in the Salvadoran market.",
      decisions: ["Transcreation decisions will be documented when the proposal is developed."],
      visual: "Pending. The image on this page is illustrative and is not a campaign asset.",
      imageAlt: "Temporary illustrative image for an advertising transcreation exercise.",
      note: "Independent portfolio exercise; not an official collaboration with Skittles and not commissioned, published, or approved by the brand.",
    },
  },
  {
    slug: "campana-gastronomica-salvadorena",
    image: "/assets/images/t001-nova/t001-nova-project-building.webp",
    categoryKey: "marketing",
    published: false,
    direction: ["es-SV", "en"],
    original: "[Pendiente: texto original de la campaña en español salvadoreño.]",
    translated: "[Pendiente: adaptación al inglés.]",
    es: {
      title: "Campaña gastronómica salvadoreña",
      category: "Marketing",
      type: "Traducción y adaptación cultural",
      context: "Adaptación de contenido publicitario gastronómico para una audiencia angloparlante.",
      objective: "Trasladar el mensaje y sus referencias culturales a un inglés natural para la audiencia prevista.",
      audience: "Audiencia angloparlante; mercado específico por definir.",
      decisions: ["Las decisiones lingüísticas y culturales se documentarán cuando se desarrolle la adaptación."],
      visual: "Pendiente. La imagen de esta página es ilustrativa y no es una pieza publicitaria.",
      imageAlt: "Imagen ilustrativa provisional para un ejercicio de adaptación de contenido gastronómico.",
      note: "Ejercicio independiente de portafolio; no es una colaboración oficial con una marca o negocio ni un trabajo encargado, publicado o aprobado.",
    },
    en: {
      title: "Salvadoran Food Campaign",
      category: "Marketing",
      type: "Translation and cultural adaptation",
      context: "Adaptation of food-related advertising content for an English-speaking audience.",
      objective: "Carry the message and its cultural references into natural English for the intended audience.",
      audience: "English-speaking audience; specific market to be determined.",
      decisions: ["Linguistic and cultural decisions will be documented when the adaptation is developed."],
      visual: "Pending. The image on this page is illustrative and is not an advertising asset.",
      imageAlt: "Temporary illustrative image for a food-content adaptation exercise.",
      note: "Independent portfolio exercise; not an official collaboration with a brand or business and not commissioned, published, or approved.",
    },
  },
  {
    slug: "informe-de-actividades",
    image: "/assets/images/t001-nova/t001-nova-project-laptop.webp",
    categoryKey: "institutional",
    published: false,
    direction: ["es", "en"],
    original: "[Pendiente: fragmento del informe original en español.]",
    translated: "[Pendiente: traducción al inglés.]",
    es: {
      title: "Informe de actividades",
      category: "Institucional",
      type: "Traducción institucional",
      context: "Traducción de un informe organizacional con atención a la terminología y el registro formal.",
      objective: "Mantener la precisión terminológica y un registro formal coherente en inglés.",
      audience: "Personas lectoras del informe; institución y audiencia específicas por definir.",
      decisions: ["La terminología y las decisiones de registro se documentarán cuando se desarrolle la traducción."],
      visual: "Pendiente. La imagen de esta página es ilustrativa y no es una página del informe.",
      imageAlt: "Imagen ilustrativa provisional para un ejercicio de traducción institucional.",
      note: "Ejercicio independiente de portafolio; no es una colaboración oficial con una organización ni un informe encargado, publicado o aprobado.",
    },
    en: {
      title: "Activity Report",
      category: "Institutional",
      type: "Institutional translation",
      context: "Translation of an organizational report, with attention to terminology and formal register.",
      objective: "Maintain terminological accuracy and a consistent formal register in English.",
      audience: "Readers of the report; the specific organization and audience are to be determined.",
      decisions: ["Terminology and register decisions will be documented when the translation is developed."],
      visual: "Pending. The image on this page is illustrative and is not a page from the report.",
      imageAlt: "Temporary illustrative image for an institutional translation exercise.",
      note: "Independent portfolio exercise; not an official collaboration with an organization and not a commissioned, published, or approved report.",
    },
  },
  {
    slug: "comunicacion-corporativa",
    image: "/assets/images/t001-nova/t001-nova-project-building.webp",
    categoryKey: "institutional",
    published: false,
    direction: ["en", "es"],
    original: "[Pendiente: texto original de la comunicación en inglés.]",
    translated: "[Pendiente: traducción al español.]",
    es: {
      title: "Comunicación corporativa",
      category: "Institucional",
      type: "Traducción institucional",
      context: "Traducción de comunicaciones empresariales con énfasis en claridad y precisión.",
      objective: "Comunicar el contenido con claridad y precisión en español, manteniendo el propósito del original.",
      audience: "Personas destinatarias de la comunicación; empresa y público específicos por definir.",
      decisions: ["Las decisiones de terminología, tono y registro se documentarán cuando se desarrolle la traducción."],
      visual: "Pendiente. La imagen de esta página es ilustrativa y no es una comunicación empresarial.",
      imageAlt: "Imagen ilustrativa provisional para un ejercicio de traducción corporativa.",
      note: "Ejercicio independiente de portafolio; no es una colaboración oficial con una empresa ni una comunicación encargada, publicada o aprobada.",
    },
    en: {
      title: "Corporate Communication",
      category: "Institutional",
      type: "Institutional translation",
      context: "Translation of business communications, with an emphasis on clarity and accuracy.",
      objective: "Communicate the content clearly and accurately in Spanish while preserving the source purpose.",
      audience: "Recipients of the communication; the specific company and audience are to be determined.",
      decisions: ["Terminology, tone, and register decisions will be documented when the translation is developed."],
      visual: "Pending. The image on this page is illustrative and is not a business communication.",
      imageAlt: "Temporary illustrative image for a corporate translation exercise.",
      note: "Independent portfolio exercise; not an official collaboration with a company and not a commissioned, published, or approved communication.",
    },
  },
  {
    slug: "sitio-web-bilingue",
    image: "/assets/images/t001-nova/t001-nova-project-laptop.webp",
    categoryKey: "localization",
    published: false,
    direction: ["en", "es-SV"],
    original: "[Pendiente: contenido original del sitio web en inglés.]",
    translated: "[Pendiente: contenido localizado al español salvadoreño.]",
    es: {
      title: "Sitio web bilingüe",
      category: "Localización",
      type: "Localización web",
      context: "Adaptación lingüística y cultural de contenidos digitales para el mercado salvadoreño.",
      objective: "Ajustar el contenido digital al uso lingüístico y al contexto cultural del público salvadoreño.",
      audience: "Público del mercado salvadoreño; sector y organización por definir.",
      decisions: ["Las decisiones de localización se documentarán cuando se desarrolle la adaptación."],
      visual: "Pendiente. La imagen de esta página es ilustrativa y no es una captura del sitio localizado.",
      imageAlt: "Imagen ilustrativa provisional para un ejercicio de localización web.",
      note: "Ejercicio independiente de portafolio; no es una colaboración oficial con una empresa ni un sitio encargado, publicado o aprobado.",
    },
    en: {
      title: "Bilingual Website",
      category: "Localization",
      type: "Website localization",
      context: "Linguistic and cultural adaptation of digital content for the Salvadoran market.",
      objective: "Adapt digital content to the language use and cultural context of a Salvadoran audience.",
      audience: "An audience in the Salvadoran market; sector and organization to be determined.",
      decisions: ["Localization decisions will be documented when the adaptation is developed."],
      visual: "Pending. The image on this page is illustrative and is not a screenshot of the localized site.",
      imageAlt: "Temporary illustrative image for a website localization exercise.",
      note: "Independent portfolio exercise; not an official collaboration with a company and not a commissioned, published, or approved website.",
    },
  },
  {
    slug: "subtitulacion-de-video",
    image: "/assets/images/t001-nova/t001-nova-project-building.webp",
    categoryKey: "audiovisual",
    published: false,
    direction: ["en", "es"],
    original: "[Pendiente: fragmento del guion o diálogo original en inglés.]",
    translated: "[Pendiente: subtítulos traducidos al español.]",
    es: {
      title: "Subtitulación de video",
      category: "Audiovisual",
      type: "Traducción audiovisual",
      context: "Traducción y adaptación de contenido audiovisual mediante subtítulos.",
      objective: "Preparar subtítulos en español que comuniquen el contenido con claridad y se ajusten al material audiovisual.",
      audience: "Audiencia hispanohablante; contenido y plataforma por definir.",
      decisions: ["Las decisiones de traducción, segmentación y sincronización se documentarán cuando se desarrolle el proyecto."],
      visual: "Pendiente. La imagen de esta página es ilustrativa y no es un fotograma del video.",
      imageAlt: "Imagen ilustrativa provisional para un ejercicio de traducción audiovisual.",
      note: "Ejercicio independiente de portafolio; no es una colaboración oficial con una productora ni un video encargado, publicado o aprobado.",
    },
    en: {
      title: "Video Subtitling",
      category: "Audiovisual",
      type: "Audiovisual translation",
      context: "Translation and adaptation of audiovisual content through subtitles.",
      objective: "Prepare Spanish subtitles that communicate the content clearly and fit the audiovisual material.",
      audience: "Spanish-speaking audience; content and platform to be determined.",
      decisions: ["Translation, segmentation, and timing decisions will be documented when the project is developed."],
      visual: "Pending. The image on this page is illustrative and is not a frame from the video.",
      imageAlt: "Temporary illustrative image for an audiovisual translation exercise.",
      note: "Independent portfolio exercise; not an official collaboration with a production company and not a commissioned, published, or approved video.",
    },
  },
];
