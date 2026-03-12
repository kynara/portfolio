import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import { Vehicle } from './vehicle';

interface FleeingTextProps {
  text: string;
}

export const FleeingText: React.FC<FleeingTextProps> = ({ text }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;

    const sketch = (p: p5) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let font: any;
      const vehicles: Vehicle[] = [];
      const fontSize = 250;
      const textStartWidth = window.innerWidth / 2 - 438;
      const textStartHeight = window.outerHeight / 2;

      const isGoodPt = (x: number, y: number): boolean => {
        for (let i = -2; i < 3; i++) {
          for (let j = -2; j < 3; j++) {
            if (p.get(x + i, y + j)[0] === 0) return false;
          }
        }
        return true;
      };

      p.preload = () => {
        font = p.loadFont('/fonts/super-normal-font/SuperNormal-xRoj5.ttf');
      };

      p.setup = () => {
        if (cancelled) return;
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.textFont(font);
        p.textSize(fontSize);
        p.fill('#F0CF65');
        p.noStroke();
        p.text(text, 0, 500);

        const outlinepts = (font.textToPoints(text, 0, 0, fontSize, {
          sampleFactor: 0.1,
        }) as { x: number; y: number }[]);

        for (const pt of outlinepts) {
          vehicles.push(new Vehicle(p, pt.x, pt.y));
          p.stroke(255);
          p.strokeWeight(5);
          p.point(pt.x, pt.y);
        }

        const factor = 5;
        for (let y = 0; y < 750; y += factor) {
          for (let x = 0; x < 1700; x += factor) {
            const tx = x + p.random(0, factor);
            const ty = y + p.random(0, factor);
            if (isGoodPt(tx, ty)) {
              vehicles.push(new Vehicle(p, tx, ty - 500));
            }
          }
        }
      };

      p.draw = () => {
        if (cancelled) { p.noLoop(); return; }
        p.textSize(fontSize);
        p.background('#DDEDAA');
        p.noStroke();
        p.text(text, textStartWidth, textStartHeight);
        for (const v of vehicles) {
          v.behaviors(p, textStartWidth, textStartHeight);
          v.update(p);
          v.show(p, textStartWidth, textStartHeight);
        }
      };
    };

    // p5 instance mode
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const instance = new (p5 as any)(sketch, container);

    return () => {
      cancelled = true;
      instance.remove();
    };
  }, [text]);

  return <div ref={containerRef} style={{ position: 'absolute', inset: 0 }} />;
};