import { useParams } from 'react-router-dom';
import '../App.css';

const blogs = [
  {
    name: 'truth-and-simplicity',
    title: 'Truth and Simplicity',
    content: `Minimalism is not just a design choice, but a way of life. In this post, we explore how simplicity leads to clarity and truth, both in code and in life.`
  },
  {
    name: 'building-with-react',
    title: 'Building with React',
    content: `React and Bun make it easy to build fast, honest, and minimal personal sites. Here is how I approached building mine.`
  },
  {
    name: 'open-source-journey',
    title: 'Open Source Journey',
    content: `Contributing to open source is about sharing, learning, and growing together. Here are some lessons from my journey.`
  }
];

const boldWords = ['blog', 'blogs'];

function wrapWords(text) {
  return text.split(/(\s+)/).map((word, i) => {
    const cleanWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
    if (boldWords.includes(cleanWord)) {
      return word.trim() ? <span className="word" key={i}><strong>{word}</strong></span> : word;
    }
    return word.trim() ? <span className="word" key={i}>{word}</span> : word;
  });
}

function BlogPost() {
  const { blogName } = useParams();
  const blog = blogs.find(b => b.name === blogName);

  if (!blog) {
    return <div className="blog-post"><h2>Blog not found</h2></div>;
  }

  return (
    <article className="blog-post">
      <h2>{wrapWords(blog.title)}</h2>
      <div className="blog-content">{wrapWords(blog.content)}</div>
    </article>
  );
}

export default BlogPost; 