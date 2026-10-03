import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projects as allProjects } from '../data';
import { getContent } from '../i18n/content';
import { getDictionary, localePath, type Locale } from '../i18n/ui';
import ThemeToggle from './ThemeToggle';
import LanguageSwitch from './LanguageSwitch';

export const caseParams = () => allProjects.map(({ slug }) => ({ slug }));

export function caseMetadata(locale: Locale, slug: string): Metadata {
  const project = getContent(locale).projects.find(p => p.slug === slug);
  if (!project) return {};
  const t = getDictionary(locale);
  return {
    title: t.meta.caseTitle(project.name),
    description: project.summary,
    alternates: { languages: { en: `/projects/${slug}`, ar: `/ar/projects/${slug}` } }
  };
}

export default function CaseStudy({ locale, slug }: { locale: Locale; slug: string }) {
  const t = getDictionary(locale);
  const c = t.caseStudy;
  const { projects } = getContent(locale);
  const index = projects.findIndex(p => p.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const gallery = project.gallery ?? [];
  const href = (path: string) => localePath(locale, path);
  const otherLocale: Locale = locale === 'en' ? 'ar' : 'en';

  return <main className="case-page" style={{ '--accent': project.accent } as React.CSSProperties}>
    <div className="case-top">
      <Link className="back" href={href('/#work')}><ArrowLeft size={17} aria-hidden="true" className="dir-icon"/>{c.allWork}</Link>
      <div className="case-actions">
        <LanguageSwitch {...t.otherLanguage} href={localePath(otherLocale, `/projects/${slug}`)}/>
        <ThemeToggle labels={t.theme}/>
        <Link className="button small" href={href('/#contact')}>{c.getInTouch}</Link>
      </div>
    </div>

    <section className="case-hero">
      {project.icon && <img className="case-icon" src={project.icon} alt={c.logo(project.name)} width={64} height={64}/>}
      <p className="feature-kind">{project.kind}</p>
      <h1>{project.name}</h1>
      <p className="case-summary">{project.summary}</p>
      <ul className="chips" aria-label={t.technologies}>{project.stack.map(tool => <li key={tool}>{tool}</li>)}</ul>
      {project.storeLinks && <div className="case-store">{project.storeLinks.map(link => <a key={link.href} className="button quiet small" href={link.href} target="_blank" rel="noreferrer">{c.getItOn(link.label)}<ArrowUpRight size={15} aria-hidden="true" className="dir-icon"/></a>)}</div>}
      {project.website && <div className="case-store"><a className="button quiet small" href={project.website} target="_blank" rel="noreferrer">{c.visitWebsite}<ArrowUpRight size={15} aria-hidden="true" className="dir-icon"/></a></div>}
    </section>

    {gallery.length > 0 && <section className="case-gallery" aria-label={c.screens(project.name)} tabIndex={0}>
      {gallery.map((src, i) => <img key={src} src={src} alt={c.screen(project.name, i + 1)} className={src.endsWith('.png') ? 'wide' : undefined} loading={i < 3 ? 'eager' : 'lazy'}/>)}
    </section>}

    <section className="case-body">
      <article><h2>{c.myRole}</h2><p>{c.roleDetail(project.role)}</p></article>
      <article><h2>{c.keyFeatures}</h2><ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul></article>
    </section>

    {project.impact && <>
      <section className="impact" aria-labelledby="impact-title">
        <header className="impact-head">
          <h2 id="impact-title">{c.impactTitle}</h2>
          <p>{c.impactIntro(project.impact.period)}</p>
        </header>
        <div className="impact-table" role="table" aria-label={c.impactTable}>
          <div className="impact-row impact-labels" role="row"><span role="columnheader">{c.columns.area}</span><span role="columnheader">{c.columns.before}</span><span role="columnheader">{c.columns.after}</span><span role="columnheader">{c.columns.change}</span></div>
          {project.impact.metrics.map(metric => <div className="impact-row" role="row" key={metric.area}>
            <span role="cell" className="impact-area">{metric.area}</span>
            <span role="cell" className="impact-before">{metric.before}</span>
            <span role="cell" className="impact-after">{metric.after}</span>
            <span role="cell" className="impact-change"><bdi>{metric.change}</bdi></span>
          </div>)}
        </div>
        <p className="impact-note">{project.impact.method}</p>
      </section>

      <section className="fixes" aria-labelledby="fixes-title">
        <h2 id="fixes-title">{c.howTitle}</h2>
        <div className="fix-grid">{project.impact.fixes.map(fix => <article key={fix.title} className="fix">
          <h3>{fix.title}</h3>
          <p><b>{c.problem}</b> {fix.problem}</p>
          <p><b>{c.solution}</b> {fix.solution}</p>
        </article>)}</div>
      </section>

      <section className="case-body case-lists">
        <article><h2>{c.alsoBuilt}</h2><ul>{project.impact.systems.map(item => <li key={item}>{item}</li>)}</ul></article>
        <article><h2>{c.reliability}</h2><ul>{project.impact.reliability.map(item => <li key={item}>{item}</li>)}</ul></article>
        <article><h2>{c.delivery}</h2><ul>{project.impact.delivery.map(item => <li key={item}>{item}</li>)}</ul></article>
      </section>
    </>}

    <nav className="case-next" aria-label={c.nextProject}>
      <Link className="next-link" href={href(`/projects/${next.slug}`)}><span>{c.nextProject}</span><b>{next.name}</b></Link>
      <Link className="button" href={href('/#contact')}>{c.similar}</Link>
    </nav>
  </main>;
}
