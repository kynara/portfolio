import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

type Phase = 'idle' | 'hover' | 'clicked';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('idle');
  const faceRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (phase === 'clicked') return;
    const face = faceRef.current;
    if (!face) return;
    const rect = face.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
    const threshold = Math.max(rect.width, rect.height) * 0.65;
    setPhase(dist < threshold ? 'hover' : 'idle');
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
    <div
      className={`landing landing--${phase}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="landing__circle" />

      <div
        ref={faceRef}
        className={`landing__face ${phase === 'clicked' ? 'landing__face--shrink' : ''}`}
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

