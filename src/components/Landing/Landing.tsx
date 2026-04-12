import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

type Phase = 'idle' | 'hover' | 'clicked';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('idle');
  const cursorRef = useRef<HTMLDivElement>(null);

  // Drive cursor position directly via DOM — no re-renders on every mousemove
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.left    = `${e.clientX}px`;
      cursorRef.current.style.top     = `${e.clientY}px`;
      cursorRef.current.style.opacity = '1';
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (phase !== 'clicked') setPhase('hover');
  }, [phase]);

  const handleMouseLeave = useCallback(() => {
    if (phase !== 'clicked') setPhase('idle');
  }, [phase]);

  const handleClick = useCallback(() => {
    if (phase !== 'hover') return;
    setPhase('clicked');
    setTimeout(() => navigate('/resume'), 1000);
  }, [phase, navigate]);

  const imgSrc =
    phase === 'clicked' ? '/images/post-eat-close-mouth.png'
    : phase === 'hover' ? '/images/open-mouth.png'
    :                     '/images/pre-eat-close-mouth.png';

  return (
    <div className={`landing landing--${phase}`}>
      {/* Background Text */}
      <div className="landing__bg-text" aria-hidden="true">
        <span className="landing__bg-text-line1">YOU ARE</span>
        <span className="landing__bg-text-line2">WHAT</span>
        <span className="landing__bg-text-line3">YOU EAT</span>
      </div>

      {/* Custom cursor — the "snack" about to be eaten */}
      <div
        ref={cursorRef}
        className={`landing__cursor landing__cursor--${phase}`}
      />

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
