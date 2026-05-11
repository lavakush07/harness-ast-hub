/**
 * Default bookmark sets per board. The UI can add, edit, delete, and reorder links;
 * those changes live in localStorage. Use "Reset to defaults" to reload from this file.
 */
window.HARNESS_BOOKMARKS = [
  {
    id: "scs",
    accent: "scs",
    logo: "assets/icon-ssca.svg",
    title: "Harness SCS",
    subtitle: "Supply chain · SSCA",
    links: [
      {
        label: "SCS Docs",
        href: "https://developer.harness.io/docs/software-supply-chain-assurance/get-started/overview",
        description: "Goals, posture, SBOM, SLSA, governance",
      },
      {
        label: "SCS PRDs",
        href: "https://ideas.harness.io/",
        description: "New Features",
      },
      {
        label: "SCS Customer account Details",
        href: "https://app.harness.io/",
        description: "Customer Accounts",
      },
      {
        label: "QA",
        href: "https://app.harness.io/",
        description: "QA Account",
      },
      {
        label: "Prod",
        href: "https://app.harness.io/",
        description: "Prod Account",
      },
      {
        label: "HDH Repo",
        href: "https://github.com/harness/developer-hub",
        description: "HDH",
      },
    ],
  },
  {
    id: "sto",
    accent: "sto",
    logo: "assets/icon-sto.svg",
    title: "Harness STO",
    subtitle: "Security Testing Orchestration",
    links: [
      {
        label: "STO Docs",
        href: "https://developer.harness.io/docs/security-testing-orchestration",
        description: "Docs",
      },
      {
        label: "Roadmap-Q2",
        href: "https://developer.harness.io/roadmap",
        description: "Roadmap",
      },
      {
        label: "QA",
        href: "https://app.harness.io/",
        description: "QA Account",
      },
      {
        label: "Scanner Usage metric",
        href: "https://app.harness.io/",
        description: "Usage metrics",
      },
      {
        label: "AST-3.0",
        href: "https://app.harness.io/",
        description: "AST-New design",
      },
    ],
  },
  {
    id: "qwiet",
    accent: "qwiet",
    logo: "assets/icon-qwiet.svg",
    title: "Qwiet AI - SAST / SCA",
    subtitle: "Harness-native scanners",
    links: [
      {
        label: "Qwiet Docs",
        href: "https://developer.harness.io/docs/sast-and-sca",
        description: "Docs",
      },
      {
        label: "Prod",
        href: "https://app.harness.io/",
        description: "Prod Account",
      },
      {
        label: "Documentation Repo",
        href: "https://github.com/harness/developer-hub",
        description: "Docs - Repo",
      },
      {
        label: "Qwiet docs home",
        href: "https://docs.shiftleft.io/",
        description: "Product documentation",
      },
      {
        label: "Software updates",
        href: "https://docs.shiftleft.io/software-updates/2026-updates",
        description: "Release notes",
      },
      {
        label: "My Harness — scans",
        href: "https://app.harness.io/",
        description: "Deep-link scan results if your org uses fixed URLs",
      },
    ],
  },
  {
    id: "ai",
    accent: "ai",
    logo: "assets/icon-ai-learning.svg",
    title: "AI learnings",
    subtitle: "Courses · docs · playbooks",
    links: [
      {
        label: "LangChain docs",
        href: "https://python.langchain.com/docs/",
        description: "Orchestration and RAG patterns",
      },
      {
        label: "Prompt engineering guide",
        href: "https://www.promptingguide.ai/",
        description: "Techniques and patterns",
      },
      {
        label: "Hugging Face — Learn",
        href: "https://huggingface.co/learn",
        description: "NLP and models fundamentals",
      },
      {
        label: "Google AI for Developers",
        href: "https://ai.google.dev/",
        description: "Gemini API and tools",
      },
      {
        label: "Anthropic — Claude docs",
        href: "https://docs.anthropic.com/",
        description: "API and product guides",
      },
      {
        label: "OpenAI platform docs",
        href: "https://platform.openai.com/docs",
        description: "API reference and guides",
      },
    ],
  },
];
