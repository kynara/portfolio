/**
 * Resume.data.ts — static content for the Resume page.
 * Edit here to update the résumé without touching layout or styles.
 */

export const skills = {
  languages:  ['TypeScript', 'JavaScript', 'Dart', 'Java', 'C', 'C++', 'CSS'],
  frameworks: ['Flutter', 'React Native', 'React', 'Redux', 'RTK', 'Git', 'GraphQL', 'SQL', 'Appium', 'Jest'],
} as const;

export interface Job {
  title:   string;
  company: string;
  date:    string;
  bullets: string[];
}

export const experience: Job[] = [
  {
    title:   'Software Engineer',
    company: "Casey's General Stores",
    date:    'April 2025 – Ongoing',
    bullets: [
      "Developing the Casey's mobile app with Flutter, Dart and GraphQL, integrating into legacy native apps for a gradual and seamless transition.",
      'Implementing features including dynamic store menus with food customizations, account management, and UI components such as quantity pickers, product cards and location cards.',
      'Led initiative to transition tickets from product-focused to engineering-specific, improving team clarity and efficiency.',
      'Designed standardized pull request templates, enhancing consistency and quality in code reviews.',
      'Maintaining 90% code coverage across project packages.',
      'Collaborating with Product, Design, and Backend teams to clarify requirements and refine development tasks.',
    ],
  },
  {
    title:   'Software Engineer',
    company: 'Dave, Inc.',
    date:    'September 2021 – July 2023',
    bullets: [
      'Developed frontend with React Native, TypeScript and GraphQL on the Banking team in an Agile environment.',
      'Collaborated with Product and Design on features including instant withdrawal, credit building, recurring transfers, and push provisioning.',
      'Implemented round-up savings feature resulting in 25% of users saving $0.5M in 2 months.',
      'Managed A/B testing on product features using Amplitude experiments and analytics.',
      'Created UI automation tests using Appium for banking features.',
      'Integrated Stripe and Level Credit APIs to streamline card processing and credit building.',
      'Built reusable UI components for the internal library: ordered/unordered lists, tooltips, dropdown menus.',
    ],
  },
  {
    title:   'Software Engineer Intern',
    company: 'Workiva, Inc.',
    date:    'May 2018 – May 2020',
    bullets: [
      'Developed frontend with React and Dart on the XBRL Lifecycle team in an Agile environment.',
      'Led a collaborative project to build infrastructure and features to visualize data in an interactive panel — successfully deployed to production.',
      'Performed code reviews, QA, testing and releasing of updated XBRL features.',
      'Modernized legacy tools from Flash-based implementations to React.',
    ],
  },
  {
    title:   'Teaching Assistant & Peer Mentor',
    company: 'Department of Computer Engineering',
    date:    'January 2017 – May 2018',
    bullets: [
      'Supervised C programming labs using DualShock controllers; assisted students and supported the professor with teaching and grading.',
      'Mentored students on software and hardware projects, enhancing their technical and problem-solving skills.',
    ],
  },
];

export interface Degree {
  degree: string;
  school: string;
  date:   string;
}

export const education: Degree[] = [
  { degree: 'Master of Science: Cyber Security',    school: 'Iowa State University', date: 'August 2025' },
  { degree: 'Bachelor of Science: Software Engineering', school: 'Iowa State University', date: 'May 2020' },
];

export const involvement: string[] = [
  'Grace Hopper Conference (2024)',
  'Digital Women ISU (2024)',
  'Vice President — Critical Tinkers ISU (2020)',
  '1st Place — MinneHacks Hackathon (2018)',
  '5th Place & Leepfrog Award — UIowa Hackathon (2017)',
];

