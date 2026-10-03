export type StoreLink = { label: string; href: string };
export type Metric = { area: string; before: string; after: string; change: string };
export type Impact = {
  period: string;
  headline: { value: string; label: string }[];
  metrics: Metric[];
  method: string;
  fixes: { title: string; problem: string; solution: string }[];
  delivery: string[];
  systems: string[];
  reliability: string[];
};
export type Discipline = 'mobile' | 'web' | 'ai';
export type Project = { slug: string; name: string; kind: string; summary: string; image?: string; icon?: string; gallery?: string[]; website?: string; disciplines: Discipline[]; stack: string[]; role: string; features: string[]; accent: string; storeLinks?: StoreLink[]; impact?: Impact };

const screens = (names: string[]) => names.map(name => `/assets/work/${name}.jpg`);
const range = (pattern: (index: number) => string, count: number) => Array.from({ length: count }, (_, index) => pattern(index + 1));

export const projects: Project[] = [
  { slug: 'al-hdeed', name: 'Al Hdeed', icon: '/assets/icons/alhadeed.png', disciplines: ['mobile', 'web', 'ai'], gallery: ['/assets/images/al_hdeed_mockup.png'], kind: 'Saudi construction marketplace', summary: 'A full-stack marketplace for steel and construction materials, combining mobile commerce, operations software, payments, and applied AI.', image: '/assets/images/al_hdeed_mockup.png', stack: ['Flutter', 'Laravel 11', 'Vue.js', 'Nuxt.js', 'MySQL', 'Moyasar', 'AI integrations'], role: 'Mobile, web, backend & AI engineer', features: ['AI voice ordering', 'Drawing-based cost estimation', 'Provider and admin dashboards', 'Secure online payments'], impact: {
    period: 'May — Oct 2026',
    headline: [
      { value: '+259%', label: 'API capacity, 16.7 → 60 req/s with zero errors' },
      { value: '−42%', label: 'database queries when a signed-in user opens the app' },
      { value: '813', label: 'commits in about 4.5 months' }
    ],
    metrics: [
      { area: 'Server traffic capacity', before: '16.7 req/s', after: '60 req/s, 0% errors', change: '+259%' },
      { area: 'App opens served per minute', before: '~97', after: '~350', change: '+260%' },
      { area: 'Signed-in app open', before: '225 queries', after: '131 queries', change: '−42%' },
      { area: 'Product listing page', before: '303 queries', after: '213 queries', change: '−30%' },
      { area: 'Best-sellers page', before: '182 queries', after: '113 queries', change: '−38%' },
      { area: 'MySQL memory stalls', before: '38,531', after: '0', change: 'Eliminated' }
    ],
    method: 'Capacity figures come from k6 load tests against production (4 vCPU / 16 GB server). Query counts were measured before and after each change.',
    fixes: [
      { title: 'Found the real ceiling on traffic', problem: 'The API didn’t trust the nginx reverse proxy, so every visitor looked like the same IP and all guest traffic shared one 1,000-requests-per-minute bucket while the CPU sat idle.', solution: 'Diagnosed it with k6 load tests and rate-limit headers, configured trusted proxies, and rebuilt the limiter per IP for guests and per account for signed-in users, with login and OTP limits sized for Saudi mobile carriers that share IPs.' },
      { title: 'Cached shared data safely', problem: 'The response cache skipped any request with a login token, so signed-in users rebuilt every catalog screen from the database on each app open.', solution: 'Added a per-route opt-in for shared caching on the 7 catalog routes with no user-specific data, while carts, orders, favourites, and profiles stay uncached.' },
      { title: 'Removed N+1 queries', problem: 'Each product loaded its city, region, favourite, and in-cart status one row at a time.', solution: 'Added eager loading, a batched existence check that resolves favourites and cart status for the whole page in one query, and a composite index to keep it fast.' },
      { title: 'Tuned the database', problem: 'MySQL ran on defaults with a 128 MB buffer for a 1.1 GB database and had logged 38,531 stalls at low traffic.', solution: 'Raised the buffer pool to 2 GB and connections to 400, added a slow-query log, and kept full write durability for orders and payments. Reads now come from memory 99.97% of the time.' }
    ],
    delivery: ['813 commits in about 4.5 months, up from 21 before I joined', '428 bug fixes and 265 features', '5,707 files changed across the API, 4 Flutter apps, and dashboards', 'Load-test reports that gave a go/no-go for an influencer campaign of about 16,000 app opens an hour'],
    systems: ['Home services and technician app: job dispatch by city, timed offer rounds, chat, calls, and pay-after-completion', 'AI customer-service bot on WhatsApp Business, using RAG', 'Per-city pricing, multi-warehouse providers, delivery-coverage areas, and Moyasar with Apple Pay and mada', 'Daftra ERP invoicing and stock, Firebase push, and real-time order status with Pusher', 'Role-based admin tools, approval audit trail, and analytics dashboards', 'Redesigned landing page with SEO-friendly product URLs and dynamic sitemaps'],
    reliability: ['Sentry and Firebase Crashlytics in all 4 Flutter apps', 'Uptime monitoring, server metrics, and automated backups', 'CI pipeline with security checks and test automation', 'Login and OTP brute-force protection, signed URLs for chat attachments, and Cloudflare', 'Automatic retry, stale-cache fallback, and an offline banner in the customer app']
  }, accent: '#f0b56b', storeLinks: [{ label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.alhdeed.hdeed&pcampaignid=web_share' }, { label: 'App Store', href: 'https://apps.apple.com/eg/app/%D8%A7%D9%84%D8%AD%D8%AF%D9%8A%D8%AF/id6753888001' }] },
  { slug: 'al-alfy', name: 'Al Alfy', disciplines: ['mobile'], icon: '/assets/icons/alalfy.png', gallery: screens(range(i => `al_alfy_${i}`, 6)), kind: 'Real-time transportation platform', summary: 'A ride booking and intercity travel experience with live vehicle tracking and dependable trip operations.', image: '/assets/work/al_alfy_1.jpg', stack: ['Flutter', 'Node.js', 'Socket.IO', 'Google Maps'], role: 'Mobile engineer', features: ['Live tracking', 'Trip management', 'Push notifications', 'Maps and ETA'], accent: '#81e6d9', storeLinks: [{ label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.absai.alalphyclient' }, { label: 'App Store', href: 'https://apps.apple.com/eg/app/al-alfy/id6748546309' }] },
  { slug: 'whale-tail-academy', name: 'Whale Tail Academy', disciplines: ['mobile'], icon: '/assets/icons/whail_tail.png', gallery: screens(range(i => `whailTail_${i}`, 6)), kind: 'Education & booking platform', summary: 'A family-facing academy app that makes registration, attendance, schedules, and progress clear and accessible.', image: '/assets/work/whailTail_2.jpg', stack: ['Flutter', 'Firebase', 'Cloud Messaging'], role: 'Flutter engineer', features: ['Student registration', 'Progress reporting', 'Attendance', 'Arabic and English'], accent: '#8ba7ff', storeLinks: [{ label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.absai.whaletailacademy' }, { label: 'App Store', href: 'https://apps.apple.com/eg/app/whale-tail/id6743503219' }] },
  { slug: 'school-finder', name: 'School Finder', disciplines: ['mobile'], icon: '/assets/icons/ios_logo.png', gallery: screens(range(i => `school_finder_${i}`, 6)), kind: 'School discovery platform', summary: 'A discovery product that helps parents search, compare, and contact nearby schools using live location data.', image: '/assets/work/school_finder_4.jpg', stack: ['Flutter', 'REST APIs', 'Google Maps', 'Paymob'], role: 'Mobile engineer', features: ['Location search', 'School comparison', 'Live data', 'Directions'], accent: '#dca5ff', storeLinks: [{ label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.absai.school_finder' }, { label: 'App Store', href: 'https://apps.apple.com/us/app/school-finder/id6752694812' }] },
  { slug: 'al-hdeed-provider', name: 'Al Hdeed Provider', icon: '/assets/icons/alhadeed.png', disciplines: ['mobile'], kind: 'Provider operations app', summary: 'A companion mobile experience for construction-material providers to manage inventory, orders, and marketplace operations.', stack: ['Flutter', 'Laravel', 'REST APIs'], role: 'Mobile & backend engineer', features: ['Order management', 'Inventory operations', 'Provider workflows', 'Marketplace updates'], accent: '#f0b56b' },
  { slug: 'al-hdeed-landing-page', name: 'Al Hdeed Landing Page', website: 'https://alhdeed.com/', icon: '/assets/icons/alhadeed.png', disciplines: ['web'], kind: 'Product marketing website', summary: 'A public-facing website introducing the Al Hdeed marketplace and its construction-material purchasing experience.', stack: ['Nuxt.js', 'Vue.js', 'SEO'], role: 'Web developer', features: ['Product messaging', 'Responsive design', 'Lead generation', 'Marketplace overview'], accent: '#f0b56b' },
  { slug: 'al-hdeed-web-app', name: 'Al Hdeed Web App', website: 'https://alhdeed.com/app/ar/products/', icon: '/assets/icons/alhadeed.png', disciplines: ['web'], kind: 'Construction marketplace web app', summary: 'A web application supporting the Al Hdeed marketplace, backed by integrated services and REST APIs.', stack: ['Nuxt.js', 'Laravel', 'REST APIs'], role: 'Full-stack engineer', features: ['Marketplace flows', 'Web ordering', 'API integration', 'Responsive interface'], accent: '#f0b56b' },
  { slug: 'al-hdeed-admin-dashboard', name: 'Al Hdeed Admin Dashboard', icon: '/assets/icons/alhadeed.png', disciplines: ['web'], kind: 'Marketplace operations dashboard', summary: 'An internal dashboard for monitoring marketplace activity and supporting day-to-day administrative operations.', stack: ['Vue.js', 'Laravel', 'REST APIs'], role: 'Full-stack engineer', features: ['Operational oversight', 'Order administration', 'Data management', 'Role-based workflows'], accent: '#f0b56b' },
  { slug: 'al-hdeed-provider-dashboard', name: 'Al Hdeed Provider Dashboard', icon: '/assets/icons/alhadeed.png', disciplines: ['web'], kind: 'Provider management dashboard', summary: 'A dedicated dashboard that gives construction-material providers a clear view of orders and operations.', stack: ['Vue.js', 'Laravel', 'REST APIs'], role: 'Full-stack engineer', features: ['Provider analytics', 'Order processing', 'Inventory visibility', 'Account management'], accent: '#f0b56b' },
  { slug: 'whale-tail-dashboard', name: 'Whale Tail Dashboard', disciplines: ['web'], icon: '/assets/icons/whail_tail.png', kind: 'Academy management dashboard', summary: 'An administration dashboard for coordinating schedules, attendance, announcements, and swimmer progress.', stack: ['Flutter Web', 'Firebase', 'Cloud Messaging'], role: 'Flutter engineer', features: ['Schedule management', 'Attendance tracking', 'Announcements', 'Progress analytics'], accent: '#8ba7ff' },
  { slug: 'al-alfy-driver', name: 'Al Alfy Driver', disciplines: ['mobile'], icon: '/assets/icons/alalfy_driver.png', gallery: screens(range(i => `alalfy_driver_${i}`, 8)), kind: 'Driver operations app', summary: 'A driver-facing companion app for managing trip availability, live tracking, and ride operations.', image: '/assets/work/alalfy_driver_1.jpg', stack: ['Flutter', 'Socket.IO', 'Google Maps'], role: 'Mobile engineer', features: ['Trip requests', 'Live location', 'Driver availability', 'Navigation support'], accent: '#81e6d9', storeLinks: [{ label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.absai.al_alfy_driver' }, { label: 'App Store', href: 'https://apps.apple.com/pt/app/al-alfy-driver/id6748659769' }] },
  { slug: 'match-egypt', name: 'Match Egypt', disciplines: ['mobile'], icon: '/assets/icons/match_egypt.png', gallery: screens(['match_egypt_1', 'match_egypt_3', 'match_egypt_4', 'match_egypt_5', 'match_egypt_6']), kind: 'Food delivery platform', summary: 'A real-time platform that connects restaurants and delivery drivers to coordinate orders across Egypt.', image: '/assets/work/match_egypt_1.jpg', stack: ['Flutter', 'Firebase', 'Google Maps'], role: 'Flutter engineer', features: ['Restaurant discovery', 'Order tracking', 'Location services', 'Push notifications'], accent: '#ffb38a', storeLinks: [{ label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.absai.matchdriver' }, { label: 'App Store', href: 'https://apps.apple.com/eg/app/match-egypt/id6743946332' }] },
  { slug: 'match-egypt-restaurant', name: 'Match Egypt Restaurant', disciplines: ['mobile'], icon: '/assets/icons/match_egypt.png', gallery: screens(['match_egypt_2']), kind: 'Restaurant operations app', summary: 'A restaurant companion app for receiving, coordinating, and updating food delivery orders.', image: '/assets/work/match_egypt_2.jpg', stack: ['Flutter', 'REST APIs', 'Firebase'], role: 'Flutter engineer', features: ['Order coordination', 'Status updates', 'Restaurant operations', 'Delivery workflow'], accent: '#ffb38a', storeLinks: [{ label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.absai.MatchEgyptRest' }, { label: 'App Store', href: 'https://apps.apple.com/eg/app/match-egypt-restaurant/id6743909206' }] },
  { slug: 'el-akaber-app', name: 'El Akaber App', disciplines: ['mobile'], icon: '/assets/icons/elakaber.png', gallery: screens(range(i => `elakaber_${i}`, 6)), kind: 'Customer mobile app', summary: 'The official El Akaber restaurant app for browsing dishes, placing orders, and tracking deliveries.', image: '/assets/work/elakaber_1.jpg', stack: ['Flutter', 'REST APIs', 'Firebase'], role: 'Flutter engineer', features: ['Mobile user flows', 'API integration', 'Push notifications', 'Store release'], accent: '#f3cf90', storeLinks: [{ label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.absai.sobhikaber_dashboard.prod' }, { label: 'App Store', href: 'https://apps.apple.com/eg/app/el-akaber/id6739861335' }] },
  { slug: 'el-akaber-dashboard', name: 'El Akaber Dashboard', disciplines: ['web'], icon: '/assets/icons/elakaber.png', kind: 'Operations dashboard', summary: 'A web dashboard supporting El Akaber’s internal administration and operational workflows.', stack: ['Flutter Web', 'REST APIs', 'Responsive UI'], role: 'Flutter engineer', features: ['Operational workflows', 'Data management', 'Responsive dashboard', 'Administration tools'], accent: '#f3cf90' },
  { slug: 'resaltk-admin', name: 'Resaltk Admin', disciplines: ['mobile'], icon: '/assets/icons/resaltk_admin_logo.png', gallery: screens(range(i => `${i}_resaltk`, 6)), kind: 'Admin mobile app', summary: 'An administrative application supporting operational workflows for the Resaltk product.', image: '/assets/work/1_resaltk.jpg', stack: ['Flutter', 'REST APIs', 'Firebase'], role: 'Flutter engineer', features: ['Administrative workflows', 'Mobile operations', 'Data updates', 'Store release'], accent: '#ff9ebb', storeLinks: [{ label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.absai.resaltkAdminApp' }, { label: 'App Store', href: 'https://apps.apple.com/eg/app/resaltk-admin/id6755353262' }] },
  { slug: 'mazaq-al-lahim', name: 'Mazaq Al Lahim', disciplines: ['mobile'], icon: '/assets/icons/lahim.png', gallery: screens(range(i => `${i}_lahim`, 6)), kind: 'Food ordering app', summary: 'A customer-facing food product with integrated mobile ordering and production-ready release workflows.', image: '/assets/work/1_lahim.jpg', stack: ['Flutter', 'REST APIs', 'Firebase'], role: 'Flutter engineer', features: ['Food ordering', 'Mobile checkout', 'Push notifications', 'Store release'], accent: '#e69a72', storeLinks: [{ label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.absai.mazakallahem' }, { label: 'App Store', href: 'https://apps.apple.com/sa/app/mazaq-al-lahim/id6755496808' }] },
  { slug: 'amazon-product-browse-node-classification', name: 'Amazon Product Browse Node Classification', disciplines: ['ai'], kind: 'Machine learning project', summary: 'A classification model for assigning Amazon products to the correct browse-node categories.', stack: ['Python', 'TensorFlow', 'Scikit-learn'], role: 'Machine learning engineer', features: ['Data preprocessing', 'Feature engineering', 'Classification', 'Model evaluation'], accent: '#b6fff0' },
  { slug: 'drug-recommendation-system', name: 'Drug Recommendation System', disciplines: ['ai'], kind: 'Deep learning project', summary: 'A deep-learning system designed to support medicine recommendations from relevant input data.', stack: ['Python', 'TensorFlow', 'Deep Learning'], role: 'Machine learning engineer', features: ['Data processing', 'Neural networks', 'Recommendation logic', 'Evaluation'], accent: '#b6fff0' },
  { slug: 'qa-chatbot-rag', name: 'Q&A Chatbot with RAG', disciplines: ['ai'], kind: 'LLM application', summary: 'A retrieval-augmented question-answering chatbot that combines document context with an LLM response layer.', stack: ['Python', 'LLMs', 'RAG', 'Vector Search'], role: 'AI engineer', features: ['Document retrieval', 'Vector search', 'Contextual answers', 'LLM orchestration'], accent: '#b6fff0' },
  { slug: 'ai-text-detection', name: 'AI-Generated Text Detection', disciplines: ['ai'], kind: 'Neural network project', summary: 'A neural-network approach for detecting whether written content was generated by AI.', stack: ['Python', 'TensorFlow', 'NLP'], role: 'Machine learning engineer', features: ['Text preprocessing', 'Neural networks', 'Classification', 'Model evaluation'], accent: '#b6fff0' },
  { slug: 'arabic-customer-review-classification', name: 'Arabic Customer Review Classification', disciplines: ['ai'], kind: 'NLP project', summary: 'An NLP classification project for extracting signal from Arabic customer reviews.', stack: ['Python', 'NLP', 'TensorFlow'], role: 'Machine learning engineer', features: ['Arabic text processing', 'Sentiment classification', 'Data preparation', 'Evaluation'], accent: '#b6fff0' },
  { slug: 'corporate-bankruptcy-prediction', name: 'Corporate Bankruptcy Prediction', disciplines: ['ai'], kind: 'Predictive analytics project', summary: 'A predictive model for assessing corporate bankruptcy risk from financial data.', stack: ['Python', 'Scikit-learn', 'Data Analysis'], role: 'Machine learning engineer', features: ['Financial data processing', 'Risk prediction', 'Feature selection', 'Model evaluation'], accent: '#b6fff0' },
  { slug: 'bank-debit-collection-analysis', name: 'Bank Debit Collection Analysis', disciplines: ['ai'], kind: 'Data analysis project', summary: 'An analysis project focused on understanding bank debit-collection performance and trends.', stack: ['Python', 'Data Analysis', 'Visualization'], role: 'Data analyst', features: ['Data cleaning', 'Trend analysis', 'Performance insights', 'Reporting'], accent: '#b6fff0' }
];

export const experience = [
  {
    date: 'May 2026 — Present', company: 'Alfiya United Company', role: 'Mobile & Web Developer · Backend · AI Integrations', location: 'Jeddah, Saudi Arabia · On-site',
    body: 'Building Al Hdeed, a steel and construction-materials marketplace for the Saudi market, across mobile, web, backend, and AI.',
    highlights: [
      'Built and maintain the Al Hdeed mobile app, plus web app features across the full product stack.',
      'Integrated the Moyasar payment gateway for secure online payments.',
      'Built the backend services and REST APIs behind the mobile and web clients.',
      'Shipped AI voice ordering, so customers can place orders by speaking.',
      'Built a feature that estimates project and material costs from architectural and structural drawings.',
      'Raised production API capacity by 259% (16.7 → 60 req/s, zero errors) by fixing a proxy misconfiguration that made a global rate-limit bottleneck.',
      'Cut database queries by 30–42% on key screens with safer response caching, eager loading, and targeted indexes.',
      'Set up observability from scratch: Sentry, Crashlytics, uptime monitoring, backups, and CI security checks.'
    ],
    stack: 'Flutter · Laravel · Vue.js · Nuxt.js · MySQL · Moyasar · LLMs'
  },
  {
    date: 'Aug 2024 — Apr 2026', company: 'ABS.AI Technologies', role: 'Flutter Developer', location: 'Cairo, Egypt · Hybrid',
    body: 'Shipped production Flutter apps for transport, food delivery, education, and retail clients.',
    highlights: [
      'Built scalable apps integrated with REST APIs, Firebase, Google Maps, Paymob, AppMetrica, and Meta Ads.',
      'Implemented networking with Dio and HTTP: JSON serialization, pagination, caching, and robust error handling.',
      'Designed real-time features, including live location tracking and dynamic updates.',
      'Applied Clean Architecture, Cubit/BLoC, and SOLID; ran CI/CD with GitHub Actions and handled App Store and Play Store releases.'
    ],
    stack: 'Flutter · Firebase · Google Maps · Paymob · GitHub Actions'
  },
  {
    date: 'Jul 2023 — Nov 2023', company: 'TechnoColab Inc.', role: 'Machine Learning Intern', location: 'Remote · India',
    body: 'Built predictive models and optimized data pipelines for real-world datasets.',
    highlights: [
      'Built predictive ML models and data pipelines with TensorFlow and Scikit-learn.',
      'Handled data preprocessing, feature selection, and model evaluation.'
    ],
    stack: 'Python · TensorFlow · Scikit-learn'
  }
];

export const education = { school: 'Nile University', degree: 'B.Sc. in Artificial Intelligence', place: 'Giza, Egypt', year: '2024' };

export const certifications = ['Flutter & Firebase', 'Advanced Learning Algorithms', 'Google Data Analytics', 'Supervised Machine Learning', 'Unsupervised Machine Learning'];
