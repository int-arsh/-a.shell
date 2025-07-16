import '../App.css';

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
  return (
    <section className="about">
      <h2>{wrapWords('AKASH JAIN')}</h2>
      <p className="about-desc">
        {wrapWords('I’m into computer science with a strong interest in mathematics, logic, and clean code.')}<br /><br />
        {wrapWords('I mostly build for the web and enjoy solving problems that need clear thinking.')}
      </p>
    </section>
  );
}

export default About; 