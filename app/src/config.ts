import type { TFunction } from 'i18next';

const withBaseAsset = (path: string): string => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

// Shared types
export interface SiteConfig {
  title: string;
  description: string;
}

export const getSiteConfig = (t: TFunction): SiteConfig => ({
  title: t('meta.title'),
  description: t('meta.description'),
});

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface MenuLink {
  label: string;
  href: string;
}

export interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface NavigationConfig {
  brandName: string;
  menuLinks: MenuLink[];
  socialLinks: SocialLink[];
  searchPlaceholder: string;
  cartEmptyText: string;
  cartCheckoutText: string;
  continueShoppingText: string;
  menuBackgroundImage: string;
}

export const getNavigationConfig = (t: TFunction): NavigationConfig => ({
  brandName: t('navigation.brandName'),
  menuLinks: [
    { label: t('navigation.menuLinks.why'), href: '#subhero' },
    { label: t('navigation.menuLinks.how'), href: '#how-it-works' },
    { label: t('navigation.menuLinks.installation'), href: '#products' },
    { label: t('navigation.menuLinks.calculator'), href: '#calculator' },
    { label: t('navigation.menuLinks.faq'), href: '#faq' },
    { label: t('navigation.menuLinks.contact'), href: '#contact' },
  ],
  socialLinks: [
    { icon: 'Instagram', label: 'Instagram', href: '#' },
    { icon: 'Facebook', label: 'Facebook', href: '#' },
    { icon: 'Twitter', label: 'Twitter', href: '#' },
  ],
  searchPlaceholder: t('navigation.searchPlaceholder'),
  cartEmptyText: t('navigation.cartEmptyText'),
  cartCheckoutText: t('navigation.cartCheckoutText'),
  continueShoppingText: t('navigation.continueShoppingText'),
  menuBackgroundImage: withBaseAsset('/images/hero-balcony-solar.jpg'),
});

// ─── Hero ────────────────────────────────────────────────────────────────────

export interface HeroConfig {
  tagline: string;
  title: string;
  ctaPrimaryText: string;
  ctaPrimaryTarget: string;
  ctaSecondaryText: string;
  ctaSecondaryTarget: string;
  backgroundImage: string;
}

export const getHeroConfig = (t: TFunction): HeroConfig => ({
  tagline: t('hero_subtitle'),
  title: t('hero_title'),
  ctaPrimaryText: t('cta_button'),
  ctaPrimaryTarget: '#contact',
  ctaSecondaryText: t('hero.ctaSecondary'),
  ctaSecondaryTarget: '#calculator',
  backgroundImage: withBaseAsset('/images/hero-balcony-solar.jpg'),
});

// ─── SubHero ─────────────────────────────────────────────────────────────────

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface SubHeroConfig {
  tag: string;
  heading: string;
  bodyParagraphs: string[];
  linkText: string;
  linkTarget: string;
  image1: string;
  image2: string;
  stats: Stat[];
}

export const getSubHeroConfig = (t: TFunction): SubHeroConfig => ({
  tag: t('subHero.tag'),
  heading: t('subHero.heading'),
  bodyParagraphs: t('subHero.paragraphs', { returnObjects: true }) as string[],
  linkText: t('subHero.linkText'),
  linkTarget: '#how-it-works',
  image1: withBaseAsset('/images/battery-unit.jpg'),
  image2: withBaseAsset('/images/installation-service.jpg'),
  stats: [
    { value: 60, suffix: '%', label: t('subHero.stats.saving') },
    { value: 800, suffix: 'W', label: t('subHero.stats.feedIn') },
    { value: 5, suffix: t('subHero.years'), label: t('subHero.stats.payback') },
  ],
});

// ─── Video Section (Why It Works) ────────────────────────────────────────────

export interface VideoSectionConfig {
  tag: string;
  heading: string;
  bodyParagraphs: string[];
  ctaText: string;
  ctaTarget: string;
  backgroundImage: string;
}

export const getVideoSectionConfig = (t: TFunction): VideoSectionConfig => ({
  tag: t('videoSection.tag'),
  heading: t('videoSection.heading'),
  bodyParagraphs: t('videoSection.paragraphs', { returnObjects: true }) as string[],
  ctaText: t('videoSection.cta'),
  ctaTarget: '#how-it-works',
  backgroundImage: withBaseAsset('/images/energy-flow-diagram.jpg'),
});

// ─── Products (Installation Options) ─────────────────────────────────────────

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

export interface ProductsConfig {
  tag: string;
  heading: string;
  description: string;
  viewAllText: string;
  addToCartText: string;
  addedToCartText: string;
  categories: string[];
  products: Product[];
}

export const getProductsConfig = (t: TFunction): ProductsConfig => ({
  tag: t('products.tag'),
  heading: t('products.heading'),
  description: t('products.description'),
  viewAllText: t('products.viewAllText'),
  addToCartText: t('products.addToCartText'),
  addedToCartText: t('products.addedToCartText'),
  categories: [
    t('products.categories.all'),
    t('products.categories.balcony'),
    t('products.categories.wall'),
    t('products.categories.roof'),
  ],
  products: [
    { id: 1, name: t('products.items.balconyMount'), price: 0, category: t('products.categories.balcony'), image: withBaseAsset('/images/hero-balcony-solar.jpg') },
    { id: 2, name: t('products.items.wallMount'), price: 0, category: t('products.categories.wall'), image: withBaseAsset('/images/wall-installation.jpg') },
    { id: 3, name: t('products.items.roofMount'), price: 0, category: t('products.categories.roof'), image: withBaseAsset('/images/garage-installation.jpg') },
  ],
});

// ─── Features ────────────────────────────────────────────────────────────────

export interface Feature {
  icon: "Truck" | "ShieldCheck" | "Leaf" | "Heart" | "Zap" | "Home" | "Smartphone" | "TrendingUp";
  title: string;
  description: string;
}

export interface FeaturesConfig {
  features: Feature[];
}

export const getFeaturesConfig = (t: TFunction): FeaturesConfig => {
  const localizedItems = t('features.items', { returnObjects: true }) as Array<{ title: string; description: string }>;
  const icons: Feature['icon'][] = ['ShieldCheck', 'Home', 'Truck', 'Smartphone'];

  return {
    features: localizedItems.map((item, index) => ({
      icon: icons[index] || 'Zap',
      title: item.title,
      description: item.description,
    })),
  };
};

// ─── Blog (Dynamic Tariffs) ──────────────────────────────────────────────────

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
}

export interface BlogConfig {
  tag: string;
  heading: string;
  viewAllText: string;
  readMoreText: string;
  posts: BlogPost[];
}

export const getBlogConfig = (t: TFunction): BlogConfig => {
  const posts = t('blog.posts', { returnObjects: true }) as Array<{ title: string; date: string; excerpt: string }>;
  const images = [
    withBaseAsset('/images/savings-chart.jpg'),
    withBaseAsset('/images/app-monitoring.jpg'),
  ];

  return {
    tag: t('blog.tag'),
    heading: t('blog.heading'),
    viewAllText: t('blog.viewAllText'),
    readMoreText: t('blog.readMoreText'),
    posts: posts.map((post, index) => ({
      id: index + 1,
      title: post.title,
      date: post.date,
      excerpt: post.excerpt,
      image: images[index] || images[0],
    })),
  };
};

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface FaqConfig {
  tag: string;
  heading: string;
  ctaText: string;
  ctaTarget: string;
  faqs: FaqItem[];
}

export const getFaqConfig = (t: TFunction): FaqConfig => {
  const items = t('faq.items', { returnObjects: true }) as Array<{ question: string; answer: string }>;
  return {
    tag: t('faq.tag'),
    heading: t('faq.heading'),
    ctaText: t('faq.ctaText'),
    ctaTarget: '#contact',
    faqs: items.map((item, index) => ({
      id: index + 1,
      question: item.question,
      answer: item.answer,
    })),
  };
};

// ─── About (How It Works) ────────────────────────────────────────────────────

export interface AboutSection {
  tag: string;
  heading: string;
  paragraphs: string[];
  quote: string;
  attribution: string;
  image: string;
  backgroundColor: string;
  textColor: string;
}

export interface AboutConfig {
  sections: AboutSection[];
}

export const getAboutConfig = (t: TFunction): AboutConfig => {
  const sections = t('about.sections', { returnObjects: true }) as Array<{
    tag: string;
    heading: string;
    paragraphs: string[];
    quote: string;
    attribution: string;
  }>;

  const visual = [
    { image: withBaseAsset('/images/photo_2026-03-06_14-25-32.jpg'), backgroundColor: '#1a1a1a', textColor: '#ffffff' },
    { image: withBaseAsset('/images/photo_2026-03-06_14-25-32 (2).jpg'), backgroundColor: '#f5f5f5', textColor: '#1a1a1a' },
  ];

  return {
    sections: sections.map((section, index) => ({
      ...section,
      image: visual[index]?.image || visual[0].image,
      backgroundColor: visual[index]?.backgroundColor || visual[0].backgroundColor,
      textColor: visual[index]?.textColor || visual[0].textColor,
    })),
  };
};

// ─── Contact ─────────────────────────────────────────────────────────────────

export interface FormFields {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
}

export interface ContactConfig {
  heading: string;
  description: string;
  locationLabel: string;
  location: string;
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
  formFields: FormFields;
  submitText: string;
  submittingText: string;
  submittedText: string;
  successMessage: string;
  backgroundImage: string;
  privacyConsentText: string;
}

export const getContactConfig = (t: TFunction): ContactConfig => ({
  heading: t('contact.heading'),
  description: t('contact.description'),
  locationLabel: t('contact.locationLabel'),
  location: t('contact.location'),
  emailLabel: t('contact.emailLabel'),
  email: 'info@solarsmart.de',
  phoneLabel: t('contact.phoneLabel'),
  phone: '+49 (0) 800 1234567',
  formFields: {
    nameLabel: '',
    namePlaceholder: t('contact.form.namePlaceholder'),
    emailLabel: '',
    emailPlaceholder: t('contact.form.emailPlaceholder'),
    messageLabel: '',
    messagePlaceholder: t('contact.form.messagePlaceholder'),
  },
  submitText: t('contact.submitText'),
  submittingText: t('contact.submittingText'),
  submittedText: t('contact.submittedText'),
  successMessage: t('contact.successMessage'),
  backgroundImage: withBaseAsset('/images/happy-customers.jpg'),
  privacyConsentText: t('contact.privacyConsentText'),
});

// ─── Footer ──────────────────────────────────────────────────────────────────

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface FooterSocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface FooterConfig {
  brandName: string;
  brandDescription: string;
  newsletterHeading: string;
  newsletterDescription: string;
  newsletterPlaceholder: string;
  newsletterButtonText: string;
  newsletterSubmittingText: string;
  newsletterSuccessText: string;
  linkGroups: FooterLinkGroup[];
  legalLinks: FooterLink[];
  copyrightText: string;
  socialLinks: FooterSocialLink[];
  newsletterConsentText: string;
}

export const getFooterConfig = (t: TFunction, lang: string): FooterConfig => ({
  brandName: t('navigation.brandName'),
  brandDescription: t('footer.brandDescription'),
  newsletterHeading: t('footer.newsletterHeading'),
  newsletterDescription: t('footer.newsletterDescription'),
  newsletterPlaceholder: t('footer.newsletterPlaceholder'),
  newsletterButtonText: t('footer.newsletterButtonText'),
  newsletterSubmittingText: t('footer.newsletterSubmittingText'),
  newsletterSuccessText: t('footer.newsletterSuccessText'),
  linkGroups: [
    {
      title: t('footer.groups.product'),
      links: [
        { label: t('footer.links.why'), href: '#subhero' },
        { label: t('footer.links.how'), href: '#how-it-works' },
        { label: t('footer.links.installation'), href: '#products' },
        { label: t('footer.links.calculator'), href: '#calculator' },
      ],
    },
    {
      title: t('footer.groups.resources'),
      links: [
        { label: t('footer.links.faq'), href: '#faq' },
        { label: t('footer.links.tariffs'), href: '#blog' },
        { label: t('footer.links.registry'), href: 'https://www.marktstammdatenregister.de/MaStR/Assistent/SolarVorfragen?typ=1394&registrierungsArt=3070' },
      ],
    },
    {
      title: t('footer.groups.company'),
      links: [
        { label: t('footer.links.about'), href: '#about' },
        { label: t('footer.links.contact'), href: '#contact' },
        { label: t('footer.links.career'), href: '#' },
      ],
    },
  ],
  legalLinks: [
    { label: t('footer.links.impressum'), href: `/${lang}/impressum` },
    { label: t('footer.links.privacy'), href: `/${lang}/datenschutz` },
    { label: t('footer.links.terms'), href: '#' },
  ],
  copyrightText: t('footer.copyrightText'),
  socialLinks: [
    { icon: 'Instagram', label: 'Instagram', href: '#' },
    { icon: 'Facebook', label: 'Facebook', href: '#' },
    { icon: 'Twitter', label: 'Twitter', href: '#' },
  ],
  newsletterConsentText: t('footer.newsletterConsentText'),
});

// ─── Legal ───────────────────────────────────────────────────────────────────

export interface LegalConfig {
  companyName: string;
  legalForm: string;
  representedBy: string;
  address: string;
  phone: string;
  email: string;
  registerEntry: string;
  vatId: string;
  contentResponsiblePerson: string;
  privacyEmail: string;
}

export const getLegalConfig = (t: TFunction): LegalConfig => ({
  companyName: t('legalConfig.companyName'),
  legalForm: t('legalConfig.legalForm'),
  representedBy: t('legalConfig.representedBy'),
  address: t('legalConfig.address'),
  phone: t('legalConfig.phone'),
  email: t('legalConfig.email'),
  registerEntry: t('legalConfig.registerEntry'),
  vatId: t('legalConfig.vatId'),
  contentResponsiblePerson: t('legalConfig.contentResponsiblePerson'),
  privacyEmail: t('legalConfig.privacyEmail'),
});
