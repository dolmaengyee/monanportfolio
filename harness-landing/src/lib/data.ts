// =============================================================================
// Site Content Configuration
// =============================================================================
// ALL text content lives here. Edit this file to customize your landing page.
// No need to touch component files - just change the values below.
// =============================================================================

/** Global site metadata - used in layout.tsx for SEO */
export const siteConfig = {
  name: "My Project",
  tagline: "Your tagline here",
  description: "A modern landing page for your project, event, or campaign.",
  url: "https://example.com",
};

/** Navigation links - shown in Navbar */
export const navLinks = [
  { label: "소개", href: "#about" },
  { label: "기능", href: "#features" },
  { label: "갤러리", href: "#gallery" },
  { label: "문의", href: "#contact" },
];

/** Hero section - the first thing visitors see */
export const heroData = {
  title: "메인 타이틀을\n입력하세요",
  subtitle:
    "서브타이틀을 입력하세요. 프로젝트나 이벤트에 대한 간단한 소개를 적어주세요.",
  ctaText: "시작하기",
  ctaHref: "#contact",
};

/** Features section - highlight your key benefits */
export const featuresData = {
  heading: "주요 기능",
  subheading: "프로젝트의 핵심 가치를 소개합니다",
  items: [
    {
      icon: "Zap",
      title: "빠른 속도",
      description:
        "최적화된 성능으로 빠르고 부드러운 사용자 경험을 제공합니다.",
    },
    {
      icon: "Shield",
      title: "안전한 보안",
      description:
        "최신 보안 기술을 적용하여 안전하게 데이터를 보호합니다.",
    },
    {
      icon: "Heart",
      title: "쉬운 사용",
      description:
        "직관적인 인터페이스로 누구나 쉽게 사용할 수 있습니다.",
    },
  ],
};

/** Gallery section - showcase images or cards */
export const galleryData = {
  heading: "갤러리",
  subheading: "프로젝트의 다양한 모습을 확인하세요",
  items: [
    {
      image: "/placeholder.svg",
      title: "프로젝트 소개",
      description: "첫 번째 항목에 대한 설명을 입력하세요.",
    },
    {
      image: "/placeholder.svg",
      title: "주요 기능",
      description: "두 번째 항목에 대한 설명을 입력하세요.",
    },
    {
      image: "/placeholder.svg",
      title: "사용 후기",
      description: "세 번째 항목에 대한 설명을 입력하세요.",
    },
    {
      image: "/placeholder.svg",
      title: "향후 계획",
      description: "네 번째 항목에 대한 설명을 입력하세요.",
    },
  ],
};

/** CTA (Call-to-Action) section - drive conversions */
export const ctaData = {
  heading: "지금 바로 시작하세요",
  description:
    "더 궁금한 점이 있으신가요? 아래 버튼을 눌러 문의해 주세요.",
  buttonText: "문의하기",
  buttonHref: "mailto:hello@example.com",
};

/** Footer content */
export const footerData = {
  copyright: `\u00A9 ${new Date().getFullYear()} My Project. All rights reserved.`,
  links: [
    { label: "개인정보처리방침", href: "#" },
    { label: "이용약관", href: "#" },
  ],
};
