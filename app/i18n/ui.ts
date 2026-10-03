export type Locale = 'en' | 'ar';
export const locales: Locale[] = ['en', 'ar'];

/** Prefixes a site path with the locale segment. English lives at the root. */
export function localePath(locale: Locale, path = '/') {
  if (locale === 'en') return path;
  if (path === '/') return '/ar';
  return path.startsWith('/#') ? `/ar${path.slice(1)}` : `/ar${path}`;
}

const en = {
  dir: 'ltr' as 'ltr' | 'rtl',
  listSeparator: ', ',
  name: 'Abdulaziz Amori',
  nameLines: ['Abdulaziz', 'Amori'],
  skip: 'Skip to work',
  sections: 'Sections',
  nav: { work: 'Work', about: 'About', experience: 'Experience', contact: 'Contact' },
  backToTopBrand: 'Abdulaziz Amori, back to top',
  emailMe: 'Email me',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  downloadCv: 'Download CV',
  otherLanguage: { label: 'العربية', lang: 'ar', title: 'Read this page in Arabic' },
  theme: { toLight: 'Switch to light theme', toDark: 'Switch to dark theme' },
  status: 'Open to full-time roles and freelance work',
  heroLede: (live: number) => `Flutter and full-stack engineer in Jeddah. I build whole products: the mobile app, the web platform, the API behind them, and the AI features on top. ${live} of my apps are live on the App Store and Google Play.`,
  seeWork: 'See my work',
  reelHint: 'Drag to spin. Click a screen to open it.',
  liveTitle: 'Live in the stores',
  workTitle: 'Selected work',
  workIntro: 'Four products I helped take from idea to store release, each with real users and real operations behind it.',
  openCase: (name: string) => `Open the ${name} case study`,
  myRole: 'My role',
  readCase: 'Read the case study',
  technologies: 'Technologies',
  indexTitle: 'Everything else',
  indexIntro: (count: number) => `${count} more apps, dashboards, websites, and machine learning projects.`,
  filterLabel: 'Filter projects',
  disciplines: { all: 'All', mobile: 'Mobile', web: 'Web', ai: 'AI & ML' },
  liveBadge: 'Live',
  websiteBadge: 'Website',
  portraitCaption: 'Abdulaziz Amori, Jeddah',
  aboutStatement: 'I like owning a product end to end, from the first screen to the server it talks to.',
  aboutBody: [
    'At Alfiya United I’m building Al Hdeed, a construction-materials marketplace for Saudi Arabia. I work across four Flutter apps, the Nuxt website, the Vue dashboards, the Laravel API, Moyasar payments, and AI features like voice ordering and cost estimates from construction drawings. I also own its performance: load testing with k6, query tuning, and monitoring.',
    'Before that I spent almost two years at ABS.AI shipping Flutter apps with live tracking, maps, payments, and push notifications, and taking them through App Store and Google Play release. I studied artificial intelligence at Nile University, which is why AI work feels like part of the stack to me rather than an add-on.'
  ],
  facts: {
    basedIn: 'Based in', basedInValue: 'Jeddah, Saudi Arabia',
    projects: 'Projects', projectsValue: (count: number) => `${count} across mobile, web, and AI`,
    stores: 'In the stores', storesValue: (count: number) => `${count} live apps`,
    education: 'Education', educationValue: 'B.Sc. Artificial Intelligence, Nile University'
  },
  experienceTitle: 'Experience',
  graduated: (year: string) => `Graduated ${year}`,
  toolkitTitle: 'Toolkit',
  certificationsTitle: 'Certifications',
  downloadMyCv: 'Download my CV',
  contactTitle: 'Hiring for Flutter, full‑stack, or AI work? Let’s talk.',
  contactIntro: 'Tell me about the role or the product. Use the form, or email me directly.',
  cvPdf: 'CV (PDF)',
  copyright: '© 2026 Abdulaziz Amori',
  backToTop: 'Back to top',
  form: {
    name: 'Your name', email: 'Email', company: 'Company (optional)', message: 'Message',
    messagePlaceholder: 'The role or project, and how I can help',
    send: 'Send message', sending: 'Sending…',
    success: 'Message sent. Thanks, I’ll get back to you soon.',
    error: 'Your message could not be sent. Please try again.'
  },
  caseStudy: {
    allWork: 'All work',
    getInTouch: 'Get in touch',
    getItOn: (store: string) => `Get it on ${store}`,
    visitWebsite: 'Visit the website',
    logo: (name: string) => `${name} logo`,
    screens: (name: string) => `${name} screens`,
    screen: (name: string, index: number) => `${name} screen ${index}`,
    myRole: 'My role',
    roleDetail: (role: string) => `${role}. I worked across interface, state management, API integration, performance, and release readiness.`,
    keyFeatures: 'Key features',
    impactTitle: 'Engineering impact',
    impactIntro: (period: string) => `Measured before and after my changes, ${period}.`,
    impactTable: 'Before and after measurements',
    columns: { area: 'Area', before: 'Before', after: 'After', change: 'Change' },
    howTitle: 'How I got there',
    problem: 'Problem.',
    solution: 'What I did.',
    alsoBuilt: 'Also built',
    reliability: 'Reliability and security',
    delivery: 'Delivery',
    nextProject: 'Next project',
    similar: 'Have a similar project? Let’s talk'
  },
  notFound: { title: 'This page doesn’t exist.', body: 'The link may be old, or the project may have moved.', cta: 'See all work' },
  meta: {
    title: 'Abdulaziz Amori — Flutter & Full-Stack Engineer',
    description: 'Software engineer in Jeddah building Flutter apps, web platforms, Laravel and Node APIs, and AI features. Apps live on the App Store and Google Play.',
    ogDescription: 'Flutter apps, web platforms, APIs, and AI features — designed, built, and shipped end to end.',
    caseTitle: (name: string) => `${name} — Abdulaziz Amori`
  }
};

export type Dictionary = typeof en;

const ar: Dictionary = {
  dir: 'rtl',
  listSeparator: '، ',
  name: 'عبدالعزيز عموري',
  nameLines: ['عبدالعزيز', 'عموري'],
  skip: 'انتقل إلى الأعمال',
  sections: 'أقسام الصفحة',
  nav: { work: 'الأعمال', about: 'نبذة', experience: 'الخبرات', contact: 'تواصل' },
  backToTopBrand: 'عبدالعزيز عموري، العودة إلى الأعلى',
  emailMe: 'راسلني',
  openMenu: 'فتح القائمة',
  closeMenu: 'إغلاق القائمة',
  downloadCv: 'تحميل السيرة الذاتية',
  otherLanguage: { label: 'English', lang: 'en', title: 'Read this page in English' },
  theme: { toLight: 'التبديل إلى الوضع الفاتح', toDark: 'التبديل إلى الوضع الداكن' },
  status: 'متاح لوظائف بدوام كامل وللعمل الحر',
  heroLede: (live: number) => `مهندس Flutter ومطوّر متكامل في جدة. أبني المنتج كاملًا: تطبيق الجوال، ومنصة الويب، والـ API الذي يشغّلهما، وميزات الذكاء الاصطناعي فوقهما. ${live} من تطبيقاتي متاحة على App Store وGoogle Play.`,
  seeWork: 'شاهد أعمالي',
  reelHint: 'اسحب للتدوير، واضغط على أي شاشة لفتحها.',
  liveTitle: 'متاحة في المتاجر',
  workTitle: 'أعمال مختارة',
  workIntro: 'أربعة منتجات شاركت في نقلها من الفكرة إلى الإطلاق في المتاجر، ولكل منها مستخدمون حقيقيون وعمليات تشغيل فعلية.',
  openCase: (name: string) => `افتح دراسة حالة ${name}`,
  myRole: 'دوري',
  readCase: 'اقرأ دراسة الحالة',
  technologies: 'التقنيات',
  indexTitle: 'بقية الأعمال',
  indexIntro: (count: number) => `${count} مشروعًا آخر بين تطبيقات ولوحات تحكم ومواقع ومشاريع تعلّم آلي.`,
  filterLabel: 'تصفية المشاريع',
  disciplines: { all: 'الكل', mobile: 'الجوال', web: 'الويب', ai: 'الذكاء الاصطناعي' },
  liveBadge: 'متاح',
  websiteBadge: 'موقع',
  portraitCaption: 'عبدالعزيز عموري، جدة',
  aboutStatement: 'أحب أن أتولى المنتج من بدايته إلى نهايته، من أول شاشة حتى الخادم الذي تتصل به.',
  aboutBody: [
    'في شركة Alfiya United أبني منصة الحديد، سوقًا إلكترونيًا لمواد البناء في السعودية. أعمل على أربعة تطبيقات Flutter، والموقع المبني بـ Nuxt، ولوحات التحكم المبنية بـ Vue، والـ API المبني بـ Laravel، ومدفوعات Moyasar، وميزات ذكاء اصطناعي مثل الطلب الصوتي وتقدير التكلفة من المخططات الإنشائية. وأتولى أيضًا أداء المنصة: اختبارات الحمل بـ k6، وتحسين الاستعلامات، والمراقبة.',
    'قبل ذلك قضيت قرابة عامين في ABS.AI أطوّر تطبيقات Flutter تتضمن التتبع المباشر والخرائط والمدفوعات والإشعارات، وأتولى إطلاقها على App Store وGoogle Play. درست الذكاء الاصطناعي في جامعة النيل، ولهذا أرى الذكاء الاصطناعي جزءًا أساسيًا من المنتج لا إضافة جانبية.'
  ],
  facts: {
    basedIn: 'المقر', basedInValue: 'جدة، المملكة العربية السعودية',
    projects: 'المشاريع', projectsValue: (count: number) => `${count} مشروعًا في الجوال والويب والذكاء الاصطناعي`,
    stores: 'في المتاجر', storesValue: (count: number) => `${count} تطبيقات منشورة`,
    education: 'التعليم', educationValue: 'بكالوريوس الذكاء الاصطناعي، جامعة النيل'
  },
  experienceTitle: 'الخبرات',
  graduated: (year: string) => `التخرج ${year}`,
  toolkitTitle: 'الأدوات والتقنيات',
  certificationsTitle: 'الشهادات',
  downloadMyCv: 'حمّل سيرتي الذاتية',
  contactTitle: 'تبحث عن مهندس Flutter أو مطوّر متكامل أو مطوّر ذكاء اصطناعي؟ لنتحدث.',
  contactIntro: 'أخبرني عن الوظيفة أو المنتج، عبر النموذج أو بالبريد الإلكتروني مباشرة.',
  cvPdf: 'السيرة الذاتية (PDF)',
  copyright: '© 2026 عبدالعزيز عموري',
  backToTop: 'العودة إلى الأعلى',
  form: {
    name: 'الاسم', email: 'البريد الإلكتروني', company: 'الشركة (اختياري)', message: 'الرسالة',
    messagePlaceholder: 'الوظيفة أو المشروع، وكيف يمكنني المساعدة',
    send: 'إرسال الرسالة', sending: 'جارٍ الإرسال…',
    success: 'تم إرسال رسالتك. شكرًا لك، سأرد عليك قريبًا.',
    error: 'تعذّر إرسال رسالتك. حاول مرة أخرى.'
  },
  caseStudy: {
    allWork: 'كل الأعمال',
    getInTouch: 'تواصل معي',
    getItOn: (store: string) => `حمّله من ${store}`,
    visitWebsite: 'زيارة الموقع',
    logo: (name: string) => `شعار ${name}`,
    screens: (name: string) => `شاشات ${name}`,
    screen: (name: string, index: number) => `شاشة ${index} من ${name}`,
    myRole: 'دوري',
    roleDetail: (role: string) => `${role}. عملت على الواجهة، وإدارة الحالة، وربط الـ API، والأداء، وتجهيز الإصدار.`,
    keyFeatures: 'أبرز الميزات',
    impactTitle: 'الأثر الهندسي',
    impactIntro: (period: string) => `قياسات قبل تغييراتي وبعدها، ${period}.`,
    impactTable: 'القياسات قبل التغييرات وبعدها',
    columns: { area: 'المجال', before: 'قبل', after: 'بعد', change: 'التغيير' },
    howTitle: 'كيف وصلت إلى ذلك',
    problem: 'المشكلة.',
    solution: 'ما قمت به.',
    alsoBuilt: 'أنظمة بنيتها أيضًا',
    reliability: 'الموثوقية والأمان',
    delivery: 'حجم الإنجاز',
    nextProject: 'المشروع التالي',
    similar: 'لديك مشروع مشابه؟ لنتحدث'
  },
  notFound: { title: 'هذه الصفحة غير موجودة.', body: 'قد يكون الرابط قديمًا، أو نُقل المشروع إلى مكان آخر.', cta: 'شاهد كل الأعمال' },
  meta: {
    title: 'عبدالعزيز عموري — مهندس Flutter ومطوّر متكامل',
    description: 'مهندس برمجيات في جدة يبني تطبيقات Flutter ومنصات ويب وواجهات Laravel وNode البرمجية وميزات الذكاء الاصطناعي. تطبيقاته متاحة على App Store وGoogle Play.',
    ogDescription: 'تطبيقات Flutter ومنصات ويب وواجهات برمجية وميزات ذكاء اصطناعي، من التصميم حتى الإطلاق.',
    caseTitle: (name: string) => `${name} — عبدالعزيز عموري`
  }
};

const dictionaries: Record<Locale, Dictionary> = { en, ar };
export const getDictionary = (locale: Locale) => dictionaries[locale];
