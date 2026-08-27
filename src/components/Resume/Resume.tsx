import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AwesomeBtn from '../AwesomeBtn/AwesomeBtn';
import { timelineData } from './Resume.data';
import { colors } from '../../tokens';
import './Resume.css';


const Resume: React.FC = () => {
  const navigate = useNavigate();
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = timelineRef.current;
    if (!node) return;

    // Throttle wheel events to prevent skipping items.
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();

      // If we are already handling a scroll step, ignore extra events.
      // This enforces a "one click, one slide" interaction.
      if (isScrolling) return;

      // Determine distinct direction.
      const delta = event.deltaY + event.deltaX;
      if (Math.abs(delta) < 10) return; // Ignore tiny movements (trackpad noise)

      const direction = delta > 0 ? 1 : -1;

      // Find current centered item
      const ITEMS_VISIBLE = 2; // Approximate logical "page" but we shift 1 by 1.
      
      const items = Array.from(node.querySelectorAll('.resume__timeline-item'));
      // Center of view is still useful as a reference point for "current focus".
      // But user wants to align 2 items. The CSS scroll-snap aligns the *left edge* of an item to a "start" offset.
      // So finding the item whose left edge is closest to that "start" offset is better.
      
      // Calculate the "snap point" in scroll coordinates.
      // Padding-left determines where the first item sits.
      // We want to find which item is currently "active" at the snap point.
      
      const containerPaddingLeft = parseFloat(getComputedStyle(node).paddingLeft) || 0;
      // The snap zone starts at containerRect.left + scroll-padding-left.
      // We want the item whose left edge is closest to that line.
      // Note: getComputedStyle(node).scrollPaddingLeft returns value like "400px"
      // If calc() is used, it returns computed px.
      const computedStyle = getComputedStyle(node);
      const scrollPaddingStr = computedStyle.scrollPaddingLeft;
      const scrollPadding = parseFloat(scrollPaddingStr) || containerPaddingLeft;
      
      let closestIndex = 0;
      let minDistance = Infinity;

      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const containerRect = node.getBoundingClientRect();
        const dist = Math.abs((rect.left - containerRect.left) - scrollPadding);
        
        if (dist < minDistance) {
          minDistance = dist;
          closestIndex = index;
        }
      });

      // Target the next or previous item
      const targetIndex = Math.min(
        items.length - 1,
        Math.max(0, closestIndex + direction)
      );

      if (targetIndex === closestIndex && minDistance < 10) { 
          return;
      }
      
      isScrolling = true;
      items[targetIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start', // Match CSS scroll-snap-align: start
      });

      // Unlock after animation (approximate duration)
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 600); // 600ms matches CSS transition/smooth scroll feel
    };

    node.addEventListener('wheel', onWheel, { passive: false });
    return () => {
        node.removeEventListener('wheel', onWheel);
        clearTimeout(scrollTimeout);
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
            {timelineData.map((item, index) => (
              <article 
                key={`${item.title}-${index}`} 
                className={`resume__timeline-item resume__timeline-item--${item.type}`}
              >
                <div className="resume__timeline-dot" aria-hidden />
                <div className="resume__timeline-meta">
                  <span className="resume__timeline-date">{item.date}</span>
                  <span className="resume__timeline-title">{item.title}</span>
                  <span className="resume__timeline-company">{item.subtitle}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </main>
  </div>
  );
};

export default Resume;
