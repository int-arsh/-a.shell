import '../App.css';

const projects = [
    {
        title: 'Connect4',
        description:'A real-time multiplayer Connect4 game server built with FastAPI, MongoDB, and WebSockets.',
        github_link:'https://github.com/int-arsh/connect4',
        live_link:''
    },
    {
        title: 'Echo',
        description: 'Social App built in Next.js 15, React, Tailwind CSS, MySQL featuring user authentication, real-time chat, and post sharing functionalities.',
        github_link: 'https://github.com/int-arsh/Echo',
        live_link: 'https://echo-beta-six.vercel.app/'
    },
    
    {
        title: 'Chattr',
        description: 'A real-time chat application built with React and Socket.IO, featuring room-based messaging and modern web technologies.',
        github_link: 'https://github.com/int-arsh/Chattr',
        live_link: 'https://chattr-tan.vercel.app/'
    },
    {
        title: 'Book-shelf',
        description: 'Personal bookshelf web application designed to act as a digital reading journal',
        github_link: 'https://github.com/int-arsh/book-shelf',
        live_link: 'https://book-shelf-silk.vercel.app'
    },
    {
        title: 'gmnx',
        description: 'A zsh command-line tool using the Google Gemini API for help with commands, code, and explanations.',
        github_link: 'https://github.com/int-arsh/gmnx',
        live_link: ''
    },
    {
        title: 'Nihilist kernel',
        description: 'It is a dialogue engine that explores the intersection of computer science and philosophy.',
        github_link: 'https://github.com/int-arsh/nihilist-kernel',
        live_link: 'https://nihilist-kernel.vercel.app/'
    },
    {
        title: 'Chess-Engine',
        description: 'A chess engine created in Python using the Pygame library. This project allows users to play chess against an AI or another player, with a graphical interface powered by Pygame',
        github_link: 'https://github.com/int-arsh/Chess-Engine',
        live_link: ''
    },
    {
        title: 'Palletron',
        description: 'Palletron is a smart color palette generator built with React, Tailwind CSS, and ViteInstantly craft, lock, and export aesthetic color schemes as PNG or CSS with a single click.',
        github_link: 'https://github.com/int-arsh/Palletron',
        live_link: 'https://palletron.vercel.app/'
    },
    {
        title: 'CineCache',
        description: 'A web application centered around movie caching, recommendations, or entertainment data using JavaScript.',
        github_link: 'https://github.com/int-arsh/CineCache',
        live_link: 'https://cine-cache.vercel.app/'
    },
    {
        title: 'emoji-interpreter',
        description: 'A web app for interpreting or translating emoji sequences, built with JavaScript, CSS, and HTML.',
        github_link: 'https://github.com/int-arsh/emoji-interpreter',
        live_link: 'https://emoji-interpreter-akashs-projects-edcd16fb.vercel.app/'
    },
    {
        title: 'rayTracer',
        description: 'A C++ graphics project implementing ray tracing algorithms for rendering realistic images.',
        github_link: 'https://github.com/int-arsh/rayTracer',
        live_link: ''
    },
    {
        title: 'TuneTrace',
        description: 'A JavaScript-based web app focused on finding lyrics and artists of a song.',
        github_link: 'https://github.com/int-arsh/TuneTrace',
        live_link: 'https://tune-trace-pink.vercel.app/'
    },
    {
        title: 'sentibot',
        description: 'A bot combining frontend and backend technologies, focused on sentiment analysis and natural language processing.',
        github_link: 'https://github.com/int-arsh/sentibot',
        live_link: 'https://sentibot.vercel.app/'
    },
];

function wrapWords(text) {
  return text.split(/(\s+)/).map((word, i) =>
    word.trim() ? <span className="word" key={i}>{word}</span> : word
  );
}

function ProjectsList() {
  return (
    <section className="projects-list">
      <h2>{wrapWords('Projects')}</h2>
      <ul>
        {projects.map((project, idx) => (
          <li key={idx} className="project-item">
            <strong>{wrapWords(project.title)}</strong><br />
            <span>{wrapWords(project.description)}</span><br />
            {project.github_link && <a href={project.github_link} target="_blank" rel="noopener noreferrer">Code</a>}
            {project.live_link && <a href={project.live_link} target="_blank" rel="noopener noreferrer">Visit</a>}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ProjectsList; 