import { Link } from 'react-router-dom';
import '../App.css';

const blogs = [
  {
    name: 'truth-and-simplicity',
    title: 'Truth and Simplicity',
    excerpt: 'Exploring the beauty of minimalism and honest design.'
  },
  {
    name: 'building-with-react',
    title: 'Building with React',
    excerpt: 'A journey through building a personal site with React and Bun.'
  },
  {
    name: 'open-source-journey',
    title: 'Open Source Journey',
    excerpt: 'Reflections on contributing to open source projects.'
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

function BlogsList() {
  return (
    <section className="blogs-list">
      <h2>{wrapWords('Blogs')}</h2>
      <ul>
        {blogs.map((blog, idx) => (
          <li key={idx} className="blog-item">
            <Link to={`/blogs/${blog.name}`} className="blog-title">{wrapWords(blog.title)}</Link><br />
            <span className="blog-excerpt">{wrapWords(blog.excerpt)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default BlogsList; 