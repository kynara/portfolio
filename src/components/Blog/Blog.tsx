import React from 'react';
import { useNavigate } from 'react-router-dom';
import AwesomeBtn from '../AwesomeBtn/AwesomeBtn';
import './Blog.css';

const Blog: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="page page--blog">
      <div className="page__content">
        <h1 className="page__title">blog</h1>
        <p className="page__status">coming soon</p>
        <AwesomeBtn
          color="#5478ff"
          dark="#2006c6"
          size="small"
          onPress={() => navigate('/home')}
        >
          back
        </AwesomeBtn>
      </div>
    </div>
  );
};

export default Blog;
