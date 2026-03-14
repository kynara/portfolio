import React from 'react';
import { useNavigate } from 'react-router-dom';
import AwesomeBtn from '../AwesomeBtn/AwesomeBtn';
import { skills, experience, education, involvement } from './Resume.data';
import { colors } from '../../tokens';
import './Resume.css';


const Resume: React.FC = () => {
  const navigate = useNavigate();
  return (
  <div className="resume">

    <AwesomeBtn
      color={colors.blue}
      dark={colors.blueDark}
      size="small"
      onPress={() => navigate('/home')}
    >
      back
    </AwesomeBtn>

    <main className="resume__main">

      {/* ── Header ── */}
      <header className="resume__header" style={{ '--i': 0 } as React.CSSProperties}>
        <h1 className="resume__name">KYNARA ALEXA FERNANDES</h1>
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
