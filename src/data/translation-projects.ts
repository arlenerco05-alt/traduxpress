export type LanguageCode = "en" | "es" | "es-SV";
export type PortfolioCategory = "marketing" | "institutional" | "localization" | "audiovisual";
export type ProjectKind = "transcreation" | "localization" | "editing" | "subtitling";

type ProjectCopy = {
  title: string;
  category: string;
  type: string;
  context: string;
  decisions: string[];
  note: string;
  imageAlt: string;
};

export type ProjectMedia = {
  previewImage?: string;
  originalArtwork?: string;
  adaptedArtwork?: string;
  screenshots?: string[];
  bilingualDocument?: string;
  sourceDocument?: string;
  trackedChangesDocument?: string;
  correctedDocument?: string;
  video?: string;
  poster?: string;
  subtitles?: string;
};

export type TranslationProject = {
  slug: string;
  kind: ProjectKind;
  categoryKey: PortfolioCategory;
  available: boolean;
  direction: [LanguageCode, LanguageCode];
  sourceText?: string;
  targetText?: string;
  beforeText?: string;
  afterText?: string;
  media: ProjectMedia;
  es: ProjectCopy;
  en: ProjectCopy;
};

export const projects: TranslationProject[] = [
  {
    slug: "skittles-taste-the-rainbow",
    kind: "transcreation",
    categoryKey: "marketing",
    available: true,
    direction: ["en", "es-SV"],
    sourceText: "Taste the Rainbow!",
    targetText: "¡Saboreá a todo color!",
    media: {},
    es: {
      title: "Skittles | Transcreación publicitaria",
      category: "Traducción creativa y adaptación publicitaria",
      type: "Transcreación publicitaria",
      context: "Adaptación creativa del eslogan «Taste the Rainbow!» al español salvadoreño.",
      decisions: [
        "El voseo de «saboreá» aporta cercanía y naturalidad en el español salvadoreño.",
        "«A todo color» conserva la asociación con el arcoíris y el tono alegre sin traducir literalmente la estructura del original.",
      ],
      note: "Proyecto independiente de muestra. No afiliado ni encargado por Skittles.",
      imageAlt: "Espacio reservado para la pieza original y la propuesta tipográfica de transcreación.",
    },
    en: {
      title: "Skittles | Advertising transcreation",
      category: "Creative translation and advertising adaptation",
      type: "Advertising transcreation",
      context: "Creative adaptation of “Taste the Rainbow!” into Salvadoran Spanish.",
      decisions: [
        "The voseo form “saboreá” gives the line a natural, locally familiar voice.",
        "“A todo color” keeps the rainbow association and playful tone without following the source structure word for word.",
      ],
      note: "Independent sample project. Not affiliated with or commissioned by Skittles.",
      imageAlt: "Reserved space for the original artwork and typographic transcreation proposal.",
    },
  },
  {
    slug: "capricho-beach-house-localizacion-web",
    kind: "localization",
    categoryKey: "localization",
    available: true,
    direction: ["en", "es-SV"],
    media: {},
    es: {
      title: "Capricho Beach House | Localización web",
      category: "Localización de sitios web",
      type: "Localización web",
      context: "Localización de contenido turístico y hotelero, con atención a la terminología, la naturalidad del español, la experiencia del usuario y la adaptación cultural.",
      decisions: [
        "La terminología turística se ajusta al uso natural del español salvadoreño.",
        "La estructura y el tono se consideran desde la perspectiva de la experiencia de quien visita el sitio.",
      ],
      note: "Muestra independiente de portafolio; no fue encargada por Capricho Beach House.",
      imageAlt: "Espacio reservado para capturas de la localización web de Capricho Beach House.",
    },
    en: {
      title: "Capricho Beach House | Website localization",
      category: "Website localization",
      type: "Website localization",
      context: "Localization of tourism and hospitality content, with attention to terminology, natural Spanish, user experience, and cultural adaptation.",
      decisions: [
        "Tourism terminology is adapted to natural Salvadoran Spanish usage.",
        "Structure and tone are considered from the perspective of the visitor's user experience.",
      ],
      note: "Independent portfolio sample; not commissioned by Capricho Beach House.",
      imageAlt: "Reserved space for screenshots of the Capricho Beach House website localization.",
    },
  },
  {
    slug: "northbridge-business-solutions-edicion",
    kind: "editing",
    categoryKey: "institutional",
    available: true,
    direction: ["en", "en"],
    media: {},
    es: {
      title: "Northbridge Business Solutions | Corrección y edición",
      category: "Corrección de estilo y edición corporativa",
      type: "Corrección y edición",
      context: "Revisión lingüística de un perfil corporativo en inglés estadounidense, enfocada en gramática, puntuación, claridad, coherencia y estilo profesional.",
      decisions: [
        "La revisión se centra en gramática, puntuación, claridad y coherencia del texto.",
        "La edición mantiene un tono profesional en inglés estadounidense.",
      ],
      note: "Proyecto simulado de una empresa ficticia; no representa una organización real.",
      imageAlt: "Espacio reservado para la comparación antes y después del perfil corporativo.",
    },
    en: {
      title: "Northbridge Business Solutions | Copyediting",
      category: "Corporate proofreading and editing",
      type: "Proofreading and copyediting",
      context: "Language review of a corporate profile in US English, focusing on grammar, punctuation, clarity, consistency, and professional style.",
      decisions: [
        "The review focuses on grammar, punctuation, clarity, and consistency.",
        "The edit maintains a professional tone in US English.",
      ],
      note: "Simulated project for a fictional company; it does not represent a real organization.",
      imageAlt: "Reserved space for the before-and-after corporate profile comparison.",
    },
  },
  {
    slug: "capricho-beach-house-subtitulacion",
    kind: "subtitling",
    categoryKey: "audiovisual",
    available: true,
    direction: ["es", "en"],
    media: {},
    es: {
      title: "Capricho Beach House | Subtitulación audiovisual",
      category: "Subtitulación turística y contenido multilingüe",
      type: "Subtitulación audiovisual",
      context: "Traducción, segmentación y sincronización de subtítulos para un reportaje turístico sobre Capricho Beach House y Barra de Santiago, El Salvador. Incluye la transcripción de intervenciones originalmente en inglés.",
      decisions: [
        "La traducción al inglés conserva el contenido y el contexto del reportaje turístico.",
        "La segmentación y sincronización de subtítulos se ajustan al ritmo de las intervenciones.",
      ],
      note: "Muestra independiente de subtitulación; no es un encargo oficial del establecimiento.",
      imageAlt: "Espacio reservado para el video de muestra independiente de subtitulación turística.",
    },
    en: {
      title: "Capricho Beach House | Video subtitling",
      category: "Tourism subtitling and multilingual content",
      type: "Audiovisual subtitling",
      context: "Translation, segmentation, and timing of subtitles for a tourism feature about Capricho Beach House and Barra de Santiago, El Salvador. Includes transcription of dialogue originally spoken in English.",
      decisions: [
        "The English translation preserves the content and context of the tourism feature.",
        "Subtitle segmentation and timing follow the pace of the spoken dialogue.",
      ],
      note: "Independent subtitling sample; not an official commission by the establishment.",
      imageAlt: "Reserved space for the independent tourism subtitling sample video.",
    },
  },
  {
    slug: "glossarie-subtitulacion-publicitaria",
    kind: "subtitling",
    categoryKey: "audiovisual",
    available: true,
    direction: ["en", "es"],
    media: {},
    es: {
      title: "Glossarie | Subtitulación publicitaria",
      category: "Subtitulación audiovisual y traducción publicitaria",
      type: "Subtitulación publicitaria",
      context: "Traducción y subtitulación de un anuncio breve de cuidado de la piel sobre una solución de ácido salicílico al 2 %, con atención a la terminología cosmética, la adaptación del mensaje y la sincronización.",
      decisions: [
        "La terminología cosmética se trata con precisión y claridad.",
        "El diseño de subtítulos previsto utiliza recuadros rosados y texto blanco, sincronizados con el anuncio.",
      ],
      note: "Muestra independiente de portafolio; no se atribuye a un encargo oficial.",
      imageAlt: "Espacio reservado para el video publicitario subtitulado de Glossarie.",
    },
    en: {
      title: "Glossarie | Advertising subtitling",
      category: "Audiovisual subtitling and advertising translation",
      type: "Advertising subtitling",
      context: "Translation and subtitling of a short skincare advertisement for a 2% salicylic acid solution, with attention to cosmetic terminology, message adaptation, and timing.",
      decisions: [
        "Cosmetic terminology is handled with accuracy and clarity.",
        "The planned subtitle design uses pink boxes with white text, timed to the advertisement.",
      ],
      note: "Independent portfolio sample; not represented as an official commission.",
      imageAlt: "Reserved space for the subtitled Glossarie advertising video.",
    },
  },
  {
    slug: "traduccion-corporativa",
    kind: "localization",
    categoryKey: "institutional",
    available: false,
    direction: ["en", "es"],
    media: {},
    es: {
      title: "Traducción corporativa",
      category: "Traducción de documentos empresariales",
      type: "Traducción corporativa",
      context: "Proyecto en desarrollo.",
      decisions: [],
      note: "Próximamente.",
      imageAlt: "Tarjeta de proyecto de traducción corporativa próximamente.",
    },
    en: {
      title: "Corporate translation",
      category: "Business document translation",
      type: "Corporate translation",
      context: "Project in development.",
      decisions: [],
      note: "Coming soon.",
      imageAlt: "Coming soon corporate translation project card.",
    },
  },
];
