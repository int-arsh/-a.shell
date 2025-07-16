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

function BlogsList() {
  return (
    <section className="blogs-list">
      <h2>Blogs</h2>
      <ul>
        {blogs.map((blog, idx) => (
          <li key={idx} className="blog-item">
            <Link to={`/blogs/${blog.name}`} className="blog-title">{blog.title}</Link><br />
            <span className="blog-excerpt">{blog.excerpt}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default BlogsList; 