import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import ProjectsList from './components/ProjectsList';
import BlogsList from './components/BlogsList';
import BlogPost from './components/BlogPost';
// import FeaturedBlogs from './components/FeaturedBlogs';
import Terminal from './components/Terminal';


function App() {
  return (
    <Router>
      <div className="site-container">
            <Header />
            <main className="main-content">
            <div className="about-section">
                <About />
            </div>
            <div className="dynamic-section">
                <Routes>
                    <Route path="/" element={<Terminal />} />
                    <Route path="/cli" element={<Terminal />} />
                    <Route path="/projects" element={<ProjectsList />} />
                    <Route path="/blogs" element={<BlogsList />} />
                    <Route path="/blogs/:blogName" element={<BlogPost />} />
                </Routes>
            </div>
            </main>
            <Footer />
      </div>
    </Router>
  );
}

export default App;
