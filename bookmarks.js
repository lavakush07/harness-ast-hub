/**
 * Default bookmark sets per board. The UI can add, edit, delete, and reorder links;
 * those changes live in localStorage. Use "Reset to defaults" to reload from this file.
 */
window.HARNESS_BOOKMARKS = [
  {
    id: "scs",
    accent: "scs",
    title: "Harness SCS",
    subtitle: "Supply chain · SSCA",
    links: [
      {
        label: "SCS overview",
        href: "https://developer.harness.io/docs/software-supply-chain-assurance/get-started/overview",
        description: "Goals, posture, SBOM, SLSA, governance",
      },
      {
        label: "Get started",
        href: "https://developer.harness.io/docs/software-supply-chain-assurance/get-started/",
        description: "Onboarding paths and setup",
      },
      {
        label: "Key concepts",
        href: "https://developer.harness.io/docs/software-supply-chain-assurance/get-started/key-concepts",
        description: "Terminology and architecture",
      },
      {
        label: "What’s supported",
        href: "https://developer.harness.io/docs/software-supply-chain-assurance/ssca-supported",
        description: "Platform and capability matrix",
      },
      {
        label: "SCS FAQs",
        href: "https://developer.harness.io/docs/software-supply-chain-assurance/faq",
        description: "Common questions",
      },
      {
        label: "My Harness — Security",
        href: "https://app.harness.io/",
        description: "Replace with your org URL or deep-link to SCS",
      },
    ],
  },
  {
    id: "sto",
    accent: "sto",
    title: "Harness STO",
    subtitle: "Security Testing Orchestration",
    links: [
      {
        label: "STO documentation",
        href: "https://developer.harness.io/docs/security-testing-orchestration",
        description: "Hub for STO docs",
      },
      {
        label: "STO overview",
        href: "https://developer.harness.io/docs/security-testing-orchestration/overview",
        description: "Product overview",
      },
      {
        label: "Scan workflows",
        href: "https://developer.harness.io/docs/security-testing-orchestration/get-started/key-concepts/sto-workflows-overview",
        description: "Orchestration, extraction, ingestion",
      },
      {
        label: "STO FAQs",
        href: "https://developer.harness.io/docs/faqs/security-testing-orchestration",
        description: "Scanner types and behavior",
      },
      {
        label: "STO product page",
        href: "https://www.harness.io/products/application-security-testing/security-testing-orchestration",
        description: "Marketing / positioning",
      },
      {
        label: "My Harness — STO",
        href: "https://app.harness.io/",
        description: "Replace with pipelines or STO home in your account",
      },
    ],
  },
  {
    id: "qwiet",
    accent: "qwiet",
    title: "Qwiet AI · SAST / SCA",
    subtitle: "Harness-native scanners",
    links: [
      {
        label: "SAST & SCA (Harness)",
        href: "https://developer.harness.io/docs/sast-and-sca",
        description: "Qwiet in Harness Security",
      },
      {
        label: "Qwiet scanner reference",
        href: "https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/qwiet-scanner-reference",
        description: "Step configuration in STO",
      },
      {
        label: "Qwiet + Harness workflow",
        href: "https://docs.shiftleft.io/sast/workflows/harness",
        description: "ShiftLeft / Qwiet docs",
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
];
