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
  const [step, setStep] = useState(0); // 0..(2*total-1)

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
        // Fade-in: i <= step; Fade-out: hide from first to last (i > s2 remain)
        const visible = step < total ? i <= step : i > (step - total);
        return (
          <span className={`letter${visible ? ' on' : ''}`} key={i}>
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        );
      })}
    </span>
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const W = canvas.width;
    const H = canvas.height;

    // Constellation config
    const nodeSize = 3; // pixel size for nodes
    const baseSpeed = 6; // px/sec base drift magnitude
    const jitter = 0.15; // random jitter acceleration
    const linkDist = 42; // max distance to draw a link
    const linkAlpha = 0.22; // base alpha for links

    // Number of nodes scale with area
    const num = Math.max(70, Math.floor((W * H) / 900));

    const nodes = Array.from({ length: num }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() * 2 - 1) * baseSpeed,
      vy: (Math.random() * 2 - 1) * baseSpeed
    }));

    let rafId;
    let lastMs = 0;

    // Click attraction/repulsion pulse
    let pulseMode = 1; // 1 attract, -1 repel (toggles on pulse)
    let pulseX = W * 0.5;
    let pulseY = H * 0.5;
    let pulseStart = 0;
    const pulseDuration = 1800; // ms
    const pulseStrength = 160; // accel strength
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
      // compute pulse factor 0..1
      const pf = pulseStart ? Math.max(0, 1 - (nowMs - pulseStart) / pulseDuration) : 0;

      for (const n of nodes) {
        // random tiny jitter to avoid straight lines
        n.vx += (Math.random() * 2 - 1) * jitter;
        n.vy += (Math.random() * 2 - 1) * jitter;

        // apply pulse acceleration
        if (pf > 0) {
          const dx = pulseX - n.x;
          const dy = pulseY - n.y;
          const d2 = dx * dx + dy * dy + 1e-3;
          const invD = 1 / Math.sqrt(d2);
          const ax = pulseMode * pulseStrength * dx * invD / d2; // weaker with distance
          const ay = pulseMode * pulseStrength * dy * invD / d2;
          n.vx += ax * dt;
          n.vy += ay * dt;
        }

        // limit speed mildly
        const sp = Math.hypot(n.vx, n.vy);
        const maxSp = 26;
        if (sp > maxSp) {
          n.vx = (n.vx / sp) * maxSp;
          n.vy = (n.vy / sp) * maxSp;
        }

        n.x += n.vx * dt;
        n.y += n.vy * dt;

        // wrap around edges for seamless motion
        if (n.x < -nodeSize) n.x = W + nodeSize;
        if (n.x > W + nodeSize) n.x = -nodeSize;
        if (n.y < -nodeSize) n.y = H + nodeSize;
        if (n.y > H + nodeSize) n.y = -nodeSize;
      }
    }

    function render(nowMs) {
      if (!lastMs) lastMs = nowMs;
      const dt = Math.min(0.05, (nowMs - lastMs) / 1000); // cap dt

      // auto pulse if idle for a while
      if (nowMs >= nextAutoPulseMs && (nowMs - lastClickMs) > 3000 && (nowMs - pulseStart) > (pulseDuration + 250)) {
        triggerPulse(nowMs, W * 0.5, H * 0.5, true);
        nextAutoPulseMs = nowMs + autoPulseEvery;
      }

      stepNodes(dt, nowMs);

      // clear to paper
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = 'rgb(0, 0, 0)';
      ctx.fillRect(0, 0, W, H);

      // draw links
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(59, 230, 122, ${linkAlpha})`;
      ctx.beginPath();
      for (let i = 0; i < num; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < num; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < linkDist) {
            const alpha = linkAlpha * (1 - d / linkDist);
            ctx.strokeStyle = `rgba(59, 230, 122, ${alpha.toFixed(3)})`;
            ctx.moveTo(Math.round(a.x) + 0.5, Math.round(a.y) + 0.5);
            ctx.lineTo(Math.round(b.x) + 0.5, Math.round(b.y) + 0.5);
            ctx.stroke();
          }
        }
      }

      // draw nodes as pixel squares aligned to grid
      ctx.fillStyle = '#222';
      for (const n of nodes) {
        const x = Math.round(n.x - nodeSize / 2);
        const y = Math.round(n.y - nodeSize / 2);
        ctx.fillRect(x, y, nodeSize, nodeSize);
      }

      lastMs = nowMs;
      rafId = requestAnimationFrame(render);
    }

    rafId = requestAnimationFrame(render);

    return () => {
      canvas.removeEventListener('click', onClick);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

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
        width={220}
        height={300}
        className="about-canvas"
        title="Click to attract/repel constellations"
      />
    </>
  );
}

export default About; 