/**
 * Verified Projects Data
 */
const PROJECTS_DATA = [
  {
    id: 'amazon-clone',
    title: 'Amazon Website Clone',
    description:
      'A front-end clone of the Amazon e-commerce website, replicating the UI layout, navigation, product listings, and responsive design using HTML and CSS.',
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
    description:
      'Rock Paper Scissors Game built using HTML, CSS, and JavaScript. Features interactive gameplay, random computer moves, real-time score tracking, and dynamic win/lose/draw messages.',
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
    description:
      'A simple calculator program built using Python, demonstrating fundamental programming concepts and arithmetic operations.',
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

/**
 * @desc   Get All Projects
 * @route  GET /api/projects
 * @access Public
 */
export const getProjects = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      count: PROJECTS_DATA.length,
      data: PROJECTS_DATA,
    });
  } catch (error) {
    next(error);
  }
};
