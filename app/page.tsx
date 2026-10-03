'use client';

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { AnimatePresence, MotionConfig, motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Download, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { certifications, education, experience, projects, type Discipline, type Project } from './data';
import type { ReelItem } from './components/HeroReel';
import ContactForm from './components/ContactForm';
import ThemeToggle from './components/ThemeToggle';

const HeroReel = dynamic(() => import('./components/HeroReel'), { ssr: false });

const EMAIL = 'abdulaziz.amori10@gmail.com';
const GITHUB = 'https://github.com/abdulazizamori';
const LINKEDIN = 'https://www.linkedin.com/in/abdulaziz-amori-414592332/';
const CV = '/Abdulaziz-Amori-CV.pdf';

const nav = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' }
];

const reelSources: [string, string][] = [
  ['al_alfy_1', 'al-alfy'], ['whailTail_3', 'whale-tail-academy'], ['1_lahim', 'mazaq-al-lahim'], ['school_finder_3', 'school-finder'],
  ['match_egypt_3', 'match-egypt'], ['2_resaltk', 'resaltk-admin'], ['alalfy_driver_1', 'al-alfy-driver'], ['elakaber_3', 'el-akaber-app'],
  ['whailTail_6', 'whale-tail-academy'], ['al_alfy_5', 'al-alfy'], ['3_lahim', 'mazaq-al-lahim'], ['school_finder_6', 'school-finder']
];

const featuredSlugs = ['al-hdeed', 'al-alfy', 'whale-tail-academy', 'school-finder'];
const fanScreens: Record<string, string[]> = {
  'al-alfy': ['al_alfy_3', 'al_alfy_1', 'al_alfy_5'],
  'whale-tail-academy': ['whailTail_4', 'whailTail_3', 'whailTail_6'],
  'school-finder': ['school_finder_2', 'school_finder_3', 'school_finder_6']
};

const filters: { id: 'all' | Discipline; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'web', label: 'Web' },
  { id: 'ai', label: 'AI & ML' }
];
const disciplineLabel: Record<Discipline, string> = { mobile: 'Mobile', web: 'Web', ai: 'AI & ML' };

const toolkit = [
  { area: 'Mobile', tools: ['Flutter', 'Dart', 'Swift', 'Java', 'Cubit / BLoC', 'Provider', 'GetX', 'Dio', 'Firebase', 'Google Maps'] },
  { area: 'Web', tools: ['Next.js', 'Nuxt.js', 'React', 'Vue.js', 'TypeScript', 'Tailwind CSS'] },
  { area: 'Backend', tools: ['Laravel', 'Node.js', 'REST APIs', 'Socket.IO', 'Moyasar', 'Paymob'] },
  { area: 'AI & ML', tools: ['Python', 'TensorFlow', 'Keras', 'Scikit-learn', 'NLP', 'LLMs', 'RAG', 'Vector search'] },
  { area: 'Engineering', tools: ['Clean Architecture', 'MVVM', 'SOLID', 'Design patterns', 'Dependency injection', 'Testing', 'CI/CD with GitHub Actions', 'App Store & Play Store releases'] }
];

const liveApps = projects.filter(project => project.storeLinks?.length);
const byId = (slug: string) => projects.find(project => project.slug === slug)!;

export default function Home() {
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [front, setFront] = useState(0);
  const [reelReady, setReelReady] = useState(false);

  const reel: ReelItem[] = useMemo(() => reelSources.map(([file, slug]) => {
    const project = byId(slug);
    return { src: `/assets/reel/${file}.jpg`, slug, name: project.name, kind: project.kind };
  }), []);

  useEffect(() => {
    const update = () => {
      const marker = window.innerHeight * .4;
      const current = nav.filter(({ id }) => {
        const element = document.getElementById(id);
        return element && element.getBoundingClientRect().top <= marker;
      }).at(-1);
      setActiveSection(current?.id ?? '');
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);

  useEffect(() => {
    if (!menu) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenu(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menu]);

  const openProject = useCallback((slug: string) => router.push(`/projects/${slug}`), [router]);
  const markReady = useCallback(() => setReelReady(true), []);
  const current = reel[front];

  const navLinks = (onPick?: () => void) => nav.map(({ id, label }) => <a
    key={id}
    href={`#${id}`}
    className={activeSection === id ? 'active' : undefined}
    aria-current={activeSection === id ? 'location' : undefined}
    onClick={() => { setActiveSection(id); onPick?.(); }}
  >{label}</a>);

  return <MotionConfig reducedMotion="user">
    <a className="skip" href="#work">Skip to work</a>
    <header className="nav">
      <a href="#top" className="brand" aria-label="Abdulaziz Amori, back to top">Abdulaziz Amori</a>
      <nav aria-label="Sections">{navLinks()}</nav>
      <ThemeToggle/>
      <a className="nav-cta" href={`mailto:${EMAIL}`}>Email me</a>
      <button className="menu" type="button" onClick={() => setMenu(open => !open)} aria-expanded={menu} aria-controls="mobile-menu" aria-label={menu ? 'Close menu' : 'Open menu'}>{menu ? <X size={20}/> : <Menu size={20}/>}</button>
    </header>
    <AnimatePresence>{menu && <motion.nav id="mobile-menu" className="mobile-menu" aria-label="Sections" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .18 }}>{navLinks(() => setMenu(false))}<a href={`mailto:${EMAIL}`}>Email me</a><a href={CV} download>Download CV</a></motion.nav>}</AnimatePresence>

    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <motion.div className="hero-stage" initial={{ opacity: 0 }} animate={{ opacity: reelReady ? 1 : 0 }} transition={{ duration: 1.1, ease: [.2, .7, .2, 1] }}>
          <HeroReel items={reel} onFrontChange={setFront} onOpen={openProject} onReady={markReady}/>
        </motion.div>
        <div className="hero-copy">
          <p className="status rise" style={{ animationDelay: '60ms' }}><i aria-hidden="true"/>Open to full-time roles and freelance work</p>
          <h1 id="hero-title" className="hero-title">
            {['Abdulaziz', 'Amori'].map((word, index) => <span className="line" key={word}><span style={{ animationDelay: `${150 + index * 90}ms` }}>{word}</span></span>)}
          </h1>
          <p className="hero-lede rise" style={{ animationDelay: '420ms' }}>
            Flutter and full-stack engineer in Jeddah. I build whole products: the mobile app, the web platform, the API behind them, and the AI features on top. {liveApps.length} of my apps are live on the App Store and Google Play.
          </p>
          <div className="hero-actions rise" style={{ animationDelay: '520ms' }}>
            <a className="button" href="#work">See my work</a>
            <a className="button quiet" href={`mailto:${EMAIL}`}><Mail size={16} aria-hidden="true"/>{EMAIL}</a>
          </div>
          <div className="hero-links rise" style={{ animationDelay: '620ms' }}>
            <a href={GITHUB} target="_blank" rel="noreferrer"><Github size={16} aria-hidden="true"/>GitHub</a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer"><Linkedin size={16} aria-hidden="true"/>LinkedIn</a>
            <a href={CV} download><Download size={16} aria-hidden="true"/>Download CV</a>
          </div>
        </div>
        {current && <motion.div className="reel-caption" initial={{ opacity: 0 }} animate={{ opacity: reelReady ? 1 : 0 }} transition={{ delay: .9 }}>
          <span className="reel-hint">Drag to spin. Click a screen to open it.</span>
          <Link href={`/projects/${current.slug}`} className="reel-current"><b>{current.name}</b><span>{current.kind}</span><ArrowUpRight size={16} aria-hidden="true"/></Link>
        </motion.div>}
      </section>

      <section className="live" aria-labelledby="live-title">
        <h2 id="live-title">Live in the stores</h2>
        <ul className="live-list">
          {liveApps.map(project => <li key={project.slug}>
            <Link href={`/projects/${project.slug}`} className="live-app">
              {project.icon ? <Image src={project.icon} alt="" width={48} height={48}/> : <span className="lettermark" style={{ '--accent': project.accent } as React.CSSProperties}>{project.name.split(' ').map(word => word[0]).join('').slice(0, 2)}</span>}
              <span><b>{project.name}</b><small>{project.kind}</small></span>
            </Link>
          </li>)}
        </ul>
      </section>

      <section id="work" className="section work" aria-labelledby="work-title">
        <header className="section-head">
          <h2 id="work-title">Selected work</h2>
          <p>Four products I helped take from idea to store release, each with real users and real operations behind it.</p>
        </header>
        <div className="features">{featuredSlugs.map((slug, index) => <Feature key={slug} project={byId(slug)} flip={index % 2 === 1}/>)}</div>
      </section>

      <ProjectIndex/>

      <section id="about" className="section about" aria-labelledby="about-title">
        <figure className="portrait">
          <Image src="/assets/images/abdulaziz.jpg" alt="Abdulaziz Amori" width={800} height={1000} sizes="(max-width: 820px) 90vw, 420px"/>
          <figcaption>Abdulaziz Amori, Jeddah</figcaption>
        </figure>
        <div className="about-body">
          <h2 id="about-title" className="about-statement">I like owning a product end to end, from the first screen to the server it talks to.</h2>
          <p>At Alfiya United I’m building Al Hdeed, a construction-materials marketplace for Saudi Arabia. I work across four Flutter apps, the Nuxt website, the Vue dashboards, the Laravel API, Moyasar payments, and AI features like voice ordering and cost estimates from construction drawings. I also own its performance: load testing with k6, query tuning, and monitoring.</p>
          <p>Before that I spent almost two years at ABS.AI shipping Flutter apps with live tracking, maps, payments, and push notifications, and taking them through App Store and Google Play release. I studied artificial intelligence at Nile University, which is why AI work feels like part of the stack to me rather than an add-on.</p>
          <dl className="facts">
            <div><dt>Based in</dt><dd>Jeddah, Saudi Arabia</dd></div>
            <div><dt>Projects</dt><dd>{projects.length} across mobile, web, and AI</dd></div>
            <div><dt>In the stores</dt><dd>{liveApps.length} live apps</dd></div>
            <div><dt>Education</dt><dd>B.Sc. Artificial Intelligence, {education.school}</dd></div>
          </dl>
        </div>
      </section>

      <section id="experience" className="section experience" aria-labelledby="experience-title">
        <header className="section-head"><h2 id="experience-title">Experience</h2></header>
        <ol className="jobs">
          {experience.map(job => <li key={job.company} className="job">
            <p className="job-date">{job.date}</p>
            <div>
              <h3>{job.company}</h3>
              <p className="job-role">{job.role}</p>
              <p className="job-place">{job.location}</p>
              <p>{job.body}</p>
              <ul className="highlights">{job.highlights.map(item => <li key={item}>{item}</li>)}</ul>
              <ul className="chips" aria-label="Technologies">{job.stack.split(' · ').map(tool => <li key={tool}>{tool}</li>)}</ul>
            </div>
          </li>)}
          <li className="job">
            <p className="job-date">Graduated {education.year}</p>
            <div>
              <h3>{education.school}</h3>
              <p className="job-role">{education.degree}</p>
              <p className="job-place">{education.place}</p>
            </div>
          </li>
        </ol>
        <div className="toolkit" aria-labelledby="toolkit-title">
          <h3 id="toolkit-title">Toolkit</h3>
          {toolkit.map(group => <div key={group.area} className="tool-group"><h4>{group.area}</h4><p>{group.tools.join(', ')}</p></div>)}
          <div className="tool-group"><h4>Certifications</h4><p>{certifications.join(', ')}</p></div>
          <a className="button small" href={CV} download><Download size={16} aria-hidden="true"/>Download my CV</a>
        </div>
      </section>

      <section id="contact" className="contact" aria-labelledby="contact-title">
        <div className="contact-inner">
          <div className="contact-intro">
            <h2 id="contact-title">Hiring for Flutter, full‑stack, or AI work? Let’s talk.</h2>
            <p>Tell me about the role or the product. Use the form, or email me directly.</p>
            <a className="contact-email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <div className="contact-links">
              <a href={LINKEDIN} target="_blank" rel="noreferrer"><Linkedin size={16} aria-hidden="true"/>LinkedIn</a>
              <a href={GITHUB} target="_blank" rel="noreferrer"><Github size={16} aria-hidden="true"/>GitHub</a>
              <a href={CV} download><Download size={16} aria-hidden="true"/>CV (PDF)</a>
            </div>
          </div>
          <ContactForm/>
        </div>
        <footer className="footer"><span>© 2026 Abdulaziz Amori</span><a href="#top">Back to top</a></footer>
      </section>
    </main>
  </MotionConfig>;
}

function Feature({ project, flip }: { project: Project; flip: boolean }) {
  const screens = fanScreens[project.slug];
  return <article className={`feature${flip ? ' flip' : ''}`} style={{ '--accent': project.accent } as React.CSSProperties}>
    <Tilt href={`/projects/${project.slug}`} label={`Open the ${project.name} case study`}>
      {screens
        ? <div className="fan">{screens.map(name => <Image key={name} src={`/assets/work/${name}.jpg`} alt="" width={300} height={533} sizes="(max-width: 820px) 40vw, 220px"/>)}</div>
        : project.image && <Image className="solo" src={project.image} alt="" width={900} height={1033} sizes="(max-width: 820px) 80vw, 460px"/>}
    </Tilt>
    <div className="feature-copy">
      <p className="feature-kind">{project.kind}</p>
      <h3>{project.name}</h3>
      <p className="feature-summary">{project.summary}</p>
      {project.impact && <dl className="impact-strip">{project.impact.headline.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>}
      <p className="feature-role"><span>My role</span>{project.role}</p>
      <ul className="feature-list">{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
      <ul className="chips" aria-label="Technologies">{project.stack.map(tool => <li key={tool}>{tool}</li>)}</ul>
      <div className="feature-links">
        <Link className="button small" href={`/projects/${project.slug}`}>Read the case study</Link>
        {project.storeLinks?.map(link => <a key={link.href} className="text-link" href={link.href} target="_blank" rel="noreferrer">{link.label}<ArrowUpRight size={14} aria-hidden="true"/></a>)}
      </div>
    </div>
  </article>;
}

function Tilt({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  const rotateX = useMotionValue(0); const rotateY = useMotionValue(0);
  const x = useSpring(rotateX, { stiffness: 140, damping: 18 });
  const y = useSpring(rotateY, { stiffness: 140, damping: 18 });
  const move = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    rotateY.set(((event.clientX - rect.left) / rect.width - .5) * 14);
    rotateX.set(-((event.clientY - rect.top) / rect.height - .5) * 10);
  };
  return <Link href={href} aria-label={label} className="feature-visual" onPointerMove={move} onPointerLeave={() => { rotateX.set(0); rotateY.set(0); }}>
    <motion.div className="tilt" style={{ rotateX: x, rotateY: y, transformPerspective: 1000 }}>{children}</motion.div>
  </Link>;
}

function ProjectIndex() {
  const [filter, setFilter] = useState<'all' | Discipline>('all');
  const rest = projects.filter(project => !featuredSlugs.includes(project.slug));
  const shown = filter === 'all' ? rest : rest.filter(project => project.disciplines.includes(filter));
  const count = (id: 'all' | Discipline) => id === 'all' ? rest.length : rest.filter(project => project.disciplines.includes(id)).length;

  return <section id="index" className="section index" aria-labelledby="index-title">
    <header className="section-head">
      <h2 id="index-title">Everything else</h2>
      <p>{rest.length} more apps, dashboards, websites, and machine learning projects.</p>
    </header>
    <div className="filters" role="group" aria-label="Filter projects">
      {filters.map(item => <button key={item.id} type="button" aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.label}<span>{count(item.id)}</span></button>)}
    </div>
    <ul className="rows">
      <AnimatePresence initial={false} mode="popLayout">
        {shown.map(project => <motion.li key={project.slug} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .22 }}>
          <Link href={`/projects/${project.slug}`} className="row" style={{ '--accent': project.accent } as React.CSSProperties}>
            <span className="row-name">{project.name}{project.storeLinks ? <em>Live</em> : project.website && <em>Website</em>}</span>
            <span className="row-kind">{project.kind}</span>
            <span className="row-stack">{project.stack.slice(0, 3).join(', ')}</span>
            <span className="row-tags">{project.disciplines.map(item => disciplineLabel[item]).join(' / ')}</span>
            <ArrowUpRight size={18} aria-hidden="true" className="row-arrow"/>
          </Link>
        </motion.li>)}
      </AnimatePresence>
    </ul>
  </section>;
}
