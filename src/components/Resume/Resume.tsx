import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AwesomeBtn from '../AwesomeBtn/AwesomeBtn';
import { timelineData } from './Resume.data';
import { colors } from '../../tokens';
import './Resume.css';

const isPlaceholderItem = (item: { title: string; subtitle: string; date: string }) =>
  item.title.trim() === '' && item.subtitle.trim() === '' && item.date.trim() === '';

const isIowaStateItem = (item: { title: string; subtitle: string }) =>
  /\biowa state\b/i.test(item.subtitle) ||
  /teaching assistant/i.test(item.title);

const isCaseysItem = (item: { subtitle: string }) => /casey/i.test(item.subtitle);
const isDaveItem = (item: { subtitle: string }) => /\bdave\b/i.test(item.subtitle);
const isBayadaItem = (item: { subtitle: string }) => /bayada/i.test(item.subtitle);
const isWorkivaItem = (item: { subtitle: string }) => /workiva/i.test(item.subtitle);
const isCriticalTinkersItem = (item: { subtitle: string }) => /critical tinkers/i.test(item.subtitle);

const Resume: React.FC = () => {
  const navigate = useNavigate();
  const timelineRef = useRef<HTMLDivElement>(null);
  const dragMovedRef = useRef(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const lastSelectableIndex = timelineData.reduce(
    (lastIndex, item, index) => (isPlaceholderItem(item) ? lastIndex : index),
    0,
  );
  const clampSelectableIndex = useCallback(
    (index: number) => Math.max(0, Math.min(lastSelectableIndex, index)),
    [lastSelectableIndex],
  );

  const selectItem = (index: number) => {
    const targetIndex = clampSelectableIndex(index);
    const target = timelineRef.current?.querySelectorAll<HTMLElement>('.resume__timeline-item')[targetIndex];
    if (!target) return;
    setSelectedIndex(targetIndex);
    target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  };

  useEffect(() => {
    const node = timelineRef.current;
    if (!node) return;

    const dragSurface = node.closest('.resume') as HTMLElement | null;
    if (!dragSurface) return;

    let scrollRaf = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartScrollLeft = 0;
    let dragStartedOnItem = false;
    let wheelSettleTimeout: NodeJS.Timeout;
    const dragThreshold = 8;
    const settleDelay = 140;

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

    // Smoothly finish on whichever item is closest to the snap line. Used
    // after both wheel and drag gestures, since scroll-snap-type was removed
    // from the CSS (see Resume.css) — it was forcing an instant snap-back on
    // every programmatic scrollLeft write, fighting the drag/wheel handlers
    // that write to it continuously. Settling is handled here instead, only
    // once the gesture actually ends.
    const settleToClosest = () => {
      const closest = clampSelectableIndex(getClosestIndexToSnapLine());
      setSelectedIndex(closest);
      getItems()[closest]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    };

    // Vertical wheel input drives horizontal scroll 1:1, continuously — a plain
    // mouse wheel only ever reports deltaY, so without this a wheel over the
    // timeline would do nothing. Previously this forced exactly one card-step
    // per gesture with a 600ms input lockout after each step (real scroll-jacking:
    // a normal continuous trackpad scroll got swallowed into a single hop, then
    // went dead for the rest of the gesture, with nothing else visibly changing).
    // Now the raw delta is translated continuously — the user stays in control
    // of position for the whole gesture — and it settles on the nearest item
    // once the wheel goes quiet. Bound to the whole page (dragSurface), not just
    // the timeline strip, so scrolling anywhere — including over the description
    // below it — moves through the entries; this page has no conventional
    // vertical scroll of its own for wheel input to fall back to.
    const onWheel = (event: WheelEvent) => {
      if (isDragging) return;
      event.preventDefault();
      node.scrollLeft += event.deltaY + event.deltaX;
      clearTimeout(wheelSettleTimeout);
      wheelSettleTimeout = setTimeout(settleToClosest, settleDelay);
    };

    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = window.requestAnimationFrame(() => {
        scrollRaf = 0;
        setSelectedIndex((prev) => {
          const closest = clampSelectableIndex(getClosestIndexToSnapLine());
          return prev === closest ? prev : closest;
        });
      });
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('button, a, .resume__back-button')) return;

      const item = target?.closest('.resume__timeline-item');
      if (item && !item.classList.contains('resume__timeline-item--placeholder')) {
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
      if (dragMovedRef.current) settleToClosest();

      window.setTimeout(() => {
        dragMovedRef.current = false;
      }, 0);
    };

    dragSurface.addEventListener('wheel', onWheel, { passive: false });
    node.addEventListener('scroll', onScroll, { passive: true });
    dragSurface.addEventListener('pointerdown', onPointerDown);
    dragSurface.addEventListener('pointermove', onPointerMove);
    dragSurface.addEventListener('pointerup', onPointerUp);
    dragSurface.addEventListener('pointerleave', onPointerUp);

    return () => {
      dragSurface.removeEventListener('wheel', onWheel);
      node.removeEventListener('scroll', onScroll);
      dragSurface.removeEventListener('pointerdown', onPointerDown);
      dragSurface.removeEventListener('pointermove', onPointerMove);
      dragSurface.removeEventListener('pointerup', onPointerUp);
      dragSurface.removeEventListener('pointerleave', onPointerUp);
      clearTimeout(wheelSettleTimeout);
      if (scrollRaf) window.cancelAnimationFrame(scrollRaf);
    };
  }, [clampSelectableIndex]);

  const selectedItem = timelineData[selectedIndex];
  const sceneCompany =
    !selectedItem || isPlaceholderItem(selectedItem) ? null :
    isIowaStateItem(selectedItem) ? 'isu' :
    isCaseysItem(selectedItem) ? 'caseys' :
    isDaveItem(selectedItem) ? 'dave' :
    isBayadaItem(selectedItem) ? 'bayada' :
    isWorkivaItem(selectedItem) ? 'workiva' :
    isCriticalTinkersItem(selectedItem) ? 'ct' :
    null;

  return (
    <div className="resume">
      {/* Full-page ambient backdrop for whichever entry is selected — set the
          scene, don't compete with the text. Anchored to .resume (not the
          scrolling timeline) so it stays put as a backdrop while the
          timeline slides underneath it, and images are kept to the page's
          edges/corners, clear of the text column on the left. A soft scrim
          (below) protects that column further regardless of viewport width. */}
      {sceneCompany === 'isu' && (
        <div key={`isu-scene-${selectedIndex}`} className="resume__scene resume__scene--isu resume__scene--enter" aria-hidden="true">
          <img src="/images/isu/campanile.png" alt="" className="resume__scene-img resume__scene-img--isu-campanile" />
          <img src="/images/isu/cy.png" alt="" className="resume__scene-img resume__scene-img--isu-cy" />
          <img src="/images/isu/isulogo.png" alt="" className="resume__scene-img resume__scene-img--isu-logo" />
        </div>
      )}
      {sceneCompany === 'caseys' && (
        <div key={`caseys-scene-${selectedIndex}`} className="resume__scene resume__scene--caseys resume__scene--enter" aria-hidden="true">
          <img src="/images/caseys/store.png" alt="" className="resume__scene-img resume__scene-img--caseys-store" />
          <img src="/images/caseys/caseys.png" alt="" className="resume__scene-img resume__scene-img--caseys-logo" />
          <img src="/images/caseys/app.png" alt="" className="resume__scene-img resume__scene-img--caseys-app" />
        </div>
      )}
      {sceneCompany === 'dave' && (
        <div key={`dave-scene-${selectedIndex}`} className="resume__scene resume__scene--dave resume__scene--enter" aria-hidden="true">
          <img src="/images/dave/dave-bear.webp" alt="" className="resume__scene-img resume__scene-img--dave-bear" />
          <img src="/images/dave/app.png" alt="" className="resume__scene-img resume__scene-img--dave-app" />
        </div>
      )}
      {sceneCompany === 'bayada' && (
        <div key={`bayada-scene-${selectedIndex}`} className="resume__scene resume__scene--bayada resume__scene--enter" aria-hidden="true">
          <img src="/images/bayada/bayadalogo.png" alt="" className="resume__scene-img resume__scene-img--bayada-logo" />
        </div>
      )}
      {sceneCompany === 'workiva' && (
        <div key={`workiva-scene-${selectedIndex}`} className="resume__scene resume__scene--workiva resume__scene--enter" aria-hidden="true">
          <img src="/images/workivalogo.png" alt="" className="resume__scene-img resume__scene-img--workiva-logo" />
        </div>
      )}
      {sceneCompany === 'ct' && (
        <div key={`ct-scene-${selectedIndex}`} className="resume__scene resume__scene--ct resume__scene--enter" aria-hidden="true">
          <img src="/images/criticaltinkers/CT Logo Filled.svg" alt="" className="resume__scene-img resume__scene-img--ct-logo" />
        </div>
      )}
      <div className="resume__text-scrim" aria-hidden="true" />

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
                const isPlaceholder = isPlaceholderItem(item);

                return (
                  <article
                    key={`${item.title}-${index}`}
                    className={`resume__timeline-item resume__timeline-item--${item.type} ${index === selectedIndex ? 'resume__timeline-item--selected' : ''} ${isPlaceholder ? 'resume__timeline-item--placeholder' : ''}`}
                    onClick={() => {
                     if (isPlaceholder) return;
                     if (dragMovedRef.current) {
                       dragMovedRef.current = false;
                       return;
                     }
                     selectItem(index);
                    }}
                    aria-current={index === selectedIndex && !isPlaceholder ? 'true' : undefined}
                    aria-disabled={isPlaceholder ? 'true' : undefined}
                    role={isPlaceholder ? undefined : 'button'}
                    tabIndex={isPlaceholder ? -1 : 0}
                    onKeyDown={isPlaceholder ? undefined : (event) => {
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
                    {index === selectedIndex && item.description && item.description.length > 0 && (
                      <ul className="resume__timeline-description">
                        {item.description.map((entry, descriptionIndex) => (
                          <li key={descriptionIndex}>{entry}</li>
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
