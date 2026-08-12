import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projects } from '../../data';

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const project = projects.find(p => p.slug === slug); if (!project) notFound();
  return <main className="case-page"><Link className="back" href="/#projects"><ArrowLeft size={17}/> Back to selected work</Link><section className="case-hero" style={{ '--accent': project.accent } as React.CSSProperties}><p>{project.kind}</p><h1>{project.name}</h1><p className="case-summary">{project.summary}</p><div>{project.stack.map(x => <span key={x}>{x}</span>)}</div>{project.storeLinks && <div className="case-store-links">{project.storeLinks.map(link => <a key={link.label} href={link.href} target="_blank" rel="noreferrer">Get it on {link.label} <ArrowUpRight size={15}/></a>)}</div>}</section><section className="case-body"><article><p className="eyebrow">THE OPPORTUNITY</p><h2>Make a complex product feel clear, fast, and trustworthy.</h2><p>{project.summary} The work connected the customer-facing experience with the operational systems behind it.</p></article><article><p className="eyebrow">ROLE & ARCHITECTURE</p><h2>{project.role}</h2><p>Product thinking across interface, state, API integration, performance, and release readiness — organized into focused, testable layers.</p></article><article><p className="eyebrow">KEY FEATURES</p><ul>{project.features.map(feature => <li key={feature}>{feature}<ArrowUpRight size={16}/></li>)}</ul></article></section><Link className="case-contact" href="/#contact">Have a similar challenge? Let’s talk <ArrowUpRight size={18}/></Link></main>;
}
