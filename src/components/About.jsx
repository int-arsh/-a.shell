import '../App.css';
import { useRef, useEffect, useState } from 'react';

const boldWords = [
  'computer', 'science', 'mathematics', 'logic', 'clean', 'code'
];

function wrapWords(text) {
  return text.split(/(\s+)/).map((word, i) => {
    const cleanWord = word.replace(/[^a-zA-Z]/g, '');
    if (boldWords.includes(cleanWord)) {
      return word.trim() ? <span className="word" key={i}><strong>{word}</strong></span> : word;
    }
    return word.trim() ? <span className="word" key={i}>{word}</span> : word;
  });
}

function About() {
  const canvasRef = useRef(null);
  const headingText = 'Akash Jain.';
  const letters = headingText.split('');
  const total = letters.length;
  const [step, setStep] = useState(0);

  // --- State and Effect for Animated Heading ---
  useEffect(() => {
    const intervalMs = 300;
    const id = setInterval(() => {
      setStep((prev) => (prev + 1) % (total * 2));
    }, intervalMs);
    return () => clearInterval(id);
  }, [total]);

  const renderAnimatedHeading = () => (
    <span className="heading-letters">
      {letters.map((ch, i) => {
        const visible = step < total ? i <= step : i > (step - total);
        return (
          <span className={`letter${visible ? ' on' : ''}`} key={i}>
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        );
      })}
    </span>
  );

  // --- State and Effects for Canvas Animation ---
  const [dimensions, setDimensions] = useState({ 
      // Initial dimensions, can be adjusted
      width: 250, 
      height: 550 
  });

  // This effect can be used to make the canvas responsive to window size changes.
  // For now, it's set to fixed dimensions via the initial state.
  useEffect(() => {
      const handleResize = () => {
          // Example of responsive dimensions:
          // setDimensions({
          //     width: window.innerWidth * 0.9,
          //     height: window.innerHeight * 0.7
          // });
      };
      
      window.addEventListener('resize', handleResize);
      // Initial call to set size
      handleResize(); 
      
      return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Main animation effect - THIS IS THE REPLACED BLOCK
  useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');

      const W = canvas.width;
      const H = canvas.height;

      // --- Configuration ---
      const nodeSize = 2.5;
      const baseSpeed = 8; // px/sec
      const jitter = 0.12; // random acceleration
      const linkDist = 110; // max distance to draw a link
      const linkAlpha = 0.4;

      const num = Math.max(60, Math.floor((W * H) / 8000));

      const nodes = Array.from({ length: num }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() * 2 - 1) * baseSpeed,
        vy: (Math.random() * 2 - 1) * baseSpeed
      }));

      let rafId;
      let lastMs = 0;

      // --- Pulse Effect ---
      let pulseMode = 1; // 1: attract, -1: repel
      let pulseX = W * 0.5;
      let pulseY = H * 0.5;
      let pulseStart = 0;
      const pulseDuration = 1600; // ms
      const pulseStrength = 180;
      let lastClickMs = 0;
      let nextAutoPulseMs = performance.now() + 5000;
      const autoPulseEvery = 7000;

      function triggerPulse(now, x, y, toggle = true) {
        pulseX = x;
        pulseY = y;
        pulseStart = now;
        if (toggle) pulseMode *= -1;
      }

      function onClick(e) {
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (canvas.height / rect.height);
        const now = performance.now();
        triggerPulse(now, x, y, true);
        lastClickMs = now;
      }

      canvas.addEventListener('click', onClick);

      function stepNodes(dt, nowMs) {
        const pulseProgress = pulseStart ? Math.min(1, (nowMs - pulseStart) / pulseDuration) : 1;
        const pf = pulseStart ? (1 - pulseProgress) * (1 - Math.pow(pulseProgress, 3)) : 0;

        for (const n of nodes) {
          n.vx += (Math.random() * 2 - 1) * jitter;
          n.vy += (Math.random() * 2 - 1) * jitter;

          if (pf > 0) {
            const dx = pulseX - n.x;
            const dy = pulseY - n.y;
            const d2 = dx * dx + dy * dy + 1e-3;
            const invD = 1 / Math.sqrt(d2);
            const force = pf * pulseStrength * invD / d2;
            n.vx += pulseMode * force * dx * dt;
            n.vy += pulseMode * force * dy * dt;
          }

          const speed = Math.hypot(n.vx, n.vy);
          const maxSpeed = 40;
          if (speed > maxSpeed) {
            n.vx = (n.vx / speed) * maxSpeed;
            n.vy = (n.vy / speed) * maxSpeed;
          }

          n.x += n.vx * dt;
          n.y += n.vy * dt;

          if (n.x < -nodeSize) n.x = W + nodeSize;
          if (n.x > W + nodeSize) n.x = -nodeSize;
          if (n.y < -nodeSize) n.y = H + nodeSize;
          if (n.y > H + nodeSize) n.y = -nodeSize;
        }
      }
      
      function render(nowMs) {
        if (!lastMs) lastMs = nowMs;
        const dt = Math.min(0.05, (nowMs - lastMs) / 1000);

        if (nowMs >= nextAutoPulseMs && (nowMs - lastClickMs) > 3000 && (nowMs - pulseStart) > (pulseDuration + 250)) {
          triggerPulse(nowMs, W * 0.5 + (Math.random() - 0.5) * W * 0.5, H * 0.5 + (Math.random() - 0.5) * H * 0.5, true);
          nextAutoPulseMs = nowMs + autoPulseEvery;
        }

        stepNodes(dt, nowMs);

        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(0, 0, W, H);

        ctx.lineWidth = 1;
        for (let i = 0; i < num; i++) {
          const a = nodes[i];
          for (let j = i + 1; j < num; j++) {
            const b = nodes[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < linkDist) {
              const alpha = linkAlpha * (1 - d / linkDist);
              ctx.beginPath();
              ctx.strokeStyle = `rgba(59, 230, 122, ${alpha.toFixed(3)})`;
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }

        ctx.fillStyle = '#90ee90';
        for (const n of nodes) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, nodeSize / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        lastMs = nowMs;
        rafId = requestAnimationFrame(render);
      }

      rafId = requestAnimationFrame(render);

      return () => {
        canvas.removeEventListener('click', onClick);
        if (rafId) cancelAnimationFrame(rafId);
      };
  }, [dimensions]); // Rerun effect if dimensions change

  return (
    <>
      <section className="about">
        <p className="about-desc">{wrapWords('Hi, I am')}</p>
        <h2>{renderAnimatedHeading()}</h2>
        <p className="about-desc">
          {wrapWords('I love math,')}
          <br />
          {wrapWords('logic, and')}
          <br />  
          {wrapWords('code for the web.')}
        </p>
      </section>

      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="about-canvas"
        title="Click to attract/repel constellations"
      />
    </>
  );
}

export default About;