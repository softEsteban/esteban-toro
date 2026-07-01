// ─────────────────────────────────────────────────────────────────────────────
// All translatable copy lives here, keyed by locale.
// Structural data (icons, layouts, accents, durations) stays in content.ts so
// it is never duplicated across languages.
//
// `es` is typed as `Dictionary` (= the shape of `en`), so the compiler flags
// any key that drifts out of sync between the two languages.
// ─────────────────────────────────────────────────────────────────────────────

export type Locale = "en" | "es";
export const LOCALES: Locale[] = ["en", "es"];
export const DEFAULT_LOCALE: Locale = "en";

const en = {
  product: {
    name: "AI Content Engine",
    badge: "Free Guide",
    headlinePrefix: "Build a content system that turns ",
    headlineHighlight: "one idea into weeks of content",
    headlineSuffix: ".",
    subheadline:
      "Stop creating every post from scratch. Learn the workflow, templates and reusable architecture I use to generate content for TikTok, Reels, Shorts and LinkedIn — powered by Claude Code, Remotion and AI.",
    primaryCta: "Get the Free Guide",
    secondaryCta: "See what's inside",
  },
  problem: {
    eyebrow: "The Real Bottleneck",
    headline: "Building is no longer the bottleneck.",
    body: [
      "Today almost anyone can ship software with AI. The models write the code, the tools deploy it, and a working product is a weekend away.",
      "The hard part isn't building anymore. It's distribution — getting the thing you built in front of the people who need it.",
    ],
    pains: [
      "No time to edit",
      "No repeatable workflow",
      "Every post starts from zero",
      "Publishing is inconsistent",
      "Great products stay invisible",
    ],
  },
  solution: {
    eyebrow: "The Solution",
    title: "One pipeline. Every platform.",
    subtitle:
      "A single idea flows through the engine and comes out the other side as finished video — ready for every feed you publish to.",
    sceneText: "You can build.",
    sceneSubtitle: "Now get seen.",
    // Parallel to PIPELINE_ICONS in content.ts.
    pipeline: [
      { label: "Idea", note: "One thought worth sharing" },
      { label: "Claude Code", note: "Expands it into angles" },
      { label: "Script", note: "Hook, body, payoff" },
      { label: "JSON", note: "Structured scene data" },
      { label: "Remotion", note: "Renders motion video" },
      { label: "Video", note: "Ready-to-post asset" },
      { label: "CapCut", note: "Final polish + captions" },
    ],
  },
  output: {
    eyebrow: "The Output",
    title: "One idea in. A week of content out.",
    subtitle:
      "Feed the engine a single thought. It hands you a batch of ready-to-post videos — each cut for the platform it lands on.",
    ideaLabel: "Your idea",
    ideaQuote: "“Anyone can build now — distribution is the real edge.”",
    ideaBadge: "Runs through the engine",
    // Parallel to OUTPUT_META in content.ts.
    hooks: [
      "I built this app in a weekend",
      "Nobody talks about distribution",
      "3 lines of code changed everything",
      "Building is no longer the bottleneck",
    ],
  },
  templates: {
    eyebrow: "Reusable Templates",
    title: "Build once. Remix forever.",
    subtitle:
      "Every format you need starts as a template you drop your idea into — no more designing from a blank canvas.",
    // Parallel to TEMPLATE_LAYOUTS in content.ts.
    items: [
      { name: "Hook + Reveal", tag: "Short-form" },
      { name: "Listicle", tag: "Carousel" },
      { name: "Talking Head", tag: "Captions" },
      { name: "Code Demo", tag: "Dev" },
      { name: "Before / After", tag: "Transformation" },
      { name: "Big Statement", tag: "Text-only" },
    ],
  },
  learn: {
    eyebrow: "What You'll Learn",
    title: "Everything the system is made of.",
    // Parallel to LEARN_ICONS in content.ts.
    topics: [
      {
        title: "AI Content Architecture",
        description:
          "Design a system where every asset is composable, not disposable — so nothing starts from zero.",
      },
      {
        title: "Claude Code Workflow",
        description:
          "The exact prompts and loops that turn a single idea into a full week of scripts.",
      },
      {
        title: "Reusable Templates",
        description:
          "Build once, remix forever. Templates that flex across formats and platforms.",
      },
      {
        title: "Motion Graphics Library",
        description:
          "A Remotion component kit for scroll-stopping visuals without a designer.",
      },
      {
        title: "Content Creator Framework",
        description:
          "A repeatable structure for hooks, pacing and payoffs that actually convert.",
      },
      {
        title: "Scaling Production",
        description:
          "Go from one post a week to daily output without burning out.",
      },
      {
        title: "Automation Pipeline",
        description:
          "Wire the steps together so rendering and publishing run on autopilot.",
      },
      {
        title: "Common Mistakes",
        description:
          "The traps that keep builders invisible — and how to sidestep every one.",
      },
    ],
  },
  audience: {
    eyebrow: "Who This Is For",
    title: "You can build. Now get seen.",
    subtitle:
      "If you ship things but struggle to get them in front of people, this was made for you.",
    // Parallel to PERSONA_ICONS in content.ts.
    personas: [
      "Developer",
      "Founder",
      "Freelancer",
      "AI Builder",
      "Indie Hacker",
      "Creator",
      "Digital Nomad",
    ],
  },
  guide: {
    eyebrow: "Inside the Guide",
    title: "Eight chapters, one system.",
    chapters: [
      {
        title: "Why distribution matters more than building",
        summary: "The mindset shift that changes everything about how you ship.",
      },
      {
        title: "AI Content Engine Architecture",
        summary: "The full system, mapped end to end.",
      },
      {
        title: "Setting up Claude Code + Remotion",
        summary: "Your environment, configured for speed.",
      },
      {
        title: "Content Creator Framework",
        summary: "The repeatable structure behind every post.",
      },
      {
        title: "Reusable Motion Components",
        summary: "A library you'll use in every video.",
      },
      {
        title: "Automation Pipeline",
        summary: "Render and publish without lifting a finger.",
      },
      {
        title: "Common Mistakes",
        summary: "What to avoid before it costs you months.",
      },
      {
        title: "Next Steps",
        summary: "Your first week with the engine, day by day.",
      },
    ],
  },
  finalCta: {
    badge: "Free Guide",
    headline: "Stop creating content from scratch.",
    body: "Build your own AI-powered content system and start publishing consistently.",
    cta: "Get the Free Guide",
  },
  form: {
    placeholder: "you@yourstartup.com",
    disclaimer: "Free forever. No spam. Unsubscribe anytime.",
    sending: "Sending…",
    successBtn: "Check your inbox",
    successMsg: "You're in. The guide is on its way.",
    errorEmpty: "Please enter your email address.",
    errorFormat: "Please enter a valid email address.",
    errorGeneric: "Something went wrong. Please try again.",
  },
  hero: {
    reelRendered: "Reel rendered",
    reelMeta: "0:24 · vertical",
    templatesCount: "12 templates",
    dragRemix: "drag & remix",
    ideaToJson: "idea → JSON",
    claudeCode: "Claude Code",
    coverBadge: "Free Guide",
    coverKicker: "The Playbook",
    coverSubtitle: "One idea → weeks of content, with Claude Code & Remotion.",
    coverAuthor: "by Esteban Toro",
  },
  footer: "AI Content Engine · Built by Esteban Toro",
};

export type Dictionary = typeof en;

const es: Dictionary = {
  product: {
    name: "AI Content Engine",
    badge: "Guía Gratis",
    headlinePrefix: "Crea un sistema de contenido que convierte ",
    headlineHighlight: "una idea en semanas de contenido",
    headlineSuffix: ".",
    subheadline:
      "Deja de crear cada publicación desde cero. Aprende el flujo de trabajo, las plantillas y la arquitectura reutilizable que uso para generar contenido para TikTok, Reels, Shorts y LinkedIn — con Claude Code, Remotion e IA.",
    primaryCta: "Descargar la guía gratis",
    secondaryCta: "Ver qué incluye",
  },
  problem: {
    eyebrow: "El verdadero cuello de botella",
    headline: "Construir ya no es el cuello de botella.",
    body: [
      "Hoy casi cualquiera puede lanzar software con IA. Los modelos escriben el código, las herramientas lo despliegan y un producto funcional está a un fin de semana de distancia.",
      "Lo difícil ya no es construir. Es la distribución — poner eso que creaste frente a las personas que lo necesitan.",
    ],
    pains: [
      "Sin tiempo para editar",
      "Sin un flujo repetible",
      "Cada post empieza de cero",
      "Publicas de forma inconsistente",
      "Grandes productos quedan invisibles",
    ],
  },
  solution: {
    eyebrow: "La solución",
    title: "Un pipeline. Todas las plataformas.",
    subtitle:
      "Una sola idea fluye por el motor y sale del otro lado como video terminado — listo para cada feed en el que publicas.",
    sceneText: "Puedes construir.",
    sceneSubtitle: "Ahora hazte ver.",
    pipeline: [
      { label: "Idea", note: "Una idea que vale la pena compartir" },
      { label: "Claude Code", note: "La expande en ángulos" },
      { label: "Guion", note: "Hook, cuerpo, remate" },
      { label: "JSON", note: "Datos de escena estructurados" },
      { label: "Remotion", note: "Renderiza video con motion" },
      { label: "Video", note: "Activo listo para publicar" },
      { label: "CapCut", note: "Ajuste final + subtítulos" },
    ],
  },
  output: {
    eyebrow: "El resultado",
    title: "Entra una idea. Sale una semana de contenido.",
    subtitle:
      "Alimenta el motor con un solo pensamiento. Te devuelve un lote de videos listos para publicar — cada uno editado para la plataforma donde aterriza.",
    ideaLabel: "Tu idea",
    ideaQuote: "«Ahora cualquiera puede construir — la distribución es la verdadera ventaja.»",
    ideaBadge: "Pasa por el motor",
    hooks: [
      "Construí esta app en un fin de semana",
      "Nadie habla de la distribución",
      "3 líneas de código lo cambiaron todo",
      "Construir ya no es el cuello de botella",
    ],
  },
  templates: {
    eyebrow: "Plantillas reutilizables",
    title: "Créalas una vez. Reutilízalas siempre.",
    subtitle:
      "Cada formato que necesitas empieza como una plantilla donde sueltas tu idea — se acabó diseñar desde un lienzo en blanco.",
    items: [
      { name: "Gancho + Revelación", tag: "Formato corto" },
      { name: "Lista", tag: "Carrusel" },
      { name: "Cara a cámara", tag: "Subtítulos" },
      { name: "Demo de código", tag: "Dev" },
      { name: "Antes / Después", tag: "Transformación" },
      { name: "Frase potente", tag: "Solo texto" },
    ],
  },
  learn: {
    eyebrow: "Lo que aprenderás",
    title: "Todo lo que compone el sistema.",
    topics: [
      {
        title: "Arquitectura de contenido con IA",
        description:
          "Diseña un sistema donde cada activo es componible, no desechable — para que nada empiece de cero.",
      },
      {
        title: "Flujo de trabajo con Claude Code",
        description:
          "Los prompts y bucles exactos que convierten una idea en una semana entera de guiones.",
      },
      {
        title: "Plantillas reutilizables",
        description:
          "Créalas una vez, remézclalas siempre. Plantillas que se adaptan a formatos y plataformas.",
      },
      {
        title: "Librería de motion graphics",
        description:
          "Un kit de componentes de Remotion para visuales que frenan el scroll, sin diseñador.",
      },
      {
        title: "Framework de creador de contenido",
        description:
          "Una estructura repetible de hooks, ritmo y remates que sí convierte.",
      },
      {
        title: "Escalar la producción",
        description:
          "Pasa de un post por semana a producción diaria sin quemarte.",
      },
      {
        title: "Pipeline de automatización",
        description:
          "Conecta los pasos para que renderizar y publicar corran en automático.",
      },
      {
        title: "Errores comunes",
        description:
          "Las trampas que mantienen invisibles a los builders — y cómo esquivar cada una.",
      },
    ],
  },
  audience: {
    eyebrow: "Para quién es",
    title: "Ya sabes construir. Ahora hazte ver.",
    subtitle:
      "Si lanzas cosas pero te cuesta ponerlas frente a la gente, esto es para ti.",
    personas: [
      "Desarrollador",
      "Fundador",
      "Freelancer",
      "Builder de IA",
      "Indie Hacker",
      "Creador",
      "Nómada Digital",
    ],
  },
  guide: {
    eyebrow: "Dentro de la guía",
    title: "Ocho capítulos, un sistema.",
    chapters: [
      {
        title: "Por qué la distribución importa más que construir",
        summary: "El cambio de mentalidad que lo cambia todo sobre cómo lanzas.",
      },
      {
        title: "Arquitectura del AI Content Engine",
        summary: "El sistema completo, mapeado de principio a fin.",
      },
      {
        title: "Configurar Claude Code + Remotion",
        summary: "Tu entorno, listo para la velocidad.",
      },
      {
        title: "Framework de creador de contenido",
        summary: "La estructura repetible detrás de cada post.",
      },
      {
        title: "Componentes de motion reutilizables",
        summary: "Una librería que usarás en cada video.",
      },
      {
        title: "Pipeline de automatización",
        summary: "Renderiza y publica sin mover un dedo.",
      },
      {
        title: "Errores comunes",
        summary: "Qué evitar antes de que te cueste meses.",
      },
      {
        title: "Próximos pasos",
        summary: "Tu primera semana con el motor, día a día.",
      },
    ],
  },
  finalCta: {
    badge: "Guía Gratis",
    headline: "Deja de crear contenido desde cero.",
    body: "Crea tu propio sistema de contenido con IA y empieza a publicar de forma constante.",
    cta: "Descargar la guía gratis",
  },
  form: {
    placeholder: "tu@tustartup.com",
    disclaimer: "Gratis para siempre. Sin spam. Cancela cuando quieras.",
    sending: "Enviando…",
    successBtn: "Revisa tu correo",
    successMsg: "¡Listo! La guía va en camino.",
    errorEmpty: "Ingresa tu correo electrónico.",
    errorFormat: "Ingresa un correo electrónico válido.",
    errorGeneric: "Algo salió mal. Inténtalo de nuevo.",
  },
  hero: {
    reelRendered: "Reel renderizado",
    reelMeta: "0:24 · vertical",
    templatesCount: "12 plantillas",
    dragRemix: "arrastra y remezcla",
    ideaToJson: "idea → JSON",
    claudeCode: "Claude Code",
    coverBadge: "Guía Gratis",
    coverKicker: "El Playbook",
    coverSubtitle: "Una idea → semanas de contenido, con Claude Code y Remotion.",
    coverAuthor: "por Esteban Toro",
  },
  footer: "AI Content Engine · Creado por Esteban Toro",
};

export const dictionaries: Record<Locale, Dictionary> = { en, es };
