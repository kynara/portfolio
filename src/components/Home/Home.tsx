import React from 'react';
import { useNavigate } from 'react-router-dom';
import AwesomeBtn from '../AwesomeBtn/AwesomeBtn';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="home__content">
        <h1 className="home__name">Hi, I'm Kynara</h1>
        {/*<p className="home__tagline">designer · developer · human</p>*/}

        <nav className="home__nav">
          <AwesomeBtn
            color="#f02d3a"
            dark="#dd0426"
            onPress={() => navigate('/blog')}
          >
            blog
          </AwesomeBtn>
          <AwesomeBtn
            color="#ffe45c"
            dark="#c9b030"
            textColor="#06060e"
            onPress={() => navigate('/resume')}
          >
            résumé
          </AwesomeBtn>
        </nav>
      </div>
    </div>
  );
};

export default Home;
