/**
 * Resume.data.ts — static content for the Resume page.
 * Edit here to update the résumé without touching layout or styles.
 */

export const skills = {
  languages:  ['TypeScript', 'JavaScript', 'Dart', 'Java', 'C', 'C++', 'CSS'],
  frameworks: ['Flutter', 'React Native', 'React', 'Redux', 'RTK', 'Git', 'GraphQL', 'SQL', 'Appium', 'Jest'],
} as const;

export interface TimelineItem {
  type: 'work' | 'education' | 'award';
  date: string;
  title: string;
  subtitle: string; // Company / School / Org
}

export const timelineData: TimelineItem[] = [
  {
    type: 'education',
    date: 'August 2025',
    title: 'Master of Science: Cyber Security',
    subtitle: 'Iowa State University',
  },
  {
    type: 'work',
    date: 'April 2025 – Ongoing',
    title: 'Software Engineer',
    subtitle: "Casey's General Stores",
  },
  {
    type: 'award',
    date: '2024',
    title: 'Grace Hopper Conference',
    subtitle: 'Attendee/Scholarship',
  },
  {
    type: 'award',
    date: '2024',
    title: 'Digital Women ISU',
    subtitle: 'Member',
  },
  {
    type: 'work',
    date: 'September 2021 – July 2023',
    title: 'Software Engineer',
    subtitle: 'Dave, Inc.',
  },
  {
    type: 'work',
    date: 'February 2021 - September 2021',
    title: 'Application Analyst',
    subtitle: 'Bayada Home Health Care',
  },
  {
    type: 'education',
    date: 'May 2020',
    title: 'Bachelor of Science: Software Engineering',
    subtitle: 'Iowa State University',
  },
  {
    type: 'award',
    date: '2020',
    title: 'Vice President',
    subtitle: 'Critical Tinkers ISU',
  },
  {
    type: 'work',
    date: 'May 2018 – May 2020',
    title: 'Software Engineer Intern',
    subtitle: 'Workiva, Inc.',
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
  },
];

