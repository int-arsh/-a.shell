import React, { useState, useEffect, useRef } from "react";
import "../App.css";

const Terminal = () => {
  const [history, setHistory] = useState([
    "> Type 'help' to begin."
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const responses = {
    whoami: [
      " ~ Hi, I'm Akash Jain.",
      " ~ I build things with logic and code."
    ],
    projects: [
      "- Projects: <a href='https://a-shell.vercel.app/projects' target='_blank' rel='noopener noreferrer'>https://a-shell.vercel.app/projects</a>",
      "- Shell: <a href='https://github.com/int-arsh/-a.shell' target='_blank' rel='noopener noreferrer'>https://github.com/int-arsh/-a.shell</a>"
    ],
    connect: [
      " ~ GitHub: <a href='https://github.com/int-arsh' target='_blank' rel='noopener noreferrer'>https://github.com/int-arsh</a>",
      " ~ Email: <a href='mailto:akash.mbu32@gmail.com'>akash.mbu32@gmail.com</a>",
      " ~ Twitter: <a href='' target='_blank' rel='noopener noreferrer'>https://x.com/roguekernel</a>"
    ],
    help: [
      " ~ Available commands:",
      "  > whoami",
      "  > projects",
      "  > connect",
      "  > resume",
      "  > clear",
      "  > help"
    ]
  };

  const simulateTyping = async (lines) => {
    setIsTyping(true);
    for (let line of lines) {
      await new Promise((r) => setTimeout(r, 30));
      setHistory((prev) => [...prev, line]);
    }
    setIsTyping(false);
  };

  const handleCommand = (command) => {
    const cmd = command.trim().toLowerCase();
    if (cmd === "clear") {
      setHistory(["> Type 'help' to begin."]);
    } else if (cmd === "matrix") {
      // simulateTyping(responses[cmd]);
      startMatrixEffect();
      



    } else if (cmd === "resume") {
      // simulateTyping(responses[cmd]);
      const link = document.createElement("a");
      link.href = "/resume.pdf";
      link.download = "Akash_Jain_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (responses[cmd]) {
      simulateTyping(responses[cmd]);
    } else {
      setHistory((prev) => [...prev, `>> ${command}`, "command not found"]);
    }
  };

  const startMatrixEffect = () => {
    const terminal = terminalRef.current;
  
    // Remove old canvas if exists
    const existing = document.getElementById("matrix-canvas");
    if (existing) terminal.removeChild(existing);
  
    const canvas = document.createElement("canvas");
    canvas.id = "matrix-canvas";
    terminal.appendChild(canvas);
  
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = terminal.clientWidth);
    let height = (canvas.height = terminal.clientHeight);
  
    const letters = "01アカサタナハマヤラワガザダバパ";
    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);
  
    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#0f0";
      ctx.font = `${fontSize}px monospace`;
  
      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
  
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
  
    const interval = setInterval(draw, 50);
  
    const handleResize = () => {
      width = canvas.width = terminal.clientWidth;
      height = canvas.height = terminal.clientHeight;
    };
    window.addEventListener("resize", handleResize);
  
    // Fade out and remove after 10s
    setTimeout(() => {
      canvas.style.opacity = "0";
      canvas.style.transition = "opacity 2s ease-out";
      setTimeout(() => {
        clearInterval(interval);
        window.removeEventListener("resize", handleResize);
        if (terminal.contains(canvas)) {
          terminal.removeChild(canvas);
        }
      }, 2000);
    }, 10000);
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setHistory((prev) => [...prev, `$ ${input}`]);
    handleCommand(input);
    setInput("");
  };

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [history]);

  useEffect(() => {
    const handler = () => startMatrixEffect();
    window.addEventListener('matrix', handler);
    return () => window.removeEventListener('matrix', handler);
  }, []);


  return (
    <div className="terminal" onClick={() => inputRef.current.focus()} ref={terminalRef}>
      {history.map((line, idx) => (
        <div key={idx} dangerouslySetInnerHTML={{ __html: line }} />
      ))}

      {!isTyping && (
        <form onSubmit={handleSubmit} className="terminal-line">
          <span>$</span>
          <div className="input-wrapper" onClick={() => inputRef.current.focus()}>
            <span className="fake-input">{input}</span>
            <div className="block-cursor" />
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="real-input"
              autoFocus
              autoComplete="off"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default Terminal;
