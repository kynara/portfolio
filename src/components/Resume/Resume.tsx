import React from 'react';
import { Link } from 'react-router-dom';
import '../Blog/Blog.css';
import './Resume.css';

const Resume: React.FC = () => (
  <div className="page page--resume">
    <div className="page__content">
      <h1 className="page__title page__title--resume">résumé</h1>
      <p className="page__status">coming soon</p>
      <Link to="/home" className="page__back">back</Link>
    </div>
  </div>
);

export default Resume;
