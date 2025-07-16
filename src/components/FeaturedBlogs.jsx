import { Link } from 'react-router-dom';
import '../App.css';

const featuredBlogs = [
  {
    name: 'truth-and-simplicity',
    title: 'Truth and Simplicity',
    excerpt: 'Exploring the beauty of minimalism and honest design.'
  },
  {
    name: 'building-with-react',
    title: 'Building with React',
    excerpt: 'A journey through building a personal site with React and Bun.'
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

function FeaturedBlogs() {
  return (
    <section className="featured-blogs">
      <h2>{wrapWords('Featured Blogs')}</h2>
      <ul>
        {featuredBlogs.map((blog, idx) => (
          <li key={idx} className="featured-blog-item">
            <Link to={`/blogs/${blog.name}`} className="blog-title">{wrapWords(blog.title)}</Link><br />
            <span className="blog-excerpt">{wrapWords(blog.excerpt)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FeaturedBlogs; 