import React from 'react';
import { useNavigate } from 'react-router-dom';
import AwesomeBtn from '../AwesomeBtn/AwesomeBtn';
import { colors } from '../../tokens';
import './Blog.css';

const Blog: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="page page--blog">
      <div className="blog__card">
        <div className="blog__punch" aria-hidden="true" />
        <img
          src="/icons/fork-pin.png"
          alt=""
          className="blog__pin"
          draggable={false}
        />
        <p className="blog__eyebrow">From the kitchen</p>
        <h1 className="blog__title">Blog</h1>
        <p className="blog__status">coming soon</p>
        <p className="blog__teaser">
           Stick around to see all my fun kitchen experiments!
        </p>
        <AwesomeBtn
          color={colors.red}
          dark={colors.redDark}
          fontFamily="'Bayon', sans-serif"
          minWidth="104px"
          size="small"
          onPress={() => navigate('/')}
        >
          Back
        </AwesomeBtn>
      </div>
    </div>
  );
};

export default Blog;
