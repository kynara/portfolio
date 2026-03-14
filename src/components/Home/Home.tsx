import React from 'react';
import { useNavigate } from 'react-router-dom';
import AwesomeBtn from '../AwesomeBtn/AwesomeBtn';
import { colors } from '../../tokens';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="home__content">
        <h1 className="home__name">Hi, I'm Kynara</h1>

        <nav className="home__nav">
          <AwesomeBtn
            color={colors.red}
            dark={colors.redDark}
            onPress={() => navigate('/blog')}
          >
            blog
          </AwesomeBtn>
          <AwesomeBtn
            color={colors.yellow}
            dark={colors.yellowDim}
            textColor={colors.textDark}
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
