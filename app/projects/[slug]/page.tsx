import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projects } from '../../data';
import ThemeToggle from '../../components/ThemeToggle';

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) return {};
  return { title: `${project.name} — Abdulaziz Amori`, description: project.summary };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex(p => p.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const gallery = project.gallery ?? [];

  return <main className="case-page" style={{ '--accent': project.accent } as React.CSSProperties}>
    <div className="case-top">
      <Link className="back" href="/#work"><ArrowLeft size={17} aria-hidden="true"/>All work</Link>
      <div className="case-actions"><ThemeToggle/><Link className="button small" href="/#contact">Get in touch</Link></div>
    </div>

    <section className="case-hero">
      {project.icon && <img className="case-icon" src={project.icon} alt={`${project.name} logo`} width={64} height={64}/>}
      <p className="feature-kind">{project.kind}</p>
      <h1>{project.name}</h1>
      <p className="case-summary">{project.summary}</p>
      <ul className="chips" aria-label="Technologies">{project.stack.map(tool => <li key={tool}>{tool}</li>)}</ul>
      {project.storeLinks && <div className="case-store">{project.storeLinks.map(link => <a key={link.href} className="button quiet small" href={link.href} target="_blank" rel="noreferrer">Get it on {link.label}<ArrowUpRight size={15} aria-hidden="true"/></a>)}</div>}
      {project.website && <div className="case-store"><a className="button quiet small" href={project.website} target="_blank" rel="noreferrer">Visit the website<ArrowUpRight size={15} aria-hidden="true"/></a></div>}
    </section>

    {gallery.length > 0 && <section className="case-gallery" aria-label={`${project.name} screens`} tabIndex={0}>
      {gallery.map((src, i) => <img key={src} src={src} alt={`${project.name} screen ${i + 1}`} className={src.endsWith('.png') ? 'wide' : undefined} loading={i < 3 ? 'eager' : 'lazy'}/>)}
    </section>}

    <section className="case-body">
      <article><h2>My role</h2><p>{project.role}. I worked across interface, state management, API integration, performance, and release readiness.</p></article>
      <article><h2>Key features</h2><ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul></article>
    </section>

    {project.impact && <>
      <section className="impact" aria-labelledby="impact-title">
        <header className="impact-head">
          <h2 id="impact-title">Engineering impact</h2>
          <p>Measured before and after my changes, {project.impact.period}.</p>
        </header>
        <div className="impact-table" role="table" aria-label="Before and after measurements">
          <div className="impact-row impact-labels" role="row"><span role="columnheader">Area</span><span role="columnheader">Before</span><span role="columnheader">After</span><span role="columnheader">Change</span></div>
          {project.impact.metrics.map(metric => <div className="impact-row" role="row" key={metric.area}>
            <span role="cell" className="impact-area">{metric.area}</span>
            <span role="cell" className="impact-before">{metric.before}</span>
            <span role="cell" className="impact-after">{metric.after}</span>
            <span role="cell" className="impact-change">{metric.change}</span>
          </div>)}
        </div>
        <p className="impact-note">{project.impact.method}</p>
      </section>

      <section className="fixes" aria-labelledby="fixes-title">
        <h2 id="fixes-title">How I got there</h2>
        <div className="fix-grid">{project.impact.fixes.map(fix => <article key={fix.title} className="fix">
          <h3>{fix.title}</h3>
          <p><b>Problem.</b> {fix.problem}</p>
          <p><b>What I did.</b> {fix.solution}</p>
        </article>)}</div>
      </section>

      <section className="case-body case-lists">
        <article><h2>Also built</h2><ul>{project.impact.systems.map(item => <li key={item}>{item}</li>)}</ul></article>
        <article><h2>Reliability and security</h2><ul>{project.impact.reliability.map(item => <li key={item}>{item}</li>)}</ul></article>
        <article><h2>Delivery</h2><ul>{project.impact.delivery.map(item => <li key={item}>{item}</li>)}</ul></article>
      </section>
    </>}

    <nav className="case-next" aria-label="Next project">
      <Link className="next-link" href={`/projects/${next.slug}`}><span>Next project</span><b>{next.name}</b></Link>
      <Link className="button" href="/#contact">Have a similar project? Let’s talk</Link>
    </nav>
  </main>;
}
