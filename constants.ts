
import { Project, Experience, SuggestionChipData } from './types';
// Import 'Type' enum for function declaration schema as per @google/genai JS SDK.
import { FunctionDeclaration, Type } from "@google/genai";

export const GEMINI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

export const AYANDA_NAME = "Ayanda M.";
export const AYANDA_TITLE = "Creative Full-Stack Developer";
export const AYANDA_PROFILE_PIC = "https://picsum.photos/seed/ayanda/150/150";

export const AYANDA_BIO = "I build beautiful, responsive, and highly functional web applications. My passion lies at the intersection of stunning design and robust back-end architecture.";

export const SOCIAL_LINKS = [
  { icon: "fab fa-github", url: "#", label: "GitHub" },
  { icon: "fab fa-linkedin-in", url: "#", label: "LinkedIn" },
  { icon: "fab fa-twitter", url: "#", label: "Twitter" },
  { icon: "fas fa-file-pdf", url: "#", label: "Resume" },
];

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'project-1',
    title: 'AI Research Assistant',
    description: 'A platform to help researchers summarize, analyze, and discover scientific papers efficiently.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=60',
    tags: ['Next.js', 'Python', 'AI/ML'],
    liveDemoUrl: '#',
    sourceCodeUrl: '#',
  },
  {
    id: 'project-2',
    title: 'DevPortfolio CMS',
    description: 'A headless CMS designed for developers to easily manage and deploy portfolio websites.',
    imageUrl: 'https://picsum.photos/seed/dev-cms/800/600',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    liveDemoUrl: '#',
    sourceCodeUrl: '#',
  },
   {
    id: 'project-3',
    title: 'CodeCollab VR',
    description: 'A virtual reality platform for collaborative coding sessions and project management.',
    imageUrl: 'https://picsum.photos/seed/code-vr/800/600',
    tags: ['Unity', 'C#', 'WebSockets'],
  },
  {
    id: 'project-4',
    title: 'Data Viz Dashboard',
    description: 'An interactive dashboard for visualizing complex business intelligence data in real-time.',
    imageUrl: 'https://picsum.photos/seed/data-viz/800/600',
    tags: ['D3.js', 'React', 'Firebase'],
  },
];

export const WORK_EXPERIENCE: Experience[] = [
  {
    id: 'exp-1',
    role: 'Senior Software Engineer',
    company: 'TechCorp',
    companyColorClass: 'text-purple-400',
    period: 'Jan 2021 - Present',
    description: 'Leading development of the core platform, mentoring junior developers, and architecting new microservices using cutting-edge technologies.',
  },
  {
    id: 'exp-2',
    role: 'Full-Stack Developer',
    company: 'Innovate LLC',
    companyColorClass: 'text-purple-400',
    period: 'Jun 2018 - Dec 2020',
    description: 'Developed and maintained client-facing web applications using the MERN stack, contributing to all phases of the development lifecycle.',
  },
];

export const INITIAL_SUGGESTION_CHIPS: SuggestionChipData[] = [
  { id: 'chip-projects', prompt: "Show me Ayanda's projects", icon: "fa-solid fa-layer-group", delay: "0.6s" },
  { id: 'chip-experience', prompt: "What's Ayanda's work experience?", icon: "fa-solid fa-briefcase", delay: "0.7s" },
  { id: 'chip-about', prompt: "Tell me about Ayanda", icon: "fa-solid fa-user", delay: "0.8s" },
];

export const DISPLAY_PROJECTS_FUNCTION_NAME = "displayAyandaProjects";

export const displayProjectsFunctionDeclaration: FunctionDeclaration = {
  name: DISPLAY_PROJECTS_FUNCTION_NAME,
  description: "Displays Ayanda's featured projects as interactive cards in the chat. Use this function when the user explicitly asks to see, show, or display projects, or asks a question like 'what are your projects?' or 'can I see your projects?'. This function does not take any parameters.",
  // Use 'Type.OBJECT' from '@google/genai' JS SDK.
  parameters: { type: Type.OBJECT, properties: {} },
};

export const GEMINI_SYSTEM_INSTRUCTION = `You are Ayanda's AI assistant. Ayanda is a creative Full-Stack Developer.
Ayanda's name is ${AYANDA_NAME}.
Ayanda's title is ${AYANDA_TITLE}.
Ayanda's biography: "${AYANDA_BIO}".
Ayanda's key skills include React, Next.js, TypeScript, Node.js, Python, UI/UX design, D3.js, and Unity.

Ayanda's portfolio includes the following projects:
${FEATURED_PROJECTS.map(p => `- ${p.title}: ${p.description} (Technologies: ${p.tags.join(', ')})`).join('\n')}

Ayanda's work experience:
${WORK_EXPERIENCE.map(e => `- ${e.role} at ${e.company} (${e.period}): ${e.description}`).join('\n')}

Your role is to:
- Answer questions about Ayanda's skills, projects, experience, and background based *only* on the information provided above.
- Be friendly, professional, and informative.
- If the user explicitly asks to "show projects", "display projects", "what are your projects", "can I see your projects", or similar phrases primarily requesting a visual or list-based display of projects, you MUST call the '${DISPLAY_PROJECTS_FUNCTION_NAME}' function. Do not provide a text response in this case; only call the function.
- If the user asks for details about a *specific* project (e.g., "Tell me more about the AI research assistant project"), or a general question about the *nature* of the projects (e.g., "What kind of projects do you work on?"), provide a text-based answer as usual, using markdown for emphasis. Do not call the '${DISPLAY_PROJECTS_FUNCTION_NAME}' function for these types of questions.
- When asked for "experience", summarize roles and responsibilities. You can use markdown.
- Do not make up information not provided here. If you don't know or the information is not in your knowledge base, politely state that you don't have that specific detail but can talk about other aspects based on the provided information.
- Keep responses concise and engaging for a chat interface.
- Do not offer to switch to the portfolio view yourself; the user has a button for that.
- If the user asks a general question not related to Ayanda, try to politely steer the conversation back to Ayanda's profile or provide a very brief, general answer if appropriate and then try to return to the topic of Ayanda.
`;
