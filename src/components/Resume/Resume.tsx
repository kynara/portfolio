import React from 'react';
import { useNavigate } from 'react-router-dom';
import AwesomeBtn from '../AwesomeBtn/AwesomeBtn';
import './Resume.css';

const skills = {
  languages:  ['TypeScript', 'JavaScript', 'Dart', 'Java', 'C', 'C++', 'CSS'],
  frameworks: ['Flutter', 'React Native', 'React', 'Redux', 'RTK', 'Git', 'GraphQL', 'SQL', 'Appium', 'Jest'],
};

const experience = [
  {
    title:   'Software Engineer',
    company: "Casey's General Stores",
    date:    'April 2025 – Ongoing',
    bullets: [
      'Developing the Casey\'s mobile app with Flutter, Dart and GraphQL, integrating into legacy native apps for a gradual and seamless transition.',
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

const education = [
  { degree: 'Master of Science: Cyber Security', school: 'Iowa State University', date: 'August 2025' },
  { degree: 'Bachelor of Science: Software Engineering', school: 'Iowa State University', date: 'May 2020' },
];

const involvement = [
  'Grace Hopper Conference (2024)',
  'Digital Women ISU (2024)',
  'Vice President — Critical Tinkers ISU (2020)',
  '1st Place — MinneHacks Hackathon (2018)',
  '5th Place & Leepfrog Award — UIowa Hackathon (2017)',
];

const Resume: React.FC = () => {
  const navigate = useNavigate();
  return (
  <div className="resume">

    <AwesomeBtn
      color="#5478ff"
      dark="#2006c6"
      size="small"
      onPress={() => navigate('/home')}
    >
      back
    </AwesomeBtn>

    <main className="resume__main">

      {/* ── Header ── */}
      <header className="resume__header" style={{ '--i': 0 } as React.CSSProperties}>
        <h1 className="resume__name">Kynara Alexa Fernandes</h1>
        <p className="resume__contact">
          kynarafernandes@gmail.com
        </p>
      </header>

      {/* ── Skills ── */}
      <section className="resume__section" style={{ '--i': 1 } as React.CSSProperties}>
        <h2 className="resume__section-title">Skills</h2>
        <div className="resume__skills">
          <div className="resume__skill-row">
            <span className="resume__skill-label">Languages</span>
            <div className="resume__pills">
              {skills.languages.map(s => <span key={s} className="resume__pill">{s}</span>)}
            </div>
          </div>
          <div className="resume__skill-row">
            <span className="resume__skill-label">Frameworks</span>
            <div className="resume__pills">
              {skills.frameworks.map(s => <span key={s} className="resume__pill">{s}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section className="resume__section" style={{ '--i': 2 } as React.CSSProperties}>
        <h2 className="resume__section-title">Experience</h2>
        <div className="resume__jobs">
          {experience.map(job => (
            <article key={job.company} className="resume__job">
              <div className="resume__job-header">
                <div className="resume__job-meta">
                  <span className="resume__job-title">{job.title}</span>
                  <span className="resume__job-company">{job.company}</span>
                </div>
                <span className="resume__job-date">{job.date}</span>
              </div>
              <ul className="resume__bullets">
                {job.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ── Education ── */}
      <section className="resume__section" style={{ '--i': 3 } as React.CSSProperties}>
        <h2 className="resume__section-title">Education</h2>
        <div className="resume__edu">
          {education.map(e => (
            <div key={e.degree} className="resume__edu-row">
              <div className="resume__edu-meta">
                <span className="resume__edu-degree">{e.degree}</span>
                <span className="resume__edu-school">{e.school}</span>
              </div>
              <span className="resume__edu-date">{e.date}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Involvement ── */}
      <section className="resume__section" style={{ '--i': 4 } as React.CSSProperties}>
        <h2 className="resume__section-title">Involvement & Awards</h2>
        <ul className="resume__involvement">
          {involvement.map(item => <li key={item}>{item}</li>)}
        </ul>
      </section>

    </main>
  </div>
  );
};

export default Resume;
