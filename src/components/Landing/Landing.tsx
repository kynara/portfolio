import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

type Phase = 'idle' | 'hover' | 'clicked';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('idle');

  const handleMouseEnter = useCallback(() => {
    if (phase !== 'clicked') setPhase('hover');
  }, [phase]);

  const handleMouseLeave = useCallback(() => {
    if (phase !== 'clicked') setPhase('idle');
  }, [phase]);

  const handleClick = useCallback(() => {
    if (phase !== 'hover') return;
    setPhase('clicked');
    setTimeout(() => navigate('/home'), 1600);
  }, [phase, navigate]);

  const imgSrc =
    phase === 'clicked' ? '/images/post-eat-close-mouth.png'
    : phase === 'hover' ? '/images/open-mouth.png'
    :                     '/images/pre-eat-close-mouth.png';

  return (
    <div className={`landing landing--${phase}`}>
      <div className="landing__circle" />

      <div
        className={`landing__face ${phase === 'clicked' ? 'landing__face--shrink' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={imgSrc}
          alt=""
          className="landing__face-img"
          draggable={false}
        />
        {phase === 'hover' && (
          <button
            className="landing__mouth-target"
            onClick={handleClick}
            aria-label="Click here"
          />
        )}
      </div>
    </div>
  );
};

export default Landing;

