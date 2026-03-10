import { Code, Terminal, Database, Palette, Globe } from '../components/icons';
// Shared mock data and helpers for the app
export const USERS = [
  {
    id: 1,
    name: "Kartikey Chaudhary",
    role: "Full Stack Developer",
    bio: "I am a passionate developer currently in my first year, aiming to build digital experiences that matter.",
    email: "kartikey@gmail.com",
    skills: { 
      frontend: ["React", "Tailwind", "JS"], 
      backend: ["Node.js", "Express", "MongoDB"], 
      tools: ["Git", "API Design"] 
    },
    avatar: process.env.PUBLIC_URL + "/kartikey.jpg", 
    color: "cyan",
  },
  {
    id: 2,
    name: "Srujan Tagalpallewar",
    role: "UI/UX Designer",
    bio: "I design interfaces that are not just beautiful but intuitive.",
    email: "srujan@gmail.com",
    skills: { 
      frontend: ["Figma", "Adobe XD", "CSS3"], 
      backend: ["Prototyping", "User Flow"], 
      tools: ["Design Systems"] 
    },
    avatar: process.env.PUBLIC_URL + "/srujan.jpg", 
    color: "purple",
  },
  {
    id: 3,
    name: "Palak Dasauni",
    role: "Frontend Developer",
    bio: "Specializing in responsive web design and modern JavaScript frameworks.",
    email: "palak@gmail.com",
    skills: { 
      frontend: ["HTML5", "SASS", "Vue.js"], 
      backend: ["Firebase", "Auth"], 
      tools: ["Webpack", "SEO"] 
    },
    avatar: process.env.PUBLIC_URL + "/palak.jpg",
    color: "emerald",
  },
  {
    id: 4,
    name: "Ayush Bharti",
    role: "Backend Engineer",
    bio: "Building robust APIs and scalable database architectures is my forte.",
    email: "ayush@gmail.com",
    skills: { 
      frontend: ["HTML", "Basic JS"], 
      backend: ["Python", "Django", "Postgres"], 
      tools: ["Docker", "AWS"] 
    },
    avatar: process.env.PUBLIC_URL + "/ayush.jpg", 
    color: "blue",
  },
  {
    id: 5,
    name: "Eshita Modi",
    role: "Product Manager",
    bio: "Bridging the gap between business requirements and technical solutions.",
    email: "eshita@gmail.com",
    skills: { 
      frontend: ["Jira", "Notion"], 
      backend: ["Agile", "Scrum"], 
      tools: ["User Stories"] 
    },
    avatar: process.env.PUBLIC_URL + "/eshita.jpg",
    color: "pink",
  },
  {
    id: 6,
    name: "Aadya Agrawal",
    role: "Data Analyst",
    bio: "Turning raw data into actionable business insights.",
    email: "aadya@gmail.com",
    skills: { 
      frontend: ["Tableau", "PowerBI"], 
      backend: ["SQL", "Python"], 
      tools: ["Statistics"] 
    },
    avatar: process.env.PUBLIC_URL + "/aadya.jpg",
    color: "orange",
  },
];

export const FEATURED_PROJECTS = [
  {
    id: 1,
    title: "CampusConnect",
    desc: "A collaborative platform for students to share notes and organize study groups. Features real-time chat and file sharing.",
    tags: ["React", "Node.js", "Socket.io"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "EcoTracker",
    desc: "Mobile-first web app helping users track their carbon footprint with gamified challenges and daily tips.",
    tags: ["Vue.js", "Firebase", "D3.js"],
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "FinWiz Dashboard",
    desc: "Comprehensive financial analytics dashboard with predictive modelling for personal expense tracking.",
    tags: ["Python", "Django", "React"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?fit=crop&w=800&q=80"
  }
];

export const TECH_STACK = [
  { name: "React", icon: Code },
  { name: "Node.js", icon: Terminal },
  { name: "Python", icon: Terminal },
  { name: "Database", icon: Database },
  { name: "Design", icon: Palette },
  { name: "Cloud", icon: Globe },
];

export const getDetailedData = (user) => {
  const defaults = {
    badges: ["FAST LEARNER", "CLEAN CODE", "GLOBAL MINDSET"],
    availability: {
      status: "Available",
      timezone: "UTC-7 (PST)",
      response: "< 2 Hours"
    },
    arsenal: {
      frontend: user.skills.frontend || [],
      backend: user.skills.backend || [],
      tools: user.skills.tools || []
    },
    projects: [
      { 
        title: "Finance App UI", 
        desc: "Award-winning mobile banking interface design focused on accessibility.", 
        tags: ["Figma", "iOS"], 
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80" 
      },
      { 
        title: "Travel Booking Flow", 
        desc: "Streamlined user flow increasing conversion by 25%.", 
        tags: ["Adobe XD", "Prototyping"], 
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80" 
      }
    ],
    education: {
      school: "Indian Institute of Information Technology",
      degree: "B.Tech Computer Science",
      year: "2025-2029"
    },
    languages: ["English", "Hindi"],
    awards: [
      { title: "Best UI Design 2024", org: "Dribbble Awards" },
      { title: "Google UX Certificate", org: "Coursera" }
    ]
  };

  if (user.role.includes("Developer")) {
    defaults.education.school = "Indian Institute of Information Technology";
    defaults.education.degree = "B.Tech Information Technology";
    defaults.awards = [{title: "Hackathon Winner", org: "SmartIndia"}, {title: "AWS Certified", org: "Amazon"}];
    defaults.projects[0].title = "E-Commerce Platform";
    defaults.projects[0].tags = ["React", "Node.js"];
  }

  return { ...user, ...defaults };
};

