import { Link } from 'react-router-dom';
import '../App.css';

const blogs = [
  {
    name: 'what-really-happens-when-a-number-is-bigger-than-its-data-type',
    title: 'What Really Happens When a Number Is Bigger Than Its Data Type?',
    excerpt: 'Exploring the hidden world of number overflow in computers.'
  },
  {
    name: 'why 0.1 + 0.2 ≠ 0.3',
    title: 'Why 0.1 + 0.2 ≠ 0.3 (and What It Teaches Us About Floating-Point Numbers)',
    excerpt: 'Exploring the unexpected results of floating-point numbers.'
  },
  {
    name: 'Why Every Developer Should Use Linux for Development',
    title: 'Why Every Developer Should Use Linux for Development',
    excerpt: 'Exploring the advantages of using Linux for development.'
  },
  {
    name: 'why-fastapi-exists',
    title: 'Why FastAPI Exists?',
    excerpt: 'Exploring the reasons behind the creation of FastAPI.'
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