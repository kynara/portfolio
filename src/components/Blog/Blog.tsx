import React from 'react';
import { useNavigate } from 'react-router-dom';
import AwesomeBtn from '../AwesomeBtn/AwesomeBtn';
import { colors } from '../../tokens';
import './Blog.css';

const Blog: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="page page--blog">
      <div className="page__content">
        <h1 className="page__title">blog</h1>
        <p className="page__status">coming soon</p>
        <AwesomeBtn
          color={colors.blue}
          dark={colors.blueDark}
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
