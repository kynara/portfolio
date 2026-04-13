import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

type Phase = 'idle' | 'hover' | 'clicked';

interface IconData {
  id: string;
  label: string;
  path: string;
  src: string;
}

const ICONS: IconData[] = [
  { id: 'writer', label: 'blog', path: '/blog', src: '/icons/writer.png' },
  { id: 'resume', label: 'resume', path: '/resume', src: '/icons/resume.png' },
  { id: 'phone', label: 'contact me', path: '/contact', src: '/icons/phone.png' },
];

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('idle');
  const mouthRef = useRef<HTMLDivElement>(null);

  // Create refs for each icon statically since ICONS length is static
  const iconRefs = [
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
  ];

  const handleDropSuccess = useCallback((path: string) => {
    setPhase('clicked');
    setTimeout(() => navigate(path), 1000);
  }, [navigate]);

  const imgSrc =
    phase === 'clicked' ? '/images/post-eat-close-mouth.png'
    : phase === 'hover' ? '/images/open-mouth.png'
    :                     '/images/pre-eat-close-mouth.png';

  const startDrag = (e: React.PointerEvent, icon: IconData, imgRef: React.RefObject<HTMLImageElement>) => {
    e.preventDefault();
    if (!imgRef.current || phase === 'clicked') return;

    setPhase('hover');
    imgRef.current.style.transition = 'none';
    imgRef.current.style.zIndex = '100';
    imgRef.current.setPointerCapture(e.pointerId);

    const startX = e.clientX;
    const startY = e.clientY;

    const onMove = (moveEvent: PointerEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      if (imgRef.current) {
        imgRef.current.style.transform = `translate(${dx}px, ${dy}px) scale(1.1)`;
      }
    };

    const onUp = (upEvent: PointerEvent) => {
      imgRef.current?.releasePointerCapture(e.pointerId);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);

      let dropped = false;
      if (imgRef.current && mouthRef.current) {
        const mouthRect = mouthRef.current.getBoundingClientRect();
        const dropX = upEvent.clientX;
        const dropY = upEvent.clientY;

        // Slightly enlarged drop zone for ease of use
        const isInside = dropX >= (mouthRect.left - 20) && dropX <= (mouthRect.right + 20) &&
                         dropY >= (mouthRect.top - 20) && dropY <= (mouthRect.bottom + 20);

        if (isInside) {
          dropped = true;
          handleDropSuccess(icon.path);
          imgRef.current.style.transition = 'transform 0.4s ease, opacity 0.2s ease';
          imgRef.current.style.opacity = '0';
          imgRef.current.style.transform = `translate(${upEvent.clientX - startX}px, ${upEvent.clientY - startY}px) scale(0)`;
        } else {
          setPhase('idle');
          imgRef.current.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
          imgRef.current.style.transform = `translate(0px, 0px) scale(1)`;
          imgRef.current.style.zIndex = '10';
        }
      }
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  return (
    <div className={`landing landing--${phase}`}>
      {/* Background Text */}
      <div className="landing__bg-text" aria-hidden="true">
        <span className="landing__bg-text-line1">YOU ARE</span>
        <span className="landing__bg-text-line2">WHAT</span>
        <span className="landing__bg-text-line3">YOU EAT</span>
      </div>

      <div className="landing__circle" />

      <div className={`landing__face ${phase === 'clicked' ? 'landing__face--shrink' : ''}`}>
        <img
          src={imgSrc}
          alt=""
          className="landing__face-img"
          draggable={false}
        />
        <div className="landing__mouth-target" ref={mouthRef} />
      </div>

      <div className="landing__icons-container">
        {ICONS.map((icon, index) => {
          const imgRef = iconRefs[index];
          return (
            <div key={icon.id} className="landing__icon-wrapper">
              <img
                ref={imgRef}
                src={icon.src}
                alt={icon.label}
                className="landing__icon-img"
                onPointerDown={(e) => startDrag(e, icon, imgRef)}
                draggable={false}
              />
              <span className="landing__icon-label">{icon.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Landing;
