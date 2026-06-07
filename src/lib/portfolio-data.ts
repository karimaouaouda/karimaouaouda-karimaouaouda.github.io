export type MediaAsset = {
  src: string;
  storagePath?: string;
  alt: string;
  caption: string;
  kind?: "image" | "video";
  poster?: string;
  posterStoragePath?: string;
};

export type ProjectVideo = {
  title: string;
  url?: string;
  storagePath?: string;
  embedCode?: string;
  provider: "youtube" | "external" | "supabase" | "storage" | "embed";
  type?: "storage" | "embed" | "external" | "youtube";
  poster?: string;
  posterStoragePath?: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  timeline: string;
  summary: string;
  impact: string;
  problem: string;
  solution: string;
  role: string;
  stack: string[];
  highlights: string[];
  responsibilities: string[];
  results: string[];
  mainImage: string;
  mainImageStoragePath?: string;
  gallery: MediaAsset[];
  video?: ProjectVideo;
  featured?: boolean;
};

export type Contribution = {
  title: string;
  kind: "open-source" | "startup" | "mentoring" | "package";
  organization: string;
  timeline: string;
  summary: string;
  stack: string[];
  contribution: string[];
  outcome: string;
  link?: string;
};

export type LearningItem = {
  title: string;
  type: "course" | "video" | "track";
  status: string;
  focus: string;
  notes: string;
  url?: string;
  videoType?: "storage" | "embed" | "external" | "youtube";
  videoUrl?: string;
  videoStoragePath?: string;
  videoEmbedCode?: string;
  thumbnailUrl?: string;
  thumbnailStoragePath?: string;
};

export const profile = {
  name: "Karim Aouaouda",
  role: "Laravel Full-Stack Engineer and Mobile App Builder",
  location: "Guelma, Algeria",
  email: "karimaouaouda.officiel@gmail.com",
  phone: "+213 655 766 709",
  github: "https://github.com/karimaouaouda",
  linkedin: "https://www.linkedin.com/in/karimaouaouda/",
  summary:
    "Master's candidate in Artificial Intelligence with 4+ years of production-grade engineering, strongest in Laravel platforms, React frontends, React Native mobile apps, Electron desktop systems, CI/CD, and secure delivery.",
  availability:
    "Open to international remote, hybrid, onsite, freelance, part-time, and full-time roles.",
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contributions", label: "Contributions" },
  { href: "/learn", label: "Learn" },
];

export const stats = [
  { value: "4+", label: "years building production systems" },
  { value: "40+", label: "healthcare users supported" },
  { value: "15+", label: "security and product patches shipped" },
  { value: "99.9%", label: "reliability target across critical workflows" },
];

export const skills = [
  {
    title: "Laravel Backend",
    description:
      "Architecture, REST APIs, Filament, Livewire, Alpine.js, MySQL, secure sessions, payments, prescriptions, and SaaS workflows.",
    items: ["Laravel", "PHP", "MySQL", "REST APIs", "Filament", "Livewire"],
  },
  {
    title: "Mobile and Frontend",
    description:
      "React interfaces and React Native Expo apps with practical product thinking, responsive UI, and component-driven delivery.",
    items: ["React", "React Native", "Expo", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Desktop and Security",
    description:
      "Electron companions with encrypted local storage, authenticated sync, auto-update flows, and secure release practices.",
    items: ["Electron", "SQLCipher", "JWT", "Encrypted storage", "Auto updates"],
  },
  {
    title: "DevOps and MLOps",
    description:
      "CI/CD automation, Docker, cloud deployment, GitHub Actions, GitLab CI/CD, PyTorch, Optuna, and reproducible ML workflows.",
    items: ["Docker", "GitHub Actions", "GitLab CI/CD", "PyTorch", "Optuna"],
  },
];

export const experiences = [
  {
    role: "Core Developer, Team Lead, Project Maintainer",
    company: "Doctolik",
    timeline: "Sep 2025 - Present",
    location: "Remote / Algeria",
    summary:
      "Leading full-stack delivery for a medical startup platform while improving security posture, architecture, and release reliability.",
    wins: [
      "Built secure medical workflows across Laravel, React, Livewire, Alpine.js, and Filament.",
      "Created a cross-platform Electron companion with SQLCipher encrypted local storage and server synchronization.",
      "Implemented CI/CD, auto-update delivery, maintenance fixes, payment modules, and prescription workflows.",
    ],
  },
  {
    role: "Freelance Laravel Developer",
    company: "Shyftcom Platform",
    timeline: "Jul 2025 - Sep 2025",
    location: "Remote",
    summary:
      "Delivered core Laravel platform features for an early-stage SaaS product under a tight startup timeline.",
    wins: [
      "Designed backend modules, database structures, and API integrations.",
      "Supported founders with practical product structure and production readiness decisions.",
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "doctolik-desktop-companion",
    title: "Secure Desktop Companion for Doctolik",
    category: "Healthcare Desktop App",
    timeline: "Sep 2025 - Present",
    summary:
      "A cross-platform Electron application synchronized with server-side medical operations for offline-first workflows.",
    impact:
      "Supports medical teams with encrypted local data, authenticated sync, and secure update delivery.",
    problem:
      "Healthcare workflows cannot pause when internet connectivity is weak, but sensitive local patient and operational data must stay protected. The product needed a desktop companion that could work offline, synchronize later, and still respect security expectations.",
    solution:
      "A secure Electron architecture with SQLCipher encrypted local storage, authenticated server synchronization, and controlled auto-update delivery. The app keeps critical medical actions available while reducing operational risk around local data.",
    role:
      "Owned the desktop architecture, encrypted storage strategy, authentication flow, synchronization logic, and release pipeline direction.",
    stack: ["Electron", "React", "SQLCipher", "Laravel", "JWT", "CI/CD"],
    highlights: [
      "Implemented SQLCipher encrypted storage and authenticated synchronization.",
      "Designed secure release and in-app auto-update workflows.",
      "Improved reliability for medical workflow continuity when connectivity is limited.",
    ],
    responsibilities: [
      "Designed the offline-first data flow and local persistence model.",
      "Connected the desktop client with Laravel-backed server operations.",
      "Planned secure release behavior for production users.",
    ],
    results: [
      "Enabled medical users to continue work when connectivity is limited.",
      "Improved security posture through encrypted local storage.",
      "Created a stronger foundation for maintainable desktop releases.",
    ],
    mainImage: "/karim-engineering-hero.png",
    gallery: [
      {
        src: "/karim-engineering-hero.png",
        alt: "Secure healthcare desktop workflow dashboard",
        caption: "Secure desktop environment with medical workflow, sync, and protection cues.",
      },
      {
        src: "/mobile-laravel-project.png",
        alt: "Connected mobile and API workflow",
        caption: "API-backed product surfaces connected to backend operations.",
      },
    ],
    featured: true,
  },
  {
    slug: "doctolik-medical-platform",
    title: "Doctolik Medical Platform",
    category: "Laravel Health-Tech Platform",
    timeline: "2025 - Present",
    summary:
      "Production healthcare platform with payment, prescription, maintenance, and operational modules.",
    impact:
      "Improved stability, security posture, and product delivery for 40+ healthcare professionals.",
    problem:
      "The medical platform needed continuous product delivery while handling sensitive workflows, critical bugs, payment logic, prescriptions, and long-term architecture decisions.",
    solution:
      "A production Laravel workflow with React, Livewire, Alpine.js, Filament, CI/CD, and maintenance practices that balance speed with reliability.",
    role:
      "Led full-stack delivery, maintenance, roadmap planning, bug/security fixes, and module development.",
    stack: ["Laravel", "React", "Livewire", "Alpine.js", "Filament", "Docker"],
    highlights: [
      "Led frontend and backend delivery across critical medical workflows.",
      "Shipped security fixes, bug repairs, and roadmap-driven architecture improvements.",
      "Supported CI/CD and deployment automation for reliable releases.",
    ],
    responsibilities: [
      "Built and maintained Laravel modules for medical operations.",
      "Improved architecture, reliability, and security posture.",
      "Coordinated practical technical priorities for a startup team.",
    ],
    results: [
      "Supported 40+ healthcare professionals through production workflows.",
      "Shipped payment and prescription features plus critical patches.",
      "Reduced product risk through better deployment and maintenance habits.",
    ],
    mainImage: "/karim-engineering-hero.png",
    gallery: [
      {
        src: "/karim-engineering-hero.png",
        alt: "Medical product platform workspace",
        caption: "Health-tech platform concept with workflow and security-oriented product surfaces.",
      },
      {
        src: "/mobile-laravel-project.png",
        alt: "Mobile and backend product workflow",
        caption: "Product interfaces supported by Laravel APIs and deployment workflows.",
      },
    ],
    featured: true,
  },
  {
    slug: "mobile-product-apps",
    title: "Mobile Product Apps",
    category: "React Native / Expo",
    timeline: "Ongoing",
    summary:
      "Mobile app work focused on practical product flows, fast iteration, and API-backed experiences.",
    impact:
      "Bridges Laravel backend expertise with mobile interfaces for founders and product teams.",
    problem:
      "Many startup products need mobile experiences that are connected to robust backend APIs without creating duplicated business logic or fragile release flows.",
    solution:
      "React Native and Expo app delivery backed by Laravel APIs, reusable UI patterns, and product-oriented integration decisions.",
    role:
      "Designed mobile flows, connected screens to backend services, and translated backend product logic into usable app experiences.",
    stack: ["React Native", "Expo", "TypeScript", "Laravel APIs", "REST"],
    highlights: [
      "Built and integrated mobile-first flows with API-backed data.",
      "Applied reusable UI patterns across web and mobile surfaces.",
      "Focused on maintainability, responsive interactions, and product clarity.",
    ],
    responsibilities: [
      "Structured mobile screens around real user tasks.",
      "Integrated API-backed data flows and authentication-aware experiences.",
      "Kept the UI maintainable for future startup iteration.",
    ],
    results: [
      "Created a stronger bridge between Laravel backend systems and mobile users.",
      "Improved product readiness for mobile-first workflows.",
      "Showed practical cross-platform delivery beyond web-only engineering.",
    ],
    mainImage: "/mobile-laravel-project.png",
    gallery: [
      {
        src: "/mobile-laravel-project.png",
        alt: "React Native app connected to Laravel backend",
        caption: "Mobile product surfaces connected to backend API and deployment signals.",
      },
      {
        src: "/karim-engineering-hero.png",
        alt: "Full-stack engineering workstation",
        caption: "Full-stack workspace tying mobile, backend, and secure systems together.",
      },
    ],
    featured: true,
  },
  {
    slug: "algorithmic-trading-automation",
    title: "Algorithmic Trading Automation Project",
    category: "Automation System",
    timeline: "In Progress",
    summary:
      "Session-based automation for executing trading actions through authenticated scraping workflows.",
    impact:
      "Explores reliability patterns for high-frequency, authenticated automation flows.",
    problem:
      "Authenticated trading workflows are fragile when sessions expire, target pages change, or automation steps lack traceability and recovery behavior.",
    solution:
      "A session-aware automation framework with scraping logic, execution control, and reliability mechanisms for critical workflows.",
    role:
      "Designed session handling, scraping logic, automation sequencing, and reliability safeguards.",
    stack: ["Python", "Web scraping", "Sessions", "Async workflows"],
    highlights: [
      "Designed session handling and execution reliability mechanisms.",
      "Built scraping and automation logic around authenticated workflows.",
      "Prioritized uptime, traceability, and failure recovery.",
    ],
    responsibilities: [
      "Modeled authenticated session persistence.",
      "Built automation flows around stateful platform interactions.",
      "Planned reliability checks for high-frequency execution.",
    ],
    results: [
      "Improved understanding of robust automation under authenticated constraints.",
      "Created a foundation for measurable reliability and uptime goals.",
    ],
    mainImage: "/karim-engineering-hero.png",
    gallery: [
      {
        src: "/karim-engineering-hero.png",
        alt: "Automation and deployment workflow",
        caption: "Automation concept with pipeline, system state, and execution reliability cues.",
      },
    ],
  },
  {
    slug: "laravel-rater",
    title: "laravel-rater",
    category: "Open Source Package",
    timeline: "Open Source",
    summary:
      "A Laravel package for multi-rater and multi-target rating systems.",
    impact:
      "Contributes reusable package logic to the Laravel ecosystem.",
    problem:
      "Laravel apps often need rating behavior, but single-target rating logic becomes limiting when multiple raters and multiple target models are involved.",
    solution:
      "A reusable Laravel package abstraction for flexible multi-rater and multi-target rating scenarios.",
    role:
      "Designed the package concept, Laravel abstractions, and developer-facing structure.",
    stack: ["Laravel", "PHP", "Package development"],
    highlights: [
      "Designed package abstractions for flexible rating targets.",
      "Published as an open-source contribution for Laravel developers.",
    ],
    responsibilities: [
      "Defined package structure and rating relationships.",
      "Created reusable Laravel-oriented primitives.",
      "Published the work as an open-source contribution.",
    ],
    results: [
      "Added reusable package work to the public Laravel ecosystem.",
      "Demonstrated ability to think beyond one-off application code.",
    ],
    mainImage: "/mobile-laravel-project.png",
    gallery: [
      {
        src: "/mobile-laravel-project.png",
        alt: "Laravel package and API workspace",
        caption: "Backend package development visualized through API and product system surfaces.",
      },
    ],
  },
  {
    slug: "laravel-community",
    title: "Laravel Community Platform",
    category: "Community SaaS",
    timeline: "Project",
    summary:
      "A community feature set covering posts, comments, groups, messaging, and social product flows.",
    impact:
      "Demonstrates breadth in social platforms and Laravel domain modeling.",
    problem:
      "Community products need multiple connected domains: posts, members, groups, comments, messaging, and permissions. Poor structure makes these systems hard to extend.",
    solution:
      "A Laravel community platform organized around reusable social features and maintainable data modeling.",
    role:
      "Built community modules and structured the product primitives for extension.",
    stack: ["Laravel", "Livewire", "MySQL", "Tailwind CSS"],
    highlights: [
      "Implemented community primitives across content and messaging flows.",
      "Structured modular features for posts, groups, comments, and members.",
    ],
    responsibilities: [
      "Implemented social product modules.",
      "Modeled community relationships and feature boundaries.",
      "Built UI flows for posts, comments, groups, and messaging.",
    ],
    results: [
      "Demonstrated broad Laravel domain modeling skills.",
      "Created a feature-rich base for community product experiments.",
    ],
    mainImage: "/mobile-laravel-project.png",
    gallery: [
      {
        src: "/mobile-laravel-project.png",
        alt: "Community platform product workspace",
        caption: "Product surface concept for API-backed social and community workflows.",
      },
    ],
  },
  {
    slug: "mentortron",
    title: "MentorTron",
    category: "AI / Robotics",
    timeline: "Academic Project",
    summary:
      "AI-powered robot mentor concept for university students using voice and vision interaction.",
    impact:
      "Connects practical engineering with AI interaction research and student mentoring.",
    problem:
      "Students often need accessible guidance that can respond through natural interaction, not only static documentation or manual mentoring.",
    solution:
      "An AI mentor concept combining voice, vision, and interactive guidance for university learning support.",
    role:
      "Explored applied AI interaction patterns and system design for an academic mentoring experience.",
    stack: ["Python", "AI", "Computer vision", "Voice interaction"],
    highlights: [
      "Explored human-computer interaction for student guidance.",
      "Integrated AI capabilities into an applied mentoring experience.",
    ],
    responsibilities: [
      "Explored voice and vision-based student interaction.",
      "Connected AI capabilities with a practical mentoring use case.",
      "Designed the project around academic support and accessibility.",
    ],
    results: [
      "Strengthened applied AI product thinking.",
      "Connected AI research themes with real student workflow needs.",
    ],
    mainImage: "/karim-engineering-hero.png",
    gallery: [
      {
        src: "/karim-engineering-hero.png",
        alt: "AI system engineering workspace",
        caption: "Applied AI systems visual tied to automation, interface, and decision support.",
      },
    ],
  },
];

export const contributions: Contribution[] = [
  {
    title: "Doctolik product and platform contribution",
    kind: "startup",
    organization: "Doctolik",
    timeline: "Sep 2025 - Present",
    summary:
      "Contributed as a core developer and maintainer across a healthcare product where production reliability, user trust, and secure delivery matter.",
    stack: ["Laravel", "React", "Electron", "SQLCipher", "Docker", "GitLab CI/CD"],
    contribution: [
      "Maintained production modules and resolved critical bugs/security issues.",
      "Improved technical roadmap, release hygiene, and system architecture.",
      "Built desktop companion capabilities connected to server-side medical workflows.",
    ],
    outcome:
      "Helped stabilize and extend a medical product used by healthcare professionals.",
  },
  {
    title: "laravel-rater package",
    kind: "open-source",
    organization: "Laravel ecosystem",
    timeline: "Open source",
    summary:
      "Published reusable package work for multi-rater, multi-target rating behavior in Laravel applications.",
    stack: ["Laravel", "PHP", "Package development"],
    contribution: [
      "Designed reusable rating abstractions.",
      "Structured package logic for use across multiple application models.",
      "Shared implementation publicly for Laravel developers.",
    ],
    outcome:
      "Adds a public contribution signal and package-design proof to Karim's Laravel profile.",
    link: "https://github.com/karimaouaouda",
  },
  {
    title: "University peer mentoring and architecture support",
    kind: "mentoring",
    organization: "Academic community",
    timeline: "Ongoing",
    summary:
      "Supported peers with system design, project architecture, debugging, and practical implementation choices.",
    stack: ["Laravel", "React", "Python", "Git", "System design"],
    contribution: [
      "Explained architecture and implementation tradeoffs to peers.",
      "Helped structure academic and personal software projects.",
      "Shared practical debugging and delivery habits.",
    ],
    outcome:
      "Shows communication, leadership, and team-growth potential beyond solo implementation.",
  },
  {
    title: "Shyftcom early platform contribution",
    kind: "startup",
    organization: "Shyftcom Platform",
    timeline: "Jul 2025 - Sep 2025",
    summary:
      "Contributed foundational Laravel platform features for an early-stage SaaS product under startup constraints.",
    stack: ["Laravel", "SQL", "REST APIs"],
    contribution: [
      "Built core modules and backend structures.",
      "Supported early product architecture choices.",
      "Delivered production-ready pieces under a tight timeline.",
    ],
    outcome:
      "Demonstrates ability to enter an early product context and ship useful backend work quickly.",
  },
];

export const learningItems: LearningItem[] = [
  {
    title: "Production Laravel Architecture",
    type: "track",
    status: "Active focus",
    focus: "Advanced backend structure, API design, payment flows, security, and maintainable SaaS modules.",
    notes:
      "Used as the core portfolio positioning for full-stack and Laravel-heavy roles.",
  },
  {
    title: "React Native and Expo Product Apps",
    type: "track",
    status: "Active focus",
    focus: "Mobile app UI, API integration, reusable product flows, and cross-platform delivery.",
    notes:
      "Emphasizes the mobile-app side of Karim's skill set for startup and product teams.",
  },
  {
    title: "MLOps with PyTorch and Optuna",
    type: "course",
    status: "In progress",
    focus: "Training reproducibility, hyperparameter tuning, model lifecycle, and automated experiments.",
    notes:
      "Supports AI Engineer, ML Engineer, and MLOps Engineer role targeting.",
  },
  {
    title: "Secure Desktop Delivery with Electron",
    type: "video",
    status: "Documenting",
    focus: "SQLCipher, offline-first storage, authenticated sync, signed releases, and auto-update workflows.",
    notes:
      "A strong candidate for a future technical walkthrough video or case study.",
  },
  {
    title: "CI/CD for Product Teams",
    type: "track",
    status: "Applied",
    focus: "GitHub Actions, GitLab CI/CD, Docker, release automation, and deployment reliability.",
    notes:
      "Connects engineering execution with business reliability and faster shipping.",
  },
];

export const education = [
  {
    degree: "Master's Degree in Artificial Intelligence",
    school: "20 August 1955 University of Skikda",
    timeline: "2024 - June 2026",
    note: "Applied AI systems, optimization, ML engineering, and production-ready AI workflows.",
  },
  {
    degree: "Bachelor's Degree in Software Engineering",
    school: "8 May 1945 University of Guelma",
    timeline: "2021 - June 2024",
    note: "Systems design, database architecture, software principles, and production foundations.",
  },
];

export const recruiterSignals = [
  "Engineering-first profile with practical AI and MLOps execution.",
  "Strong ownership across Laravel backend, React/mobile UI, deployment, security, and maintenance.",
  "Comfortable in startup conditions where architecture, shipping, debugging, and product judgment all matter.",
];
