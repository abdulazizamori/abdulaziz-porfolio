'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Menu, X, Layers3, Cpu, Database, Smartphone, Send } from 'lucide-react';
import { useRef, useState } from 'react';
import { experience, projects, type Project } from './data';

const GravityScene = dynamic(() => import('./components/GravityScene'), { ssr: false });
const reveal = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .16 }, transition: { duration: .7, ease: [.2,.8,.2,1] as [number, number, number, number] } };
const symbols = ['</>', '{}', '[]', '=>', 'fn()', '//', 'AI', '01', '< >'];
const roles = ['Software Engineer', 'Flutter Developer', 'Full-Stack Developer', 'AI Developer'];
type Trail = { id: number; x: number; y: number; symbol: string; driftX: number; driftY: number; rotate: number };

export default function Home() {
  const [menu, setMenu] = useState(false); const [showAllProjects, setShowAllProjects] = useState(false);
  const { scrollYProgress } = useScroll(); const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const mouseX = useMotionValue(-200); const mouseY = useMotionValue(-200);
  const auraX = useSpring(mouseX, { stiffness: 90, damping: 24, mass: .35 });
  const auraY = useSpring(mouseY, { stiffness: 90, damping: 24, mass: .35 });
  const [trails, setTrails] = useState<Trail[]>([]);
  const lastTrail = useRef({ x: -100, y: -100 });
  const nav = ['About', 'Projects', 'Experience', 'Stack', 'Contact'];
  const followPointer = (event: React.PointerEvent<HTMLElement>) => {
    const { clientX: x, clientY: y } = event;
    mouseX.set(x); mouseY.set(y);
    if (Math.hypot(x - lastTrail.current.x, y - lastTrail.current.y) < 34) return;
    lastTrail.current = { x, y };
    const id = Date.now() + Math.random();
    const particle: Trail = { id, x, y, symbol: symbols[Math.floor(Math.random() * symbols.length)], driftX: Math.round((Math.random() - .5) * 110), driftY: -30 - Math.round(Math.random() * 90), rotate: Math.round((Math.random() - .5) * 55) };
    setTrails(current => [...current.slice(-20), particle]);
    window.setTimeout(() => setTrails(current => current.filter(item => item.id !== id)), 1250);
  };
  return <main onPointerMove={followPointer}>
    <motion.div className="progress" style={{ width: progress }} />
    <motion.div className="cursor-aura" style={{ x: auraX, y: auraY }} />
    <motion.div className="cursor-dot" style={{ x: mouseX, y: mouseY }} />
    <div className="code-trail" aria-hidden="true">{trails.map(item => <span key={item.id} style={{ left: item.x, top: item.y, '--drift-x': `${item.driftX}px`, '--drift-y': `${item.driftY}px`, '--rotate': `${item.rotate}deg` } as React.CSSProperties}>{item.symbol}</span>)}</div>
    <div className="ambient-particles" aria-hidden="true">{Array.from({ length: 14 }, (_, i) => <i key={i} style={{ '--particle': i } as React.CSSProperties} />)}</div>
    <header className="nav"><a href="#home" className="brand">AA<span>.</span></a><nav>{nav.map(x => <a key={x} href={`#${x.toLowerCase()}`}>{x}</a>)}</nav><a className="cv" href="mailto:abdulaziz.amori10@gmail.com?subject=CV request">Request CV <ArrowUpRight size={15}/></a><button className="menu" onClick={() => setMenu(!menu)} aria-label="Menu">{menu ? <X/> : <Menu/>}</button></header>
    {menu && <div className="mobile-menu">{nav.map(x => <a onClick={() => setMenu(false)} key={x} href={`#${x.toLowerCase()}`}>{x}</a>)}</div>}
    <section id="home" className="hero"><div className="hero-copy"><motion.p {...reveal} className="eyebrow">AVAILABLE FOR SELECTED PROJECTS</motion.p><motion.h1 {...reveal} transition={{duration:.8, delay:.08}}>Digital products<br/><i>that ship.</i></motion.h1><motion.div {...reveal} transition={{delay:.13}} className="role-rail"><span className="role-label">Building as</span><div className="role-window" aria-label="Software Engineer, Flutter Developer, Full-Stack Developer, and AI Developer"><div className="role-track">{roles.map(role => <span key={role}>{role}</span>)}</div></div></motion.div><motion.p {...reveal} transition={{delay:.16}} className="lede">I’m Abdulaziz Amori — a full-stack engineer shaping useful mobile, web, backend, and AI experiences.</motion.p><motion.div {...reveal} transition={{delay:.24}} className="actions"><a href="#projects" className="button">View selected work <ArrowDown size={16}/></a><a href="#contact" className="button ghost">Start a conversation</a></motion.div><motion.div {...reveal} transition={{delay:.3}} className="socials"><a href="https://github.com/abdulazizamori" target="_blank" rel="noreferrer" aria-label="GitHub profile"><Github size={17}/></a><a href="https://www.linkedin.com/in/abdulaziz-amori-414592332/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><Linkedin size={17}/></a><a href="mailto:abdulaziz.amori10@gmail.com" aria-label="Email Abdulaziz"><Mail size={17}/></a><span>Jeddah, Saudi Arabia</span></motion.div><motion.div {...reveal} transition={{delay:.36}} className="hero-proof"><span><b>{projects.length}+</b> shipped projects</span><span><b>4</b> engineering disciplines</span><span><b>2026</b> open to selected work</span></motion.div></div><div className="scene"><GravityScene/><div className="scene-label top">MOBILE · WEB · BACKEND · AI</div><div className="scene-label bottom">SYSTEMS IN MOTION</div></div><a href="#about" className="scroll">SCROLL TO EXPLORE <span>↓</span></a></section>
    <section id="about" className="section about"><Heading num="01" label="ABOUT" title={<>Engineering ideas into<br/>useful products.</>}/><motion.div {...reveal} className="about-grid"><p className="about-copy">I build complete digital products, from polished Flutter applications and focused web interfaces to resilient APIs and AI features with real utility. Every layer is designed to work together — clearly, reliably, and at production speed.</p><div className="stats">{[['03+','YEARS BUILDING'],[`${projects.length}+`,'PROJECTS DELIVERED'],['10+','PRODUCTION APPS'],['AI','FULL-STACK FOCUS']].map(([n,l])=><div className="stat" key={l}><b>{n}</b><span>{l}</span></div>)}</div></motion.div></section>
    <section className="section"><Heading num="02" label="CAPABILITIES" title={<>One product mindset.<br/>Four disciplines.</>}/><div className="capabilities"><Capability number="01" title="Mobile" body="Flutter applications that feel native, fast, and intentional." icon={<Smartphone/>}/><Capability number="02" title="Web" body="Dashboards and product interfaces that clarify complex work." icon={<Layers3/>}/><Capability number="03" title="Backend" body="APIs, real-time flows, payment systems, and integrations." icon={<Database/>}/><Capability number="04" title="AI" body="LLM, RAG, voice, and intelligence layers built around outcomes." icon={<Cpu/>}/></div></section>
    <section id="projects" className="section projects"><Heading num="03" label="SELECTED WORK" title={<>Products with real<br/>operational weight.</>}/><div id="project-list" className="project-list">{projects.slice(0, showAllProjects ? projects.length : 4).map((project, index) => <ProjectCard key={`project-${project.slug}-${index}`} project={project} index={index}/>)}</div>{projects.length > 4 && <button className="button ghost more-projects" type="button" aria-expanded={showAllProjects} aria-controls="project-list" onClick={() => setShowAllProjects(value => !value)}>{showAllProjects ? 'Show featured projects' : `See ${projects.length - 4} more projects`} <ArrowDown size={16} className={showAllProjects ? 'more-projects-icon expanded' : 'more-projects-icon'}/></button>}</section>
    <section id="experience" className="section"><Heading num="04" label="EXPERIENCE" title={<>A career at the<br/>intersection of product and systems.</>}/><div className="timeline">{experience.map((e,i)=><motion.article key={`experience-${e.company}-${i}`} {...reveal} className="job"><div><span>{e.date}</span><i/></div><div><h3>{e.company}</h3><h4>{e.role}</h4><p className="location">{e.location}</p><p>{e.body}</p><small>{e.stack}</small></div></motion.article>)}</div></section>
    <section id="stack" className="section stack"><Heading num="05" label="TECHNOLOGY UNIVERSE" title={<>Tools in orbit around<br/>product outcomes.</>}/><motion.div {...reveal} className="orbit"><div className="orbital core-orbit">BUILD</div>{['Flutter','Next.js','Laravel','Node.js','Firebase','Python','TensorFlow','RAG / LLMs','GitHub Actions','Google Maps'].map((technology,i)=><span key={`orbit-${i}-${technology}`} style={{'--i':i} as React.CSSProperties}>{technology}</span>)}</motion.div><div className="stack-categories"><p><b>Mobile</b>Flutter · Dart · Swift · Java · Cubit</p><p><b>Frontend</b>Next.js · React · TypeScript · Tailwind</p><p><b>Backend</b>Laravel · Node.js · REST · WebSockets</p><p><b>AI / ML</b>Python · TensorFlow · RAG · Vector Search</p></div></section>
    <section className="section process"><Heading num="06" label="HOW I WORK" title={<>Signal over noise.<br/>Process over guesswork.</>}/><div className="process-row">{['Discover','Design','Architect','Develop','Integrate','Test','Deploy','Improve'].map((step, index) => <ProcessStep key={`process-${index}-${step}`} step={step} index={index}/>)}</div><div className="ai-flow"><p>AI CAPABILITIES</p>{['User input','Application context','LLM / RAG layer','Backend guardrails','Structured response'].map((capability, index) => <AiCapability key={`ai-capability-${index}-${capability}`} capability={capability}/>)}</div></section>
    <section id="contact" className="section contact"><Heading num="07" label="CONTACT" title={<>Have a product idea?<br/><i>Let’s build it.</i></>}/><div className="contact-grid"><div><p>Open to product, freelance, and collaborative opportunities. Tell me what you’re working on.</p><a href="mailto:abdulaziz.amori10@gmail.com">abdulaziz.amori10@gmail.com <ArrowUpRight size={18}/></a></div><form action="https://formsubmit.co/abdulaziz.amori10@gmail.com" method="POST"><input type="hidden" name="_subject" value="New portfolio contact message"/><input type="hidden" name="_template" value="table"/><input required name="name" autoComplete="name" aria-label="Your name" placeholder="Your name"/><input required name="email" type="email" autoComplete="email" aria-label="Email address" placeholder="Email address"/><input name="company" autoComplete="organization" aria-label="Company" placeholder="Company (optional)"/><textarea required name="message" aria-label="Project details" placeholder="What would you like to build?" rows={5}/><button className="button" type="submit">Send message <Send size={16}/></button></form></div></section>
    <footer>© 2026 Abdulaziz Amori <span>·</span> Full-Stack & AI Engineer</footer>
  </main>;
}
function Heading({num,label,title}:{num:string;label:string;title:React.ReactNode}) { return <motion.div {...reveal} className="heading" data-number={num}><p>{num} / {label}</p><h2>{title}</h2></motion.div> }
function Capability({number,title,body,icon}:{number:string;title:string;body:string;icon:React.ReactNode}) { return <motion.article {...reveal} className="cap"><span>{number}</span>{icon}<h3>{title}</h3><p>{body}</p><em>Explore <ArrowUpRight size={14}/></em></motion.article> }
function ProcessStep({ step, index }: { step: string; index: number }) { return <motion.div {...reveal} transition={{ delay: index * .05 }}><span>0{index + 1}</span>{step}</motion.div>; }
function AiCapability({ capability }: { capability: string }) { return <span>{capability}<i>↓</i></span>; }
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <motion.article {...reveal} className="project" style={{ '--accent': project.accent } as React.CSSProperties}>
    <span className="project-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
    <div className="project-info">
      <p className="eyebrow">{String(index + 1).padStart(2, '0')} / {project.kind}</p><h3>{project.name}</h3><p>{project.summary}</p><small>{project.role}</small>
      <div className="tags">{project.stack.map((technology, technologyIndex) => <span key={`technology-${project.slug}-${technologyIndex}-${technology}`}>{technology}</span>)}</div>
      {project.storeLinks && <div className="store-links">{project.storeLinks.map((link, linkIndex) => <a key={`store-${project.slug}-${linkIndex}-${link.href}`} href={link.href} target="_blank" rel="noreferrer">{link.label} <ArrowUpRight size={14}/></a>)}</div>}
      <Link href={`/projects/${project.slug}`} className="case">View case study <ArrowUpRight size={16}/></Link>
    </div>
    <ProjectVisual project={project}/>
  </motion.article>;
}

function ProjectVisual({ project }: { project: Project }) {
  const rotateX = useMotionValue(0); const rotateY = useMotionValue(0);
  const smoothX = useSpring(rotateX, { stiffness: 130, damping: 22, mass: .7 });
  const smoothY = useSpring(rotateY, { stiffness: 130, damping: 22, mass: .7 });
  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    rotateY.set(((event.clientX - rect.left) / rect.width - .5) * 9);
    rotateX.set(-((event.clientY - rect.top) / rect.height - .5) * 7);
  };
  return <motion.div className="device-shell" onPointerMove={move} onPointerLeave={() => { rotateX.set(0); rotateY.set(0); }} style={{ rotateX: smoothX, rotateY: smoothY, transformPerspective: 1100 }}>
    <Link href={`/projects/${project.slug}`} className="device">{project.image ? <Image src={project.image} alt={`${project.name} project`} fill sizes="(max-width: 800px) 80vw, 38vw"/> : <div className="abstract-project"><b>{project.name}</b><span>PRODUCT / ENGINEERING</span></div>}</Link>
  </motion.div>;
}
