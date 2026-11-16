/**
 * CENTRALISED PORTFOLIO CONTENT
 * ----------------------------------------------------------------------------
 * Every string rendered by the site lives here.
 *
 * Sourcing rule: this file contains ONLY information verified against the
 * previous portfolio source (github.com/Anshum25/anshum-portfolio-2026),
 * Anshum's public GitHub profile, or details he supplied directly.
 * No invented projects, metrics, employers or achievements.
 */

/* -------------------------------------------------------------------------- */
/*  Identity                                                                  */
/* -------------------------------------------------------------------------- */

export const profile = {
  name: 'Anshum Dev',
  wordmark: 'ANSHUM DEV',
  role: 'AI Engineer & Software Engineer',
  roleShort: 'AI & Software Engineer',
  location: 'Ahmedabad, Gujarat, India',
  locationShort: 'Ahmedabad, IN',
  timezone: 'IST · UTC+5:30',
  availability: 'Open to opportunities',
  email: 'anshum25506@gmail.com',
  site: 'https://theanshumdev.site',

  headline: ['Engineering', 'Intelligent', 'Systems.'] as const,
  identity: "I'm Anshum Dev.",
  description:
    'Building AI-powered products, scalable backend systems, and intelligent enterprise automation.',

  /**
   * Long-form biography. Carried over from the previous portfolio's About
   * section, lightly condensed.
   */
  bio: [
    "I'm Anshum Dev, a Computer Science and Technology student focused on building AI-powered software and reliable backend systems.",
    'My work sits at the intersection of Artificial Intelligence and Software Engineering. I enjoy turning practical problems into working systems — from Retrieval-Augmented Generation and semantic search to APIs, databases, enterprise automation, and full-stack applications.',
    'Currently I work as an AI Intern at NivaSync Infotech, where I build enterprise AI solutions, backend services, and ERPNext customisations. That has given me exposure to both AI application development and the engineering required to make software useful in real business environments.',
    "I'm particularly interested in Generative AI, LLM applications, backend architecture, developer tools, and systems that combine intelligent models with dependable software.",
  ],

  pitch:
    "Interested in AI engineering, backend systems, or software development? I'm open to internships, full-time opportunities, and interesting engineering problems.",
} as const;

export const social = {
  github: 'https://github.com/Anshum25',
  linkedin: 'https://linkedin.com/in/anshum-dev',
  x: 'https://x.com/TheAnshumDev',
} as const;

/**
 * Résumé.
 * `available` is false because no résumé file ships with this repository —
 * the previous site's /resume.pdf returned 404. Drop a real file at
 * `public/resume.pdf` and set `available: true` to turn the download on; the
 * UI then switches from "request by email" to a direct download.
 */
export const resume = {
  available: false,
  url: '/resume.pdf',
  filename: 'Anshum-Dev-Resume.pdf',
};

/* -------------------------------------------------------------------------- */
/*  Practice — what he works on (from the previous About section)             */
/* -------------------------------------------------------------------------- */

export const practice = [
  {
    title: 'AI Engineering',
    body: 'Building practical AI applications using LLMs, RAG, embeddings, semantic search, and model APIs.',
  },
  {
    title: 'Backend Engineering',
    body: 'Designing REST APIs, authentication systems, data pipelines, and backend services using Python and FastAPI.',
  },
  {
    title: 'Software Development',
    body: 'Building responsive applications and engineering systems using React, TypeScript, Next.js, and modern web technologies.',
  },
  {
    title: 'Enterprise Systems',
    body: 'Working with ERPNext and the Frappe Framework to implement business workflows, automation, reports, integrations, and custom functionality.',
  },
] as const;

export const method = [
  {
    step: '01',
    title: 'Understand',
    body: 'Understand the actual problem and the people who will use the system.',
  },
  {
    step: '02',
    title: 'Design',
    body: 'Break the problem into clear components, APIs, data flows, and system boundaries.',
  },
  {
    step: '03',
    title: 'Build',
    body: 'Implement the solution with maintainable code and appropriate technologies.',
  },
  {
    step: '04',
    title: 'Improve',
    body: 'Test, debug, measure, optimise, and iterate based on real usage.',
  },
] as const;

export const interests = [
  'Generative AI',
  'Retrieval-Augmented Generation',
  'AI Agents',
  'LLM Applications',
  'Backend Engineering',
  'Python & FastAPI',
  'Enterprise Software',
  'ERPNext & Frappe',
  'Full-stack Development',
  'System Architecture',
] as const;

/* -------------------------------------------------------------------------- */
/*  Education                                                                 */
/* -------------------------------------------------------------------------- */

export const education = {
  degree: 'B.Tech, Computer Science & Technology',
  degreeShort: 'B.Tech CS&T',
  institution: 'L.J. Institute of Engineering & Technology',
  institutionShort: 'L.J. Institute',
  location: 'Ahmedabad, Gujarat',
  period: '2023 — 2027',
  graduation: '2027',
} as const;

/* -------------------------------------------------------------------------- */
/*  Experience                                                                */
/* -------------------------------------------------------------------------- */

export type Role = {
  id: string;
  company: string;
  role: string;
  period: string;
  start: string;
  end: string;
  current: boolean;
  location: string;
  summary: string;
  responsibilities: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    id: 'nivasync',
    company: 'NivaSync Infotech',
    role: 'AI Intern',
    period: 'Apr 2026 — Present',
    start: 'April 2026',
    end: 'Present',
    current: true,
    location: 'Ahmedabad, Gujarat, India',
    summary:
      'Building enterprise AI assistants and the backend services around them, alongside ERPNext customisation work.',
    responsibilities: [
      'Developing enterprise AI assistants built on retrieval-augmented generation.',
      'Building FastAPI backend services, REST endpoints, and data-ingestion pipelines.',
      'Working with Qdrant, embeddings, and metadata filtering for semantic retrieval.',
      'Implementing JWT authentication and role-based access control.',
      'Producing analytics and reporting over assistant usage and retrieval quality.',
      'Customising ERPNext for business workflows, reports, and automation.',
    ],
    stack: ['Python', 'FastAPI', 'RAG', 'Qdrant', 'Embeddings', 'JWT / RBAC', 'ERPNext'],
  },
  {
    id: 'swiftfolios',
    company: 'SwiftFolios',
    role: 'Full Stack Developer',
    period: 'Aug 2025 — Oct 2025',
    start: 'August 2025',
    end: 'October 2025',
    current: false,
    location: 'Remote',
    summary: 'Full-stack product work across a React front end and an API-backed service layer.',
    responsibilities: [
      'Built application interfaces with React and Tailwind CSS.',
      'Integrated REST APIs and implemented authentication flows.',
      'Worked with MongoDB for application data.',
      'Testing and debugging across the front end and API layer.',
      'Supported deployment and infrastructure tasks on AWS.',
    ],
    stack: ['React', 'Tailwind CSS', 'REST APIs', 'Authentication', 'MongoDB', 'AWS'],
  },
];

/* -------------------------------------------------------------------------- */
/*  Expertise                                                                 */
/* -------------------------------------------------------------------------- */

export type SkillGroup = {
  id: string;
  label: string;
  index: string;
  primary: string[];
  extended: string[];
};

/** `primary` shows on the home panel; `extended` adds depth in the overlay. */
export const expertise: SkillGroup[] = [
  {
    id: 'ai',
    label: 'AI & Machine Learning',
    index: '01',
    primary: ['Generative AI', 'RAG', 'LLMs', 'AI Agents', 'Embeddings'],
    extended: ['Semantic Search', 'Prompt Engineering', 'NLP', 'Scikit-learn', 'XGBoost', 'SHAP'],
  },
  {
    id: 'backend',
    label: 'Backend',
    index: '02',
    primary: ['Python', 'FastAPI', 'REST APIs', 'Authentication', 'SQL'],
    extended: ['API Design', 'JWT / RBAC', 'Node.js', 'Express.js', 'MySQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    index: '03',
    primary: ['JavaScript', 'TypeScript', 'React'],
    extended: ['Next.js', 'Tailwind CSS', 'HTML', 'CSS'],
  },
  {
    id: 'enterprise',
    label: 'Enterprise',
    index: '04',
    primary: ['ERPNext', 'Frappe', 'Workflow Automation'],
    extended: ['Custom Reports', 'Role Permissions', 'Client & Server Scripts'],
  },
  {
    id: 'infra',
    label: 'Infrastructure',
    index: '05',
    primary: ['Git', 'Docker', 'Linux', 'AWS', 'Qdrant'],
    extended: ['GitHub', 'Vercel', 'Postman'],
  },
];

/* -------------------------------------------------------------------------- */
/*  Work                                                                      */
/* -------------------------------------------------------------------------- */

export type GlyphKind =
  | 'retrieval'
  | 'engine'
  | 'document'
  | 'ledger'
  | 'factory'
  | 'forecast'
  | 'surface';

export type Project = {
  id: string;
  index: string;
  title: string;
  shortTitle: string;
  tagline: string;
  category: string;
  domain: string;
  featured: boolean;
  glyph: GlyphKind;
  /** The problem the system exists to solve. */
  problem?: string;
  /** What the system does about it. */
  approach?: string;
  stack: string[];
  highlights: string[];
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: 'trms-rag',
    index: '01',
    title: 'Enterprise AI — TRMS RAG Platform',
    shortTitle: 'TRMS RAG Platform',
    tagline:
      'Enterprise AI assistant combining document retrieval, semantic search, access control, and LLM response generation.',
    category: 'AI / GenAI',
    domain: 'Retrieval & Reasoning',
    featured: true,
    glyph: 'retrieval',
    problem:
      'Organisations hold large amounts of internal information that is difficult to search and use efficiently. Keyword search misses meaning, and a general-purpose assistant has no access to the documents that actually answer the question.',
    approach:
      'A retrieval-augmented assistant that ingests and synchronises internal documents, embeds them into a Qdrant vector store, retrieves semantically with metadata filtering, and generates answers through an LLM — with role-based access enforced on the retrieval path so every answer respects the asker’s permissions.',
    stack: [
      'Python',
      'FastAPI',
      'Qdrant',
      'RAG',
      'LLM APIs',
      'MySQL',
      'REST APIs',
      'JWT',
      'Embeddings',
      'Semantic Search',
    ],
    highlights: [
      'Document ingestion and synchronisation pipeline',
      'Embeddings and vector search with Qdrant',
      'Semantic retrieval with metadata filtering',
      'Role-based access control and authentication',
      'Conversation history and AI response generation',
      'Analytics and report generation',
    ],
    links: [
      { label: 'rag-server', href: 'https://github.com/Anshum25/rag-server' },
      { label: 'trms-rag-server-v2', href: 'https://github.com/Anshum25/trms-rag-server-v2' },
      { label: 'trms-ai-chatbot', href: 'https://github.com/Anshum25/trms-ai-chatbot' },
    ],
  },
  {
    id: 'chess-mentor',
    index: '02',
    title: 'ChessMentor AI',
    shortTitle: 'ChessMentor AI',
    tagline: 'AI coaching platform pairing chess-engine analysis with conversational explanation.',
    category: 'AI / Full Stack',
    domain: 'Applied LLM',
    featured: true,
    glyph: 'engine',
    problem:
      'Chess engines identify strong moves but do not teach. A player sees that a move loses half a pawn of evaluation without learning why the resulting position is worse.',
    approach:
      'Stockfish supplies the evaluation; an LLM turns that evaluation into language — explaining the tactical idea behind a move, guiding openings, and reviewing a finished game. A React and TypeScript client sits on a FastAPI analysis backend.',
    stack: ['Python', 'FastAPI', 'Stockfish', 'LLM', 'React', 'TypeScript'],
    highlights: [
      'Move explanations and tactical suggestions',
      'Opening guidance and post-game feedback',
      'Interactive AI coaching sessions',
      'Game analysis backend and APIs',
    ],
    links: [{ label: 'ChessMentor', href: 'https://github.com/Anshum25/ChessMentor' }],
  },
  {
    id: 'erpnext-invoice',
    index: '03',
    title: 'ERPNext AI Invoice Automation',
    shortTitle: 'AI Invoice Automation',
    tagline: 'Vision-model document extraction that drafts ERP documents for human confirmation.',
    category: 'Enterprise Systems',
    domain: 'Enterprise AI',
    featured: true,
    glyph: 'document',
    problem:
      'Entering invoice information into an ERP by hand is repetitive and error-prone, and the cost scales linearly with the volume of paper a business receives.',
    approach:
      'Vision models read the document and return structured fields. The extraction is validated, then drafted into the matching ERPNext document — Sales Invoice, Purchase Invoice, or Delivery Note — and held for human confirmation rather than submitted automatically.',
    stack: ['AI', 'Vision Models', 'Backend APIs', 'ERPNext', 'Python'],
    highlights: [
      'Document understanding and structured extraction',
      'Validation before ERPNext document drafting',
      'Human confirmation workflow on every draft',
      'Sales Invoices, Purchase Invoices, and Delivery Notes',
    ],
    links: [{ label: 'ai_erpnext', href: 'https://github.com/Anshum25/ai_erpnext' }],
  },
  {
    id: 'manuscript-ai',
    index: '04',
    title: 'ManuscriptAI — Descriptive Answer Evaluation',
    shortTitle: 'ManuscriptAI',
    tagline: 'OCR and semantic evaluation of handwritten, descriptive examination answers.',
    category: 'AI / Machine Learning',
    domain: 'Applied ML',
    featured: false,
    glyph: 'document',
    problem:
      'Descriptive answers cannot be marked by exact string matching. Two correct answers rarely use the same words, and the input is handwriting rather than text.',
    approach:
      'Handwritten answers are processed through OCR, including Hindi and other descriptive scripts, then compared against a reference answer semantically rather than literally — with a review and calibration step so a human can correct the grading.',
    stack: ['OCR', 'Python'],
    highlights: [
      'OCR and handwritten answer processing',
      'Hindi and descriptive answer support',
      'Reference-answer comparison',
      'Semantic, reasoning-based grading',
      'Evaluation review and calibration',
    ],
  },
  {
    id: 'business-health',
    index: '05',
    title: 'Business Health Checkup',
    shortTitle: 'Business Health Checkup',
    tagline: 'Frappe v16 app for assessments, scoring, gap analysis, and management reporting.',
    category: 'Enterprise Systems',
    domain: 'Frappe / ERPNext',
    featured: false,
    glyph: 'ledger',
    problem:
      'Business assessments usually live in spreadsheets, which makes scoring inconsistent and the resulting actions impossible to track.',
    approach:
      'A Frappe v16 application that runs structured assessments, scores them, derives gap analysis from the scores, records improvement actions, and generates management reports — all inside the ERP where the follow-through happens.',
    stack: ['Frappe', 'Python', 'ERPNext'],
    highlights: [
      'Structured business health assessments',
      'Scoring and gap analysis',
      'Improvement action tracking',
      'Management reports',
    ],
    links: [
      {
        label: 'business_health_checkup',
        href: 'https://github.com/Anshum25/business_health_checkup',
      },
    ],
  },
  {
    id: 'churn',
    index: '06',
    title: 'Customer Churn Prediction Platform',
    shortTitle: 'Churn Prediction',
    tagline: 'Churn modelling with SHAP explainability and a recommendation decision engine.',
    category: 'Machine Learning',
    domain: 'Applied ML',
    featured: false,
    glyph: 'forecast',
    problem:
      'A churn score on its own is not actionable. A business needs to know which customers are at risk, why, and what to do about each one.',
    approach:
      'Feature engineering feeds a gradient-boosted model; SHAP explains each individual prediction; a decision engine turns those explanations into business recommendations. Inference is served over FastAPI.',
    stack: ['Python', 'Pandas', 'Scikit-learn', 'XGBoost', 'SHAP', 'FastAPI'],
    highlights: [
      'Feature engineering and prediction modelling',
      'Per-customer SHAP explainability',
      'Business recommendation decision engine',
      'FastAPI inference service',
    ],
    links: [{ label: 'churn-platform', href: 'https://github.com/Anshum25/churn-platform' }],
  },
  {
    id: 'verdict-gps',
    index: '07',
    title: 'Verdict — GPS / ERPNext Solution',
    shortTitle: 'Verdict GPS ERP',
    tagline: 'ERP workflow solution for GPS tracking device lifecycle management.',
    category: 'Enterprise Systems',
    domain: 'Frappe / ERPNext',
    featured: false,
    glyph: 'ledger',
    problem:
      'A GPS tracking business has to follow every device and SIM through bundling, activation, renewal, and expiry — a lifecycle standard ERP stock handling does not model.',
    approach:
      'Custom ERPNext doctypes and workflows for device and SIM bundles with ICCID mapping, serial tracking through activation and expiry, subscription logs and renewals, with invoice integration, vehicle mapping, and automated stock entries.',
    stack: ['ERPNext', 'Frappe Framework', 'Python'],
    highlights: [
      'Device SIM Bundle and ICCID mapping',
      'Serial tracking, activation, and expiry workflows',
      'Subscription logs and renewal workflows',
      'Invoice integration and vehicle mapping',
      'Stock Entry automation',
    ],
  },
  {
    id: 'erpnext-manufacturing',
    index: '08',
    title: 'ERPNext Manufacturing & Quality',
    shortTitle: 'Manufacturing & Quality',
    tagline: 'ERP engineering across Manufacturing, Quality, Inventory, and Sales modules.',
    category: 'Enterprise Systems',
    domain: 'Frappe / ERPNext',
    featured: false,
    glyph: 'factory',
    problem:
      'Manufacturing businesses outgrow stock ERP modules quickly — their quality gates, routing, and reporting rarely match the defaults.',
    approach:
      'Custom reports, workflows, and business logic across the Manufacturing, Quality, Inventory, and Sales modules, with role permissions, dashboards, server and client scripts, and SQL query optimisation.',
    stack: ['ERPNext', 'Frappe Framework', 'SQL'],
    highlights: [
      'Custom reports, workflows, and business logic',
      'Role permissions and dashboards',
      'Server scripts, client scripts, SQL optimisation',
    ],
  },
  {
    id: 'nivasync-web',
    index: '09',
    title: 'SkyDot / NivaSync Web',
    shortTitle: 'SkyDot / NivaSync Web',
    tagline: 'Frontend architecture and responsive UI for company websites.',
    category: 'Web / Full Stack',
    domain: 'Frontend',
    featured: false,
    glyph: 'surface',
    problem:
      'A software company’s own site is its first technical impression, and it has to stay maintainable as the company’s offering changes.',
    approach:
      'Component-driven frontend architecture with a responsive layout system, a shared component library, motion, and deployment.',
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    highlights: [
      'Frontend architecture and responsive UI',
      'Component systems and animation',
      'Deployment and UI implementation',
    ],
    links: [{ label: 'nivasync-web', href: 'https://github.com/Anshum25/nivasync-web' }],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

/* -------------------------------------------------------------------------- */
/*  Small metadata readouts                                                   */
/* -------------------------------------------------------------------------- */

export const facts = [
  { label: 'Roles', value: String(experience.length).padStart(2, '0') },
  { label: 'Projects', value: String(projects.length).padStart(2, '0') },
  { label: 'Grad', value: education.graduation },
] as const;

export const footer = {
  copyright: `© ${new Date().getFullYear()} Anshum Dev`,
  note: 'Designed & built by Anshum Dev',
  quote: 'There is so much left to build.',
} as const;
