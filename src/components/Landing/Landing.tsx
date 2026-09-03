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

const ROUTE_COLORS: Record<string, string> = {
  '/blog': '#130477',
  '/resume': '#fff3b0',
  '/contact': '#dd0426',
  default: '#5478ff',
};

const ICONS: IconData[] = [
  { id: 'writer', label: 'blog', path: '/blog', src: '/icons/donut.png' },
  { id: 'resume', label: 'resume', path: '/resume', src: '/icons/papers.webp' },
  { id: 'phone', label: 'contact me', path: '/contact', src: '/icons/fax.png' },
];

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('idle');
  const [dragGuidePath, setDragGuidePath] = useState<string | null>(null);
  const [circleColor, setCircleColor] = useState<string>(ROUTE_COLORS.default);
  const mouthRef = useRef<HTMLDivElement>(null);

  // Create refs for each icon statically since ICONS length is static
  const iconRefs = [
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
  ];

  const handleDropSuccess = useCallback((path: string) => {
    setPhase('clicked');
    setCircleColor(ROUTE_COLORS[path] ?? ROUTE_COLORS.default);
    setTimeout(() => navigate(path), 1000);
  }, [navigate]);

  const getMouthCenter = () => {
    if (!mouthRef.current) return null;
    const mouthRect = mouthRef.current.getBoundingClientRect();
    return {
      x: mouthRect.left + mouthRect.width / 2,
      y: mouthRect.top + mouthRect.height / 2,
    };
  };

  const buildGuidePath = (startX: number, startY: number, endX: number, endY: number) => {
    const dx = endX - startX;
    const dy = endY - startY;
    const distance = Math.hypot(dx, dy);
    const norm = distance === 0 ? 1 : distance;
    const perpX = -dy / norm;
    const perpY = dx / norm;
    const wobble = Math.min(100, Math.max(100, distance * 0.2));
    const c1x = startX + dx * 0.25 + perpX * wobble;
    const c1y = startY + dy * 0.25 + perpY * wobble;
    const c2x = startX + dx * 0.72 - perpX * wobble;
    const c2y = startY + dy * 0.72 - perpY * wobble;
    return `M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`;
  };

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
    const initialMouth = getMouthCenter();
    if (initialMouth) {
      setDragGuidePath(buildGuidePath(startX, startY, initialMouth.x, initialMouth.y));
    }

    const onMove = (moveEvent: PointerEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      if (imgRef.current) {
        imgRef.current.style.transform = `translate(${dx}px, ${dy}px) scale(1.1)`;
      }
      const mouthCenter = getMouthCenter();
      if (mouthCenter) {
        setDragGuidePath(
          buildGuidePath(moveEvent.clientX, moveEvent.clientY, mouthCenter.x, mouthCenter.y),
        );
      }
    };

    const onUp = (upEvent: PointerEvent) => {
      imgRef.current?.releasePointerCapture(e.pointerId);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      setDragGuidePath(null);

      if (imgRef.current && mouthRef.current) {
        const mouthRect = mouthRef.current.getBoundingClientRect();
        const dropX = upEvent.clientX;
        const dropY = upEvent.clientY;

        // Slightly enlarged drop zone for ease of use
        const isInside = dropX >= (mouthRect.left - 20) && dropX <= (mouthRect.right + 20) &&
                         dropY >= (mouthRect.top - 20) && dropY <= (mouthRect.bottom + 20);

        if (isInside) {
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
    <div
      className={`landing landing--${phase}`}
      style={{ ['--circle-color' as any]: circleColor }}
    >
      {/* Background Text */}
      <div className="landing__bg-text" aria-hidden="true">
        <span className="landing__bg-text-line1">YOU ARE</span>
        <span className="landing__bg-text-line2">WHAT</span>
        <span className="landing__bg-text-line3">YOU EAT</span>
      </div>

      <div className="landing__circle" />

      <div className="landing__face-wrap">
        <div className={`landing__face ${phase === 'clicked' ? 'landing__face--shrink' : ''}`}>
          <svg className="landing__head-arc-text" viewBox="0 -70 400 260" aria-hidden="true">
            <defs>
              <path id="landing-head-arc" d="M 40 170 A 160 160 0 0 1 360 170" />
            </defs>
            <text textAnchor="middle">
              <textPath href="#landing-head-arc" startOffset="50%">
                YOU ARE WHAT YOU EAT
              </textPath>
            </text>
          </svg>
          <img
            src={imgSrc}
            alt=""
            className="landing__face-img"
            draggable={false}
          />
          <div className="landing__mouth-target" ref={mouthRef} />
        </div>
      </div>

      {dragGuidePath && (
        <svg className="landing__drag-guide" aria-hidden="true">
          <defs>
            {/*<marker*/}
            {/*  id="landing-drag-arrowhead"*/}
            {/*  markerWidth="8"*/}
            {/*  markerHeight="8"*/}
            {/*  refX="7"*/}
            {/*  refY="3.5"*/}
            {/*  orient="auto"*/}
            {/*>*/}
            {/*  <path d="M0,0 L8,3.5 L0,7 z" fill="var(--yellow)" />*/}
            {/*</marker>*/}
          </defs>
          <path d={dragGuidePath} className="landing__drag-guide-path" markerEnd="url(#landing-drag-arrowhead)" />
        </svg>
      )}

      <div className="landing__plate" aria-label="Navigation menu">
        <img src="/images/white-plate.png" alt="" className="landing__plate-bg" />
        <svg className="landing__plate-text" viewBox="0 0 420 420" aria-hidden="true">
          <defs>
            <path id="landing-plate-arc-desktop" d="M 210 24 A 186 186 0 0 0 210 396" />
            {/* True rim-radius circle (same center/radius family as the desktop
                arc) so the text actually rides the plate's rim, not an
                invented flat curve. Centered on the pole via startOffset 50%
                + text-anchor middle since only the top of the plate is visible. */}
            <path id="landing-plate-arc-mobile" d="M 24 210 A 186 186 0 0 1 396 210" />
          </defs>
          <text className="landing__plate-text-desktop">
            <textPath href="#landing-plate-arc-desktop" startOffset="4%" {...{ side: 'left' }}>
              FEED ME TO NAVIGATE •
            </textPath>
          </text>
          <text className="landing__plate-text-mobile">
            <textPath href="#landing-plate-arc-mobile" startOffset="50%" textAnchor="middle">
              FEED ME TO NAVIGATE •
            </textPath>
          </text>
        </svg>
      </div>

      {/* Sibling of .landing__plate, not a child: .landing__plate needs its own
          transform (for the half-plate slide-in) which forces a stacking
          context, trapping any z-index set on children inside it. Pulling the
          icons out to the top level lets them stack independently — above the
          face while idle/hover (dragging shows the icon in front of her),
          below her once navigation starts — while the plate graphic itself
          stays pinned as pure background (see .landing__plate's z-index). */}
      <div className="landing__plate-items" aria-label="Navigation menu">
        {ICONS.map((icon, index) => {
          const imgRef = iconRefs[index];
          const variantClass = index === 0 ? 'landing__icon-wrapper--first'
                            : index === 1 ? 'landing__icon-wrapper--middle'
                            : 'landing__icon-wrapper--third';

          return (
            <div key={icon.id} className={`landing__icon-wrapper ${variantClass}`}>
              <img
                ref={imgRef}
                src={icon.src}
                alt={icon.label}
                className={`landing__icon-img landing__icon-img--${icon.id}`}
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
