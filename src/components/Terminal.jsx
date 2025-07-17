import React, { useState, useEffect, useRef } from "react";
import "../App.css";

const TerminalSection = () => {
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
      "- Portfolio: github.com/int-arsh/portfolio",
      "- Shell: github.com/int-arsh/a-shell"
    ],
    connect: [
      " ~ GitHub: https://github.com/int-arsh",
      " ~ Email: akash@example.com"
    ],
    help: [
      " ~ Available commands:",
      "  > whoami",
      "  > projects",
      "  > connect",
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
      setHistory([]);
    } else if (responses[cmd]) {
      simulateTyping(responses[cmd]);
    } else {
      setHistory((prev) => [...prev, `>> ${command}`, "command not found"]);
    }
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

  return (
    <div className="terminal" onClick={() => inputRef.current.focus()} ref={terminalRef}>
      {history.map((line, idx) => (
        <div key={idx}>{line}</div>
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

export default TerminalSection;
