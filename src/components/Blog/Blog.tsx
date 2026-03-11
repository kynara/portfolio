import React from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

const Blog: React.FC = () => (
  <div className="page page--blog">
    <div className="page__content">
      <h1 className="page__title">blog</h1>
      <p className="page__status">coming soon</p>
      <Link to="/home" className="page__back">back</Link>
    </div>
  </div>
);

export default Blog;
