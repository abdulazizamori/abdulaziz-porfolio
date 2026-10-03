'use client';

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { AnimatePresence, MotionConfig, motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Download, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import type { Discipline, Project } from '../data';
import type { Content } from '../i18n/content';
import { getDictionary, localePath, type Dictionary, type Locale } from '../i18n/ui';
import type { ReelItem } from './HeroReel';
import ContactForm from './ContactForm';
import ThemeToggle from './ThemeToggle';
import LanguageSwitch from './LanguageSwitch';

const HeroReel = dynamic(() => import('./HeroReel'), { ssr: false });

const EMAIL = 'abdulaziz.amori10@gmail.com';
const GITHUB = 'https://github.com/abdulazizamori';
const LINKEDIN = 'https://www.linkedin.com/in/abdulaziz-amori-414592332/';
const CV = '/Abdulaziz-Amori-CV.pdf';

const navIds = ['work', 'about', 'experience', 'contact'] as const;

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
const filterIds: ('all' | Discipline)[] = ['all', 'mobile', 'web', 'ai'];

export default function HomePage({ locale, content }: { locale: Locale; content: Content }) {
  const t = getDictionary(locale);
  const { projects, experience, education, certifications, toolkit } = content;
  const href = (path: string) => localePath(locale, path);
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [front, setFront] = useState(0);
  const [reelReady, setReelReady] = useState(false);

  const byId = useCallback((slug: string) => projects.find(project => project.slug === slug)!, [projects]);
  const liveApps = projects.filter(project => project.storeLinks?.length);

  const reel: ReelItem[] = useMemo(() => reelSources.map(([file, slug]) => {
    const project = byId(slug);
    return { src: `/assets/reel/${file}.jpg`, slug, name: project.name, kind: project.kind };
  }), [byId]);

  useEffect(() => {
    const update = () => {
      const marker = window.innerHeight * .4;
      const current = navIds.filter(id => {
        const element = document.getElementById(id);
        return element && element.getBoundingClientRect().top <= marker;
      }).at(-1);
      setActiveSection(current ?? '');
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

  const openProject = useCallback((slug: string) => router.push(localePath(locale, `/projects/${slug}`)), [router, locale]);
  const markReady = useCallback(() => setReelReady(true), []);
  const current = reel[front];

  const navLinks = (onPick?: () => void) => navIds.map(id => <a
    key={id}
    href={`#${id}`}
    className={activeSection === id ? 'active' : undefined}
    aria-current={activeSection === id ? 'location' : undefined}
    onClick={() => { setActiveSection(id); onPick?.(); }}
  >{t.nav[id]}</a>);

  return <MotionConfig reducedMotion="user">
    <a className="skip" href="#work">{t.skip}</a>
    <header className="nav">
      <a href="#top" className="brand" aria-label={t.backToTopBrand}>{t.name}</a>
      <nav aria-label={t.sections}>{navLinks()}</nav>
      <LanguageSwitch {...t.otherLanguage} href={locale === 'en' ? '/ar' : '/'}/>
      <ThemeToggle labels={t.theme}/>
      <a className="nav-cta" href={`mailto:${EMAIL}`}>{t.emailMe}</a>
      <button className="menu" type="button" onClick={() => setMenu(open => !open)} aria-expanded={menu} aria-controls="mobile-menu" aria-label={menu ? t.closeMenu : t.openMenu}>{menu ? <X size={20}/> : <Menu size={20}/>}</button>
    </header>
    <AnimatePresence>{menu && <motion.nav id="mobile-menu" className="mobile-menu" aria-label={t.sections} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .18 }}>{navLinks(() => setMenu(false))}<a href={`mailto:${EMAIL}`}>{t.emailMe}</a><a href={CV} download>{t.downloadCv}</a></motion.nav>}</AnimatePresence>

    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <motion.div className="hero-stage" initial={{ opacity: 0 }} animate={{ opacity: reelReady ? 1 : 0 }} transition={{ duration: 1.1, ease: [.2, .7, .2, 1] }}>
          <HeroReel items={reel} onFrontChange={setFront} onOpen={openProject} onReady={markReady} rtl={t.dir === 'rtl'}/>
        </motion.div>
        <div className="hero-copy">
          <p className="status rise" style={{ animationDelay: '60ms' }}><i aria-hidden="true"/>{t.status}</p>
          <h1 id="hero-title" className="hero-title">
            {t.nameLines.map((word, index) => <span className="line" key={word}><span style={{ animationDelay: `${150 + index * 90}ms` }}>{word}</span></span>)}
          </h1>
          <p className="hero-lede rise" style={{ animationDelay: '420ms' }}>{t.heroLede(liveApps.length)}</p>
          <div className="hero-actions rise" style={{ animationDelay: '520ms' }}>
            <a className="button" href="#work">{t.seeWork}</a>
            <a className="button quiet" href={`mailto:${EMAIL}`}><Mail size={16} aria-hidden="true"/><span className="ltr">{EMAIL}</span></a>
          </div>
          <div className="hero-links rise" style={{ animationDelay: '620ms' }}>
            <a href={GITHUB} target="_blank" rel="noreferrer"><Github size={16} aria-hidden="true"/>GitHub</a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer"><Linkedin size={16} aria-hidden="true"/>LinkedIn</a>
            <a href={CV} download><Download size={16} aria-hidden="true"/>{t.downloadCv}</a>
          </div>
        </div>
        {current && <motion.div className="reel-caption" initial={{ opacity: 0 }} animate={{ opacity: reelReady ? 1 : 0 }} transition={{ delay: .9 }}>
          <span className="reel-hint">{t.reelHint}</span>
          <Link href={href(`/projects/${current.slug}`)} className="reel-current"><b>{current.name}</b><span>{current.kind}</span><ArrowUpRight size={16} aria-hidden="true" className="dir-icon"/></Link>
        </motion.div>}
      </section>

      <section className="live" aria-labelledby="live-title">
        <h2 id="live-title">{t.liveTitle}</h2>
        <ul className="live-list">
          {liveApps.map(project => <li key={project.slug}>
            <Link href={href(`/projects/${project.slug}`)} className="live-app">
              {project.icon ? <Image src={project.icon} alt="" width={48} height={48}/> : <span className="lettermark" style={{ '--accent': project.accent } as React.CSSProperties}>{project.name.slice(0, 2)}</span>}
              <span><b>{project.name}</b><small>{project.kind}</small></span>
            </Link>
          </li>)}
        </ul>
      </section>

      <section id="work" className="section work" aria-labelledby="work-title">
        <header className="section-head">
          <h2 id="work-title">{t.workTitle}</h2>
          <p>{t.workIntro}</p>
        </header>
        <div className="features">{featuredSlugs.map((slug, index) => <Feature key={slug} project={byId(slug)} flip={index % 2 === 1} t={t} href={href}/>)}</div>
      </section>

      <ProjectIndex projects={projects} t={t} href={href}/>

      <section id="about" className="section about" aria-labelledby="about-title">
        <figure className="portrait">
          <Image src="/assets/images/abdulaziz.jpg" alt={t.name} width={800} height={1000} sizes="(max-width: 820px) 90vw, 420px"/>
          <figcaption>{t.portraitCaption}</figcaption>
        </figure>
        <div className="about-body">
          <h2 id="about-title" className="about-statement">{t.aboutStatement}</h2>
          {t.aboutBody.map(paragraph => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}
          <dl className="facts">
            <div><dt>{t.facts.basedIn}</dt><dd>{t.facts.basedInValue}</dd></div>
            <div><dt>{t.facts.projects}</dt><dd>{t.facts.projectsValue(projects.length)}</dd></div>
            <div><dt>{t.facts.stores}</dt><dd>{t.facts.storesValue(liveApps.length)}</dd></div>
            <div><dt>{t.facts.education}</dt><dd>{t.facts.educationValue}</dd></div>
          </dl>
        </div>
      </section>

      <section id="experience" className="section experience" aria-labelledby="experience-title">
        <header className="section-head"><h2 id="experience-title">{t.experienceTitle}</h2></header>
        <ol className="jobs">
          {experience.map(job => <li key={job.company} className="job">
            <p className="job-date">{job.date}</p>
            <div>
              <h3>{job.company}</h3>
              <p className="job-role">{job.role}</p>
              <p className="job-place">{job.location}</p>
              <p>{job.body}</p>
              <ul className="highlights">{job.highlights.map(item => <li key={item}>{item}</li>)}</ul>
              <ul className="chips" aria-label={t.technologies}>{job.stack.split(' · ').map(tool => <li key={tool}>{tool}</li>)}</ul>
            </div>
          </li>)}
          <li className="job">
            <p className="job-date">{t.graduated(education.year)}</p>
            <div>
              <h3>{education.school}</h3>
              <p className="job-role">{education.degree}</p>
              <p className="job-place">{education.place}</p>
            </div>
          </li>
        </ol>
        <div className="toolkit" aria-labelledby="toolkit-title">
          <h3 id="toolkit-title">{t.toolkitTitle}</h3>
          {toolkit.map(group => <div key={group.area} className="tool-group"><h4>{group.area}</h4><p><List items={group.tools} separator={t.listSeparator}/></p></div>)}
          <div className="tool-group"><h4>{t.certificationsTitle}</h4><p><List items={certifications} separator={t.listSeparator}/></p></div>
          <a className="button small" href={CV} download><Download size={16} aria-hidden="true"/>{t.downloadMyCv}</a>
        </div>
      </section>

      <section id="contact" className="contact" aria-labelledby="contact-title">
        <div className="contact-inner">
          <div className="contact-intro">
            <h2 id="contact-title">{t.contactTitle}</h2>
            <p>{t.contactIntro}</p>
            <a className="contact-email ltr" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <div className="contact-links">
              <a href={LINKEDIN} target="_blank" rel="noreferrer"><Linkedin size={16} aria-hidden="true"/>LinkedIn</a>
              <a href={GITHUB} target="_blank" rel="noreferrer"><Github size={16} aria-hidden="true"/>GitHub</a>
              <a href={CV} download><Download size={16} aria-hidden="true"/>{t.cvPdf}</a>
            </div>
          </div>
          <ContactForm labels={t.form}/>
        </div>
        <footer className="footer"><span>{t.copyright}</span><a href="#top">{t.backToTop}</a></footer>
      </section>
    </main>
  </MotionConfig>;
}

/** Joins mixed-script items so each keeps its own direction inside right-to-left text. */
function List({ items, separator }: { items: string[]; separator: string }) {
  return <>{items.map((item, index) => <Fragment key={item}>{index > 0 && separator}<bdi>{item}</bdi></Fragment>)}</>;
}

function Feature({ project, flip, t, href }: { project: Project; flip: boolean; t: Dictionary; href: (path: string) => string }) {
  const screens = fanScreens[project.slug];
  const caseHref = href(`/projects/${project.slug}`);
  return <article className={`feature${flip ? ' flip' : ''}`} style={{ '--accent': project.accent } as React.CSSProperties}>
    <Tilt href={caseHref} label={t.openCase(project.name)}>
      {screens
        ? <div className="fan">{screens.map(name => <Image key={name} src={`/assets/work/${name}.jpg`} alt="" width={300} height={533} sizes="(max-width: 820px) 40vw, 220px"/>)}</div>
        : project.image && <Image className="solo" src={project.image} alt="" width={900} height={1033} sizes="(max-width: 820px) 80vw, 460px"/>}
    </Tilt>
    <div className="feature-copy">
      <p className="feature-kind">{project.kind}</p>
      <h3>{project.name}</h3>
      <p className="feature-summary">{project.summary}</p>
      {project.impact && <dl className="impact-strip">{project.impact.headline.map(item => <div key={item.label}><dt>{item.label}</dt><dd className="ltr">{item.value}</dd></div>)}</dl>}
      <p className="feature-role"><span>{t.myRole}</span>{project.role}</p>
      <ul className="feature-list">{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
      <ul className="chips" aria-label={t.technologies}>{project.stack.map(tool => <li key={tool}>{tool}</li>)}</ul>
      <div className="feature-links">
        <Link className="button small" href={caseHref}>{t.readCase}</Link>
        {project.storeLinks?.map(link => <a key={link.href} className="text-link" href={link.href} target="_blank" rel="noreferrer">{link.label}<ArrowUpRight size={14} aria-hidden="true" className="dir-icon"/></a>)}
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

function ProjectIndex({ projects, t, href }: { projects: Project[]; t: Dictionary; href: (path: string) => string }) {
  const [filter, setFilter] = useState<'all' | Discipline>('all');
  const rest = projects.filter(project => !featuredSlugs.includes(project.slug));
  const shown = filter === 'all' ? rest : rest.filter(project => project.disciplines.includes(filter));
  const count = (id: 'all' | Discipline) => id === 'all' ? rest.length : rest.filter(project => project.disciplines.includes(id)).length;

  return <section id="index" className="section index" aria-labelledby="index-title">
    <header className="section-head">
      <h2 id="index-title">{t.indexTitle}</h2>
      <p>{t.indexIntro(rest.length)}</p>
    </header>
    <div className="filters" role="group" aria-label={t.filterLabel}>
      {filterIds.map(id => <button key={id} type="button" aria-pressed={filter === id} onClick={() => setFilter(id)}>{t.disciplines[id]}<span>{count(id)}</span></button>)}
    </div>
    <ul className="rows">
      <AnimatePresence initial={false} mode="popLayout">
        {shown.map(project => <motion.li key={project.slug} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .22 }}>
          <Link href={href(`/projects/${project.slug}`)} className="row" style={{ '--accent': project.accent } as React.CSSProperties}>
            <span className="row-name">{project.name}{project.storeLinks ? <em>{t.liveBadge}</em> : project.website && <em>{t.websiteBadge}</em>}</span>
            <span className="row-kind">{project.kind}</span>
            <span className="row-stack">{project.stack.slice(0, 3).join(', ')}</span>
            <span className="row-tags">{project.disciplines.map(item => t.disciplines[item]).join(' / ')}</span>
            <ArrowUpRight size={18} aria-hidden="true" className="row-arrow dir-icon"/>
          </Link>
        </motion.li>)}
      </AnimatePresence>
    </ul>
  </section>;
}
