import '../App.css';

const projects = [
    {
        title: 'Chess-Engine',
        description: 'A Python-based chess engine implementing chess rules, move generation, and AI algorithms for playing chess.',
        github_link: 'https://github.com/int-arsh/Chess-Engine',
        live_link: ''
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
        description: 'A JavaScript-based web app focused on music or audio visualization and analysis.',
        github_link: 'https://github.com/int-arsh/TuneTrace',
        live_link: 'https://tune-trace-pink.vercel.app/'
    },
    {
        title: 'super-To-Do',
        description: 'A productivity web app with a rich frontend interface for managing to-do lists, built with JavaScript, CSS, and HTML.',
        github_link: 'https://github.com/int-arsh/super-To-Do',
        live_link: 'https://super-to-do.vercel.app/'
    },
    {
        title: 'Palletron',
        description: 'A web-based interactive tool or game involving color palettes or patterns, developed using JavaScript, CSS, and HTML.',
        github_link: 'https://github.com/int-arsh/Palletron',
        live_link: 'https://palletron.vercel.app/'
    },
    {
        title: 'Quotes',
        description: 'A web app for displaying quotes from quotable api',
        github_link: 'https://github.com/int-arsh/quotes-react',
        live_link: 'https://quote-react-xi.vercel.app/'
    },
    {
        title: 'DevConnect',
        description: 'A JavaScript-powered web app or platform designed to help developers connect, collaborate, or share resources.',
        github_link: 'https://github.com/int-arsh/DevConnect',
        live_link: ''
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