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

function FeaturedBlogs() {
  return (
    <section className="featured-blogs">
      <h2>Featured Blogs</h2>
      <ul>
        {featuredBlogs.map((blog, idx) => (
          <li key={idx} className="featured-blog-item">
            <Link to={`/blogs/${blog.name}`} className="blog-title">{blog.title}</Link><br />
            <span className="blog-excerpt">{blog.excerpt}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FeaturedBlogs; 