import { useEffect, useRef, useCallback } from 'react';
import { useTheme, useSettings } from '../hooks';

const DOT_SPACING = 32;
const DOT_BASE_RADIUS = 1;
const DOT_MAX_RADIUS = 2.5;
const GLOW_RADIUS = 200;

const DotGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);
  const needsRedrawRef = useRef(true);
  const isTouchDeviceRef = useRef(false);
  const { theme } = useTheme();
  const { settings } = useSettings();

  // Skip rendering entirely on touch-only devices and reduced motion
  useEffect(() => {
    isTouchDeviceRef.current = window.matchMedia('(pointer: coarse)').matches;
  }, []);

  const prefersReducedMotion = useRef(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const draw = useCallback(() => {
    if (!settings.showDotGrid || isTouchDeviceRef.current || prefersReducedMotion.current) return;
    if (!needsRedrawRef.current) {
      animationRef.current = requestAnimationFrame(draw);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const viewWidth = window.innerWidth;
    const viewHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const { x: mx, y: my } = mouseRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const isDark = theme === 'dark';
    const baseAlpha = isDark ? 0.12 : 0.1;
    const glowAlpha = isDark ? 0.4 : 0.3;
    const baseColor = isDark ? '243, 244, 246' : '17, 24, 39';

    const startX = DOT_SPACING / 2;
    const startY = DOT_SPACING / 2;

    // Only draw dots visible in the viewport (with padding)
    const pad = GLOW_RADIUS;
    const visibleTop = scrollY - pad;
    const visibleBottom = scrollY + viewHeight + pad;

    ctx.save();
    ctx.scale(dpr, dpr);

    for (let x = startX; x < viewWidth; x += DOT_SPACING) {
      for (let y = startY; y < viewHeight + DOT_SPACING; y += DOT_SPACING) {
        const worldY = y + scrollY;
        if (worldY < visibleTop || worldY > visibleBottom) continue;

        const dx = x - mx;
        const dy = worldY - my;
        const distSq = dx * dx + dy * dy;
        const glowRadiusSq = GLOW_RADIUS * GLOW_RADIUS;

        let radius = DOT_BASE_RADIUS;
        let alpha = baseAlpha;

        if (distSq < glowRadiusSq) {
          const dist = Math.sqrt(distSq);
          const proximity = 1 - dist / GLOW_RADIUS;
          radius = DOT_BASE_RADIUS + (DOT_MAX_RADIUS - DOT_BASE_RADIUS) * proximity;
          alpha = baseAlpha + (glowAlpha - baseAlpha) * proximity;
        }

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseColor}, ${alpha})`;
        ctx.fill();
      }
    }

    ctx.restore();
    needsRedrawRef.current = false;
    animationRef.current = requestAnimationFrame(draw);
  }, [theme, settings.showDotGrid]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      needsRedrawRef.current = true;
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY };
      needsRedrawRef.current = true;
    };

    const handleScroll = () => {
      needsRedrawRef.current = true;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    needsRedrawRef.current = true;
    animationRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationRef.current);
  }, [draw]);

  // Don't render canvas when disabled, on touch devices, or reduced-motion
  if (!settings.showDotGrid || isTouchDeviceRef.current || prefersReducedMotion.current) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
};

export default DotGrid;
