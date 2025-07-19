'use client';

import { useEffect, useRef } from 'react';

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    let CENTER_X = W / 2;
    let CENTER_Y = H / 2;
    canvas.width = W;
    canvas.height = H;

    const numStars = 1200;
    const stars: {
      r: number;
      speed: number;
      angle: number;
      axis: [number, number, number];
      size: number;
    }[] = [];

    const cross = (a: number[], b: number[]): [number, number, number] => [
      a[1]*b[2] - a[2]*b[1],
      a[2]*b[0] - a[0]*b[2],
      a[0]*b[1] - a[1]*b[0],
    ];

    const normalize = (v: number[]): [number, number, number] => {
      const len = Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
      return len > 0 ? [v[0]/len, v[1]/len, v[2]/len] : [1,0,0];
    };

    const rotateVector = (v: number[], axis: number[], angle: number): [number, number, number] => {
      const [x, y, z] = v;
      const [u, vA, w] = axis;

      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const dot = u*x + vA*y + w*z;
      const oneMinusCos = 1 - cosA;

      return [
        u*dot*oneMinusCos + x*cosA + (-w*y + vA*z)*sinA,
        vA*dot*oneMinusCos + y*cosA + (w*x - u*z)*sinA,
        w*dot*oneMinusCos + z*cosA + (-vA*x + u*y)*sinA,
      ];
    };

    const maxRadius = Math.sqrt(W*W + H*H) / 1.5;
    const exponent = 0.6;

    for (let i = 0; i < numStars; i++) {
      const r = Math.pow(Math.random(), exponent) * maxRadius;

      const phi = Math.random() * 2 * Math.PI;
      const cosTheta = Math.random() * 2 - 1;
      const theta = Math.acos(cosTheta);

      const x = r * Math.sin(theta) * Math.cos(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * cosTheta;

      const posVec = [x, y, z];
      const arbitraryVec = Math.abs(z) < 0.99 ? [0, 0, 1] : [1, 0, 0];
      const axis = normalize(cross(posVec, arbitraryVec));

      const speed = ((Math.random() * 0.5 + 0.05) * 0.3) * (Math.random() < 0.5 ? 1 : -1);
      const angle = Math.random() * 2 * Math.PI;
      const size = Math.random() * 1.2 + 0.3;

      stars.push({ r, speed, angle, axis, size });
    }

    const handleResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      CENTER_X = W / 2;
      CENTER_Y = H / 2;
      canvas.width = W;
      canvas.height = H;
    };

    window.addEventListener('resize', handleResize);

    let animationFrameId: number;

    const animate = (time = 0) => {
      ctx.clearRect(0, 0, W, H);
      const t = time / 1000;

      for (const star of stars) {
        const currentAngle = star.angle + star.speed * t;
        const pos = rotateVector([star.r, 0, 0], star.axis, currentAngle);

        const x = CENTER_X + pos[0];
        const y = CENTER_Y + pos[1];
        const z = pos[2];

        let depthScale = 0.5 + (z / star.r) * 0.5;
        depthScale = Math.min(Math.max(depthScale, 0), 1);

        const size = star.size * depthScale;
        const alpha = depthScale;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        backgroundColor: 'black',
        width: '100vw',
        height: '100vh',
      }}
    />
  );
}
