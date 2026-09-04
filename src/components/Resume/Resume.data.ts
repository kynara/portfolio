/**
 * Resume.data.ts — static content for the Resume page.
 * Edit here to update the résumé without touching layout or styles.
 */

export interface TimelineItem {
  type: 'work' | 'education' | 'award';
  date: string;
  title: string;
  subtitle: string; // Company / School / Org
  description?: string[];
}

export const timelineData: TimelineItem[] = [
  {
    type: 'education',
    date: 'August 2025',
    title: 'Master of Science: Cyber Security',
    subtitle: 'Iowa State University',
    description: [
      'Multidisciplinary graduate program administered through the Department of Electrical and Computer Engineering, covering software and hardware aspects of cybersecurity, cryptography, and information assurance.',
    ],
  },
  {
    type: 'work',
    date: 'April 2025 – Ongoing',
    title: 'Software Engineer',
    subtitle: "Casey's General Stores",
    description: [
      'Leading convenience store in the midwest, focused on reimagining customer digital experiences.',
      "Developing the Casey's mobile app with Flutter, Dart, and GraphQL and integrating the experience into the legacy native apps for a gradual and seamless transition.",
      'Implementing features such as dynamic store menus with food customizations and account management and versatile UI components such as quantity pickers, product cards, and location cards.',
      'Proactively identified gaps in ticket management practices and led an initiative to transition tickets from product-focused to engineering-specific, improving team clarity and efficiency.',
      'Researched and implemented accessibility features across the app, improving usability for users relying on assistive technologies.',
    ],
  },
  {
    type: 'work',
    date: 'September 2021 – July 2023',
    title: 'Software Engineer',
    subtitle: 'Dave, Inc.',
    description: [
      'FinTech mobile banking platform that helps users who live paycheck to paycheck.',
      'Developed frontend with React Native, TypeScript, and GraphQL as a member of the Banking team in an Agile environment.',
      'Collaborated with Product and Design for planning and implementation of features including instant withdrawal, credit building, recurring transfers, and push provisioning.',
      'Implemented round up savings feature resulting in 25% of users saving $0.5M in 2 months.',
      'Managed A/B testing on product features using Amplitude experiments and analytics.',
      'Created UI automation tests using Appium for banking features.',
      'Integrated APIs including Stripe and Level Credit to streamline card processing and credit building.',
      'Built reusable UI components for the internal library such as ordered/unordered lists, tooltips, and dropdown menus.',
    ],
  },
  {
    type: 'work',
    date: 'February 2021 - September 2021',
    title: 'Application Analyst',
    subtitle: 'Bayada Home Health Care',
    description: [
      'Providing home access to healthcare and connecting health care professionals to patients.',
      'Worked in the IT department resolving technology issues for health care professionals and office staff.',
      'Provided support for applications such as Workday, Greenhouse, Tableau, Outlook and various other in  house products.',
      'Prepared reports by querying databases in an SQL-like language.',
      'Promptly assisted workers through our help desk website, call line and email and kept Jira up to date on  issues and progress.'
    ]
  },
  {
    type: 'education',
    date: 'May 2020',
    title: 'Bachelor of Science: Software Engineering',
    subtitle: 'Iowa State University',
    description: [
      'ABET-accredited program jointly administered by the Departments of Computer Science and Electrical and Computer Engineering, with coursework spanning data structures and algorithms, software design and architecture, requirements analysis, software testing and verification, and database systems.',
      'Senior Design Project: Ground Control Station Software Lead, MicroCART (2019-2020) — updated and maintained a C++/QT user interface for a team-built quadcopter, adding features to enable path-following via the UI.',
      'Gained industry experience through a Software Engineer Internship at Workiva, Inc., and stayed active in engineering clubs and hackathons, including Critical Tinkers ISU (Vice President) and multiple hackathon competitions.',
    ],
  },
  {
    type: 'award',
    date: '2020',
    title: 'Vice President',
    subtitle: 'Critical Tinkers ISU',
    description: [
      'Critical Tinkers is an engineering club at Iowa State which explores and develops innovative projects.',
      'Coordinated and led meetings and hands-on workshops to develop engineering skills.',
      'Reached out to tech companies and coordinated presentations for the club.',
    ],
  },
  {
    type: 'work',
    date: 'May 2018 – May 2020',
    title: 'Software Engineer Intern',
    subtitle: 'Workiva, Inc.',
    description: [
      'SaaS company providing a cloud-based connected and reporting compliance platform.',
      'Developed frontend with React and Dart as a member of the XBRL Lifecycle team in an Agile environment.',
      'Led a collaborative project to build infrastructure and features to visualize data in an interactive panel which was successfully deployed to production.',
      'Performed code reviews, quality assurance, testing, and releasing of updated features of the XBRL codebase.',
      'Modernized legacy tools from older Flash-based implementations to newer React implementation.',
    ],
  },
  {
    type: 'award',
    date: '2018',
    title: '1st Place',
    subtitle: 'MinneHacks Hackathon',
  },
  {
    type: 'work',
    date: 'January 2017 – May 2018',
    title: 'Teaching Assistant & Peer Mentor',
    subtitle: 'Dept. of Computer Engineering',
    description: [
      'Supervised C programming labs using DualShock controllers; assisted students and supported the professor with teaching and grading.',
      'Mentored students on software and hardware projects enhancing their technical and problem-solving skills.',
      'Provided support, encouragement, and information to incoming freshmen. ',
    ],
  },
  {
    type: 'award',
    date: '2017',
    title: '5th Place & Leepfrog Award',
    subtitle: 'UIowa Hackathon',
  },
  {
    type: 'award',
    date: '',
    title: '',
    subtitle: '',
    description: [],
  },
];

