import React, { useState, useEffect } from "react";
import "../App.css"; // add styles from next block

const Terminal = () => {
  const [history, setHistory] = useState([
    "> Type 'help' or 'commands' to sneak"
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const responses = {
    whoami: [
      "Hi, I'm Akash Jain.",
      "I build things with logic and code."
    ],
    projects: [
      "- Portfolio: github.com/int-arsh/portfolio",
      "- Shell: github.com/int-arsh/a-shell"
    ],
    connect: [
      "GitHub: https://github.com/int-arsh",
      "Email: jainaakash303@gmail.com"
    ],
    help: [
      "Available commands:",
      "> whoami",
      "> projects",
      "> connect",
      "> clear",
      "> help"
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
      setHistory((prev) => [...prev, `> ${command}`, "command not found"]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setHistory((prev) => [...prev, `> ${input}`]);
      handleCommand(input);
      setInput("");
    } else if (e.key.length === 1 || e.key === "Backspace") {
      setInput((prev) =>
        e.key === "Backspace" ? prev.slice(0, -1) : prev + e.key
      );
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="terminal">
      {history.map((line, idx) => (
        <div key={idx}>{line}</div>
      ))}
      {!isTyping && (
        <div>
          <span>&gt; {input}</span>
          <span className="cursor" />
        </div>
      )}
    </div>
  );
};

export default Terminal;
