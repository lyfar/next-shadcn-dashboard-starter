'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

interface CustomCursorProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export function CustomCursor({ containerRef }: CustomCursorProps) {
  const cursorRef = useRef<SVGSVGElement>(null);
  const cursorInnerRef = useRef<SVGCircleElement>(null);
  const feTurbulenceRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    const cursor = { x: 0, y: 0 };
    const cursorEl = cursorRef.current;
    const cursorInnerEl = cursorInnerRef.current;
    const feTurbulence = feTurbulenceRef.current;
    const container = containerRef.current;

    if (!cursorEl || !cursorInnerEl || !feTurbulence || !container) return;

    const renderedStyles = {
      tx: { previous: 0, current: 0, amt: 0.15 },
      ty: { previous: 0, current: 0, amt: 0.15 },
      radius: { previous: 20, current: 20, amt: 0.15 },
      opacity: { previous: 1, current: 1, amt: 0.15 }
    };

    const primitiveValues = { turbulence: 0 };

    const filterTimeline = gsap.timeline({
      paused: true,
      onStart: () => {
        cursorInnerEl.style.filter = 'url(#cursor-filter)';
      },
      onUpdate: () => {
        feTurbulence.setAttribute('baseFrequency', primitiveValues.turbulence.toString());
      },
      onComplete: () => {
        cursorInnerEl.style.filter = 'none';
      }
    }).to(primitiveValues, { 
      duration: 1,
      ease: 'expo',
      startAt: { turbulence: 0.35 },
      turbulence: 0
    });

    const render = () => {
      renderedStyles.tx.current = cursor.x;
      renderedStyles.ty.current = cursor.y;

      for (const key in renderedStyles) {
        renderedStyles[key].previous = lerp(
          renderedStyles[key].previous,
          renderedStyles[key].current,
          renderedStyles[key].amt
        );
      }

      cursorEl.style.transform = `translateX(${renderedStyles.tx.previous}px) translateY(${renderedStyles.ty.previous}px)`;
      cursorInnerEl.setAttribute('r', renderedStyles.radius.previous.toString());
      cursorEl.style.opacity = renderedStyles.opacity.previous.toString();

      requestAnimationFrame(render);
    };

    const onMouseMove = (ev: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      cursor.x = ev.clientX - rect.left - 40; // Subtract half the SVG width
      cursor.y = ev.clientY - rect.top - 40;  // Subtract half the SVG height
    };

    container.addEventListener('mousemove', onMouseMove);
    requestAnimationFrame(render);

    return () => {
      container.removeEventListener('mousemove', onMouseMove);
    };
  }, [containerRef]);

  return (
    <svg ref={cursorRef} className="cursor" width="80" height="80" viewBox="0 0 80 80" style={{position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999}}>
      <defs>
        <filter id="cursor-filter" x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox">
          <feTurbulence ref={feTurbulenceRef} type="fractalNoise" baseFrequency="0" numOctaves="1" result="warp" />
          <feOffset dx="-5" result="warpOffset" />
          <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="20" in="SourceGraphic" in2="warpOffset" />
        </filter>
      </defs>
      <circle ref={cursorInnerRef} className="cursor__inner" cx="40" cy="40" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}