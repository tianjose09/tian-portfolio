/**
 * Single source of truth for all portfolio content.
 * Edit this file to update the website — the React client reads it through GET /api/portfolio.
 *
 * Sources: CV (RESUME - OFFICIAL.pdf), GitHub (tianjose09), project repositories,
 * and verified Credly badge pages. Nothing here is invented — keep it that way.
 */

const profile = {
  firstName: 'Khristian Jose',
  lastName: 'Guinto',
  fullName: 'Khristian Jose DP. Guinto',
  role: 'Aspiring Full-Stack Developer',
  specialization: 'Web & Mobile Application Development',
  tagline:
    'I build web and mobile applications, from the interface people use to the APIs and databases behind it.',
  summary:
    'BS Information Technology student at FEU Institute of Technology, specializing in Web and Mobile Application. I have hands-on experience in web and mobile development, database management, and quality assurance, supported by strong collaboration, communication, and problem-solving skills.',
  quote:
    'From the screen people tap to the API and database behind it, I build applications that work end to end.',
  availability: 'Open for OJT / Internship',
  location: 'Baliuag, Bulacan, Philippines',
  email: 'kdguinto@fit.edu.ph.com',
  photo: '/images/khristian.webp',
  socials: {
    github: 'https://github.com/tianjose09',
    linkedin: 'https://www.linkedin.com/in/khristian-jose-guinto-97a0b6381/',
  },
};

const focusAreas = [
  {
    icon: 'web',
    title: 'Web Development',
    text: 'Responsive interfaces with HTML, CSS and JavaScript, plus server-rendered apps in PHP and Laravel.',
  },
  {
    icon: 'mobile',
    title: 'Mobile Development',
    text: 'Cross-platform apps with React Native and Expo.',
  },
  {
    icon: 'api',
    title: 'Back-End & REST APIs',
    text: 'Node.js and Express.js services: authentication, business logic and API design.',
  },
  {
    icon: 'database',
    title: 'Databases',
    text: 'Relational data modeling and queries with PostgreSQL, SQL and Supabase.',
  },
];

const skills = [
  { category: 'Frontend', items: ['HTML', 'CSS', 'JavaScript'] },
  { category: 'Backend', items: ['Node.js', 'Express.js', 'REST API Development', 'PHP', 'Laravel'] },
  { category: 'Mobile', items: ['React Native', 'Expo'] },
  { category: 'Databases', items: ['PostgreSQL', 'SQL', 'Supabase'] },
  { category: 'Web Frameworks', items: ['Laravel', 'CodeIgniter'] },
  { category: 'Tools', items: ['Git', 'GitHub', 'Visual Studio Code', 'Antigravity'] },
];

const softSkills = ['Interpersonal Communication', 'Teamwork', 'Flexibility', 'Time Management', 'Adaptability'];

const projects = [
  {
    id: 'savr',
    number: '01',
    title: 'SAVR',
    subtitle: 'Food Donation Management System',
    context: 'Capstone project · CODEXA · for the Philippine FoodBank Foundation, Inc.',
    role: 'Back-End Developer',
    year: '2025 – Present',
    theme: 'light',
    image: '/images/projects/savr-icon.webp',
    imageAlt: 'SAVR app icon: a bowl with a fork and circular arrows',
    summary:
      'A mobile app that connects donors, partner kitchens, beneficiaries and Philippine FoodBank staff. It covers donations from pledge to pickup, and meal planning that recommends what to cook from the food currently in stock.',
    highlights: [
      'Role-based accounts for donors, organizations, partner kitchens and beneficiaries, with email verification and password reset',
      'Food, financial and service donations, including scheduled pickups, delivery tracking and request disbursement',
      'Meal optimization that matches inventory to recipes and ranks meals by servings and ingredient expiry to reduce waste',
      'Food inventory management, in-app and push notifications, and donor achievement badges',
    ],
    tech: ['React Native', 'Expo', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'REST API', 'JWT', 'Nodemailer'],
    links: {
      github: 'https://github.com/tianjose09/SavrMobileApp_Express',
      live: 'https://savrdonate.com/',
    },
  },
  {
    id: 'teddiursa',
    number: '02',
    title: 'Teddiursa Airlines',
    subtitle: 'Space Travel Booking Website',
    context: 'Application Development finals · team project (5 members)',
    role: 'Back-End Developer & Database Administrator',
    year: null,
    theme: 'dark',
    image: '/images/projects/teddiursa-hero.webp',
    imageAlt: 'Teddiursa Airlines hero banner showing a spaceship in a nebula',
    summary:
      'A fictional intergalactic airline website where users browse planetary destinations, sign up and book flights, and admins manage flight schedules and passengers from a dashboard.',
    highlights: [
      'User and admin authentication with login and sign-up',
      'Flight booking for users',
      'CRUD operations for flight schedules and passenger management',
      'Admin dashboard for managing flights and users, containerized with Docker',
    ],
    tech: ['PHP', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'PostgreSQL', 'MongoDB', 'Docker'],
    links: { github: 'https://github.com/tianjose09/AD-Finals-Project' },
  },
];

const experience = [
  {
    period: '2025 – Present',
    title: 'Back-End Developer',
    org: 'CODEXA · Capstone Team',
    description:
      'Building the back end of SAVR: A Food Donation Management System with Meal Planning Optimization for the Philippine FoodBank Foundation, Inc.',
    tags: ['Capstone', 'Back End'],
  },
  {
    period: '2026',
    title: 'Community Engagement: Feeding Program',
    org: 'Philippine FoodBank Foundation, Inc.',
    description: 'Volunteered in a feeding program with the Philippine FoodBank Foundation, Inc.',
    tags: ['Volunteer', 'Community'],
  },
  {
    period: '2022',
    title: 'Member',
    org: 'STEM Aiming for Integrated Learning & Leadership (SAIL) · NU Baliuag SHS',
    description: 'Member of the student organization SAIL at National University Baliuag Senior High School.',
    tags: ['Organization'],
  },
];

const education = [
  {
    school: 'FEU Institute of Technology',
    place: 'P. Paredes St., Sampaloc, Manila',
    level: 'College',
    degree: 'Bachelor of Science in Information Technology, specialization in Web and Mobile Application',
    period: 'Expected graduation: 2027',
  },
  {
    school: 'National University Baliuag',
    place: 'SM Baliuag Complex, Baliuag, Bulacan',
    level: 'Senior High School',
    degree: 'Senior High School',
    period: '2023',
  },
];

const credly = (id) => `https://www.credly.com/badges/${id}`;
const badgeImg = (path) => `https://images.credly.com/size/340x340/images/${path}`;

const certifications = [
  {
    name: 'Cisco Certified Support Technician (CCST) Networking',
    issuer: 'Cisco',
    date: 'February 10, 2025',
    year: '2025',
    url: credly('bd2cff12-1f34-43b3-ad17-1906551c0056'),
    image: badgeImg('57d88bab-75be-4400-a2fd-dbfa8e2b056e/image.png'),
  },
  {
    name: 'CCNA: Introduction to Networks',
    issuer: 'Cisco Networking Academy',
    date: 'February 7, 2025',
    year: '2025',
    url: credly('55b3aa62-2654-4411-8027-b228d515afff'),
    image: badgeImg('70d71df5-f3dc-4380-9b9d-f22513a70417/CCNAITN__1_.png'),
  },
  {
    name: 'IT Specialist: Python',
    issuer: 'Certiport, a Pearson VUE business',
    date: 'February 16, 2025',
    year: '2025',
    url: credly('22f874ee-c641-4afd-ab01-cb9e0de0c5ce'),
    image: badgeImg('3c4602d8-832e-4a24-b42d-00359ce746f7/ITS-Badges_Python_1200px.png'),
  },
  {
    name: 'CCNA: Switching, Routing, and Wireless Essentials',
    issuer: 'Cisco Networking Academy',
    date: 'March 20, 2025',
    year: '2025',
    url: credly('a78de158-ae76-48e2-9511-264233f4464d'),
    image: badgeImg('f4ccdba9-dd65-4349-baad-8f05df116443/CCNASRWE__1_.png'),
  },
  {
    name: 'Linux Essentials',
    issuer: 'Cisco Networking Academy',
    date: 'November 14, 2025',
    year: '2025',
    url: credly('2104a143-56a2-4323-a9c8-0190c2e25d12'),
    image: badgeImg('e8fe3d67-2967-43d0-bc4a-7a268a37f47b/image.png'),
  },
  {
    name: 'CCNA: Enterprise Networking, Security, and Automation',
    issuer: 'Cisco Networking Academy',
    date: 'December 16, 2025',
    year: '2025',
    url: credly('7142172a-f6b2-4c32-b13c-6862750e2431'),
    image: badgeImg('0a6d331e-8abf-4272-a949-33f754569a76/CCNAENSA__1_.png'),
  },
  {
    name: 'PMI Project Management Ready™',
    issuer: 'Project Management Institute',
    date: 'March 16, 2026',
    year: '2026',
    url: credly('0614fce7-2149-4830-9827-61aa441f1d9f'),
    image: badgeImg('650208e5-851e-45d3-9ee9-cea899428427/blob'),
  },
  {
    name: 'DevNet Associate',
    issuer: 'Cisco Networking Academy',
    date: '2026',
    year: '2026',
    url: 'https://www.netacad.com/certificates/?issuanceId=b0b83947-9733-4bf6-8b40-8e2381c44d65',
    verifyLabel: 'Verify on NetAcad',
    image: null,
  },
];

module.exports = { profile, focusAreas, skills, softSkills, projects, experience, education, certifications };
