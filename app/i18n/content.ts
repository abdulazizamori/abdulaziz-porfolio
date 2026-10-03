import { certifications, education, experience, projects, toolkit, type Project } from '../data';
import { educationAr, experienceAr, projectsAr, toolkitAr } from './content-ar';
import type { Locale } from './ui';

export type Job = (typeof experience)[number];
export type Content = {
  projects: Project[];
  experience: Job[];
  education: typeof education;
  certifications: string[];
  toolkit: { area: string; tools: string[] }[];
};

function localizeProject(project: Project): Project {
  const text = projectsAr[project.slug];
  if (!text) return project;
  return { ...project, ...text, name: text.name ?? project.name, impact: text.impact ?? project.impact };
}

/** All page content for one language. Brand names, links, and tech names stay as in the English data. */
export function getContent(locale: Locale): Content {
  if (locale === 'en') return { projects, experience, education, certifications, toolkit };
  return {
    projects: projects.map(localizeProject),
    experience: experience.map((job, index) => ({ ...job, ...experienceAr[index] })),
    education: { ...education, ...educationAr },
    certifications,
    toolkit: toolkit.map(group => ({ area: toolkitAr[group.area] ?? group.area, tools: group.tools.map(tool => toolkitAr[tool] ?? tool) }))
  };
}
