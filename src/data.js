// All site copy lives here so content updates never require touching layout code.
import emanLogo from './assets/images/eman-el-tobgy-logo.png';
import innoverLogo from './assets/images/innover-star-logo.png';
import doueLogo from './assets/images/doue-project-logo.jpg';

export const profile = {
  name: 'Youssef Al-Fiqy',
  shortName: 'YF',
  location: 'Cairo, Egypt',
  email: 'fiqyyyy@gmail.com',
  phone: '+201200096266',
  phoneDisplay: '+20 120 009 6266',
  roles: ['websites', 'automations', 'dashboards', 'digital solutions'],
};

export const socials = [
  { id: 'linkedin', label: 'LinkedIn', handle: 'in/yfiqy', href: 'https://linkedin.com/in/yfiqy' },
  { id: 'github', label: 'GitHub', handle: '@fiqyy', href: 'https://github.com/fiqyy' },
  { id: 'instagram', label: 'Instagram', handle: '@yousseffiqy', href: 'https://www.instagram.com/yousseffiqy/' },
];

export const stats = [
  { value: '4', label: 'Client websites shipped' },
  { value: '2', label: 'Professional certificates' },
  { value: 'UN', label: 'WFP digital solutions volunteer' },
];

export const skillGroups = [
  {
    title: 'Build',
    blurb: 'Responsive front-ends and full-stack web apps.',
    items: ['React', 'JavaScript', 'HTML', 'CSS', 'Python', 'Django', 'Git'],
  },
  {
    title: 'Automate',
    blurb: 'Low-code tools that remove manual work.',
    items: ['Power Apps', 'Power Automate', 'SharePoint Online'],
  },
  {
    title: 'Analyze',
    blurb: 'Turning raw data into decisions.',
    items: ['SQL', 'Pandas', 'NumPy', 'Tableau', 'Excel'],
  },
];

export const credentials = [
  { title: "Bachelor's in Business Information Systems", org: 'Arab Academy for Science and Technology', date: '2023 – 2027' },
  { title: 'Meta Full-Stack Web Developer', org: 'Meta · Coursera', date: 'March 2026' },
  { title: 'Google Data Analytics', org: 'Google', date: 'May 2026' },
];

export const experience = [
  {
    role: 'Digital Solutions (Business Transformation) Volunteer',
    org: 'UN World Food Programme',
    date: 'July 2026 – October 2026',
    summary:
      'Built and enhanced business-continuity and operations tools on Microsoft Power Platform — automated workflows, centralized data, PDF reporting and email automation.',
    points: [
      'Developed low-code business apps with Power Apps, Power Automate and SharePoint.',
      'Designed SharePoint forms, lists and workflows for data collection and reporting.',
      'Automated notifications and approvals to cut manual effort.',
      'Gathered requirements with stakeholders and troubleshot live issues.',
    ],
    tags: ['Power Apps', 'Power Automate', 'SharePoint'],
  },
];

// Descriptions are intentionally brief — add the stack and one concrete result per project.
export const projects = [
  {
    title: 'Dr. Eman El Tobgy',
    mark: 'ET',
    logo: emanLogo,
    kind: 'Portfolio web app',
    description: 'A professional portfolio for an academic — designed, built and deployed end to end, with technical SEO configured.',
    tags: ['Design', 'Development', 'Deployment', 'Technical SEO'],
    href: 'https://www.emaneltobgy.com/',
    hue: 174,
  },
  {
    title: 'ESLF Law Firm',
    mark: 'ES',
    kind: 'Company website',
    description: 'A modern website presenting the firm, its practice areas and achievements.',
    tags: ['Client work', 'Responsive', 'Web development'],
    href: 'https://new-eslf.vercel.app/',
    hue: 42,
  },
  {
    title: 'Innover Star',
    mark: 'IS',
    logo: innoverLogo,
    kind: 'Company website',
    description: 'A business website built to present the company and its services clearly.',
    tags: ['Client work', 'Responsive', 'Web development'],
    href: 'https://www.innoverstar.com/',
    hue: 210,
  },
  {
    title: 'Douè Project',
    mark: 'DP',
    logo: doueLogo,
    logoPlate: 'dark',
    kind: 'Clothing brand',
    description: 'Online home for a clothing brand, plus design assets such as size charts.',
    tags: ['Client work', 'Brand', 'Design assets'],
    href: 'https://www.doueproject.com/',
    hue: 0,
    saturation: 0,
  },
];

export const labProjects = [
  { title: 'To-Do List App', href: 'https://to-do-list-app-uy9e.vercel.app/' },
  { title: 'Calculator App', href: 'https://calculator-app-dun-rho.vercel.app/' },
];

export const navItems = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'about', label: 'About', path: '/about' },
  { id: 'experience', label: 'Experience', path: '/experience' },
  { id: 'projects', label: 'Projects', path: '/projects' },
  { id: 'contact', label: 'Contact', path: '/contact' },
];
