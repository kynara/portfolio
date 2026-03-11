import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const navItems = [
  { to: '/blog', label: 'blog', color: '#ff6b9d' },
  { to: '/resume', label: 'résumé', color: '#06d6a0' },
];

const Home: React.FC = () => (
  <div className="home">
    <div className="home__content">
      <h1 className="home__name">hi, i'm kynara</h1>
      <p className="home__tagline">designer · developer · human</p>

      <nav className="home__nav">
        {navItems.map(({ to, label, color }) => (
          <Link
            key={to}
            to={to}
            className="home__card"
            style={{ '--card-color': color } as React.CSSProperties}
          >
            <span className="home__card-label">{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  </div>
);

export default Home;
