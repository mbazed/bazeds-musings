import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

const TRAIL_LENGTH = 6;

export default function CursorGlow() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Guard against SSR/client hydration mismatch
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;

    // Respect prefers-reduced-motion
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    
    // Store positions for the head and trailing blobs
    const history = Array(TRAIL_LENGTH).fill({ x: targetX, y: targetY });
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      targetX = t.clientX;
      targetY = t.clientY;
    };

    const animate = () => {
      // The head lazily follows the actual cursor
      history[0] = {
        x: history[0].x + (targetX - history[0].x) * 0.15,
        y: history[0].y + (targetY - history[0].y) * 0.15,
      };

      // Each subsequent segment follows the one in front of it
      for (let i = 1; i < TRAIL_LENGTH; i++) {
        history[i] = {
          x: history[i].x + (history[i - 1].x - history[i].x) * 0.4,
          y: history[i].y + (history[i - 1].y - history[i].y) * 0.4,
        };
      }

      // Update the DOM elements via refs for 0-latency painting
      trailRefs.current.forEach((el, i) => {
        if (!el) return;
        const pos = history[i];
        el.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      });
      
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(rafId);
    };
  }, [mounted]);

  // Only render on client, only in dark mode
  if (!mounted || resolvedTheme !== "dark") return null;

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => {
        // Decrease size and opacity the further back in the tail we are
        const size = 350 - (i * 40); 
        const opacity = 1 - (i / TRAIL_LENGTH);
        
        return (
          <div
            key={i}
            ref={(el) => {
              trailRefs.current[i] = el;
            }}
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: "50%",
              opacity: opacity,
              background:
                "radial-gradient(circle, rgba(144,169,85,0.18) 0%, rgba(79,119,45,0.08) 35%, rgba(49,87,44,0.02) 60%, transparent 75%)",
              willChange: "transform",
            }}
          />
        );
      })}
    </div>
  );
}
