import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AwesomeBtn from '../AwesomeBtn/AwesomeBtn';
import { timelineData } from './Resume.data';
import { colors } from '../../tokens';
import './Resume.css';

const Resume: React.FC = () => {
  const navigate = useNavigate();
  const timelineRef = useRef<HTMLDivElement>(null);
  const dragMovedRef = useRef(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const target = timelineRef.current?.querySelectorAll<HTMLElement>('.resume__timeline-item')[index];
    if (!target) return;
    setSelectedIndex(index);
    target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  };

  useEffect(() => {
    const node = timelineRef.current;
    if (!node) return;

    const dragSurface = node.closest('.resume') as HTMLElement | null;
    if (!dragSurface) return;

    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;
    let scrollRaf = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartScrollLeft = 0;
    let dragStartedOnItem = false;
    const dragThreshold = 8;

    const getItems = () => Array.from(node.querySelectorAll<HTMLElement>('.resume__timeline-item'));

    const getClosestIndexToSnapLine = () => {
      const items = getItems();
      if (!items.length) return 0;

      const containerRect = node.getBoundingClientRect();
      const computedStyle = getComputedStyle(node);
      const scrollPadding = parseFloat(computedStyle.scrollPaddingLeft) || 0;

      let closestIndex = 0;
      let minDistance = Number.POSITIVE_INFINITY;

      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const dist = Math.abs((rect.left - containerRect.left) - scrollPadding);
        if (dist < minDistance) {
          minDistance = dist;
          closestIndex = index;
        }
      });

      return closestIndex;
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (isScrolling || isDragging) return;

      const delta = event.deltaY + event.deltaX;
      if (Math.abs(delta) < 10) return;

      const direction = delta > 0 ? 1 : -1;
      const items = getItems();
      const closestIndex = getClosestIndexToSnapLine();
      const targetIndex = Math.min(items.length - 1, Math.max(0, closestIndex + direction));

      if (targetIndex === closestIndex) return;

      setSelectedIndex(targetIndex);
      isScrolling = true;
      items[targetIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 600);
    };

    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = window.requestAnimationFrame(() => {
        scrollRaf = 0;
        setSelectedIndex((prev) => {
          const closest = getClosestIndexToSnapLine();
          return prev === closest ? prev : closest;
        });
      });
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('button, a, .resume__back-button')) return;

      const item = target?.closest('.resume__timeline-item');
      if (item) {
        dragStartedOnItem = true;
        dragMovedRef.current = false;
        return;
      }

      dragStartedOnItem = false;
      dragMovedRef.current = false;
      isDragging = true;
      dragStartX = event.clientX;
      dragStartScrollLeft = node.scrollLeft;
      dragSurface.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!isDragging) return;
      const dx = event.clientX - dragStartX;
      if (Math.abs(dx) > dragThreshold) {
        dragMovedRef.current = true;
      }
      node.scrollLeft = dragStartScrollLeft - dx;
    };

    const onPointerUp = (event: PointerEvent) => {
      if (dragStartedOnItem) {
        dragStartedOnItem = false;
        return;
      }

      if (!isDragging) return;
      isDragging = false;
      dragSurface.releasePointerCapture(event.pointerId);

      window.setTimeout(() => {
        dragMovedRef.current = false;
      }, 0);
    };

    node.addEventListener('wheel', onWheel, { passive: false });
    node.addEventListener('scroll', onScroll, { passive: true });
    dragSurface.addEventListener('pointerdown', onPointerDown);
    dragSurface.addEventListener('pointermove', onPointerMove);
    dragSurface.addEventListener('pointerup', onPointerUp);
    dragSurface.addEventListener('pointerleave', onPointerUp);

    return () => {
      node.removeEventListener('wheel', onWheel);
      node.removeEventListener('scroll', onScroll);
      dragSurface.removeEventListener('pointerdown', onPointerDown);
      dragSurface.removeEventListener('pointermove', onPointerMove);
      dragSurface.removeEventListener('pointerup', onPointerUp);
      dragSurface.removeEventListener('pointerleave', onPointerUp);
      clearTimeout(scrollTimeout);
      if (scrollRaf) window.cancelAnimationFrame(scrollRaf);
    };
  }, []);

  return (
    <div className="resume">
      <div className="resume__back-button">
        <AwesomeBtn
          color={colors.blue}
          dark={colors.blueDark}
          fontFamily="'Bayon', sans-serif"
          minWidth="104px"
          size="small"
          onPress={() => navigate('/')}
        >
          Back
        </AwesomeBtn>
      </div>

      <main className="resume__main">
        <section className="resume__section" style={{ '--i': 0 } as React.CSSProperties}>
          <div className="resume__timeline" ref={timelineRef}>
            <div className="resume__timeline-track">
              {timelineData.map((item, index) => {
                const descriptionPlacement = item.type === 'work' ? 'below' : 'above';
                const showDescription = index === selectedIndex && item.description && item.description.length > 0;

                return (
                  <article
                    key={`${item.title}-${index}`}
                    className={`resume__timeline-item resume__timeline-item--${item.type} ${index === selectedIndex ? 'resume__timeline-item--selected' : ''}`}
                    onClick={() => {
                      if (dragMovedRef.current) {
                        dragMovedRef.current = false;
                        return;
                      }
                      selectItem(index);
                    }}
                    aria-current={index === selectedIndex ? 'true' : undefined}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                     if (event.key === 'Enter' || event.key === ' ') {
                       event.preventDefault();
                       selectItem(index);
                     }
                    }}
                  >
                    {index === selectedIndex ? (
                      <svg className="resume__timeline-star" viewBox="0 0 100 100" aria-hidden="true">
                        <path
                          d="M50 6 L62 35 L94 40 L71 63 L78 94 L50 78 L22 94 L29 63 L6 40 L38 35 Z"
                          fill="var(--accent, var(--blue))"
                          stroke="var(--accent, var(--blue))"
                          strokeWidth="4"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <div className="resume__timeline-dot" aria-hidden />
                    )}
                    <div className="resume__timeline-meta">
                      <span className="resume__timeline-company">{item.subtitle}</span>
                      <span className="resume__timeline-title">{item.title}</span>
                      <span className="resume__timeline-date">{item.date}</span>
                    </div>
                    {showDescription && (
                      <ul className={`resume__timeline-description resume__timeline-description--${descriptionPlacement}`}>
                        {item.description!.map((entry, descriptionIndex) => (
                          <li key={`${item.title}-${descriptionIndex}`}>{entry}</li>
                        ))}
                      </ul>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Resume;
