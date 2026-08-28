/*
 * Centralized data for Anukalp Bajpai's Portfolio
 * ================================================
 * Update this file to change portfolio content.
 * The UI components read from this data — no need to modify component code.
 */

export const personalInfo = {
  name: 'Anukalp Bajpai',
  initials: 'AB',
  role: 'Full Stack Developer',
  specialization: 'MERN Stack',
  education: 'B.Tech CSE',
  university: 'Lovely Professional University',
  email: 'anukalpbajpai25@gmail.com',
  tagline: "I'm a B.Tech CSE student and Full Stack Developer passionate about building modern web applications, solving problems with code, and continuously improving my development skills.",
};

export const socialLinks = {
  github: 'https://github.com/AnukalpCreates',
  linkedin: 'https://www.linkedin.com/in/anukalp-bajpai-16b1a8372/',
  leetcode: 'https://leetcode.com/u/AnukalpCreates/',
  codolio: 'https://codolio.com/profile/anukalpcodes',
  geeksforgeeks: 'https://www.geeksforgeeks.org/profile/anukalpcodes',
};

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'DSA / CP', href: '#dsa' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export const skills = [
  {
    category: 'Frontend',
    items: [
      { name: 'HTML', icon: 'html' },
      { name: 'CSS', icon: 'css' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'React.js', icon: 'react', highlighted: true },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', icon: 'nodejs', highlighted: true },
      { name: 'Express.js', icon: 'express', highlighted: true },
    ],
  },
  {
    category: 'Database',
    items: [
      { name: 'MongoDB', icon: 'mongodb', highlighted: true },
    ],
  },
  {
    category: 'Programming',
    items: [
      { name: 'Python', icon: 'python' },
      { name: 'C++', icon: 'cpp' },
    ],
  },
  {
    category: 'Problem Solving',
    items: [
      { name: 'Data Structures & Algorithms', icon: 'dsa' },
      { name: 'Competitive Programming', icon: 'cp' },
    ],
  },
];

export const projects = [
  {
    id: 'amazon-clone',
    title: 'Amazon Website Clone',
    description: 'A front-end clone of the Amazon e-commerce website, replicating the UI layout, navigation, product listings, and responsive design using HTML and CSS.',
    technologies: ['HTML', 'CSS'],
    features: [
      'Amazon homepage layout recreation',
      'Navigation bar with search functionality UI',
      'Product grid and card layouts',
      'Footer section with multiple link columns',
      'Responsive design for different screen sizes',
    ],
    github: 'https://github.com/AnukalpCreates/Amazon-Clone',
    liveDemo: null,
    featured: true,
  },
  {
    id: 'rock-paper-scissors',
    title: 'Rock Paper Scissors Game',
    description: 'Rock Paper Scissors Game built using HTML, CSS, and JavaScript. Features interactive gameplay, random computer moves, real-time score tracking, and dynamic win/lose/draw messages.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    features: [
      'Interactive gameplay',
      'Random computer moves',
      'Real-time score tracking',
      'Dynamic win/lose/draw messages',
      'Responsive interface',
    ],
    github: 'https://github.com/AnukalpCreates/Rock-Paper-Scissors-Game',
    liveDemo: null,
    featured: false,
  },
  {
    id: 'python-calculator',
    title: 'Python Calculator',
    description: 'A simple calculator program built using Python, demonstrating fundamental programming concepts and arithmetic operations.',
    technologies: ['Python'],
    features: [
      'Basic arithmetic operations',
      'Clean command-line interface',
      'Input validation',
      'Fundamental Python concepts',
    ],
    github: 'https://github.com/AnukalpCreates/Calculator',
    liveDemo: null,
    featured: false,
  },
];

// NOTE: These values are used as fallback only. Live data is fetched
// from LeetCode + GFG APIs in src/services/codingStatsService.js
export const codingStats = {
  questionsSolved: 198,
  activeDays: 92,
  primaryLanguage: 'C++',
  focus: 'DSA + CP',
  username: '@anukalpcodes',
};

export const codingProfiles = [
  {
    platform: 'Codolio',
    username: '@anukalpcodes',
    url: 'https://codolio.com/profile/anukalpcodes',
    buttonText: 'View Codolio Profile',
    color: '#6366f1',
  },
  {
    platform: 'LeetCode',
    username: 'AnukalpCreates',
    url: 'https://leetcode.com/u/AnukalpCreates/',
    buttonText: 'View LeetCode Profile',
    color: '#f59e0b',
  },
  {
    platform: 'GeeksforGeeks',
    username: '@anukalpcodes',
    url: 'https://www.geeksforgeeks.org/profile/anukalpcodes',
    buttonText: 'View GeeksforGeeks Profile',
    color: '#22c55e',
  },
];

export const education = [
  {
    institution: 'Lovely Professional University',
    degree: 'B.Tech CSE',
    degreeFullForm: 'Bachelor of Technology — Computer Science & Engineering',
    startYear: '2025',
    endYear: '2029',
    cgpa: '8.0',
    focusAreas: [
      'Full Stack Development',
      'Data Structures & Algorithms',
      'Competitive Programming',
    ],
  },
];
