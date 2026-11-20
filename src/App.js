import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { navItems } from './data';
import './App.css';

// Old routes (/about, /projects, /contact) still work: they scroll to their section.
function useScrollToRouteSection() {
  const { pathname } = useLocation();
  useEffect(() => {
    const item = navItems.find((n) => n.path === pathname);
    if (!item || item.id === 'home') {
      if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    // Wait a frame so layout (fonts, lazy hero) has settled before measuring.
    const id = requestAnimationFrame(() => {
      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);
}

function App() {
  useScrollToRouteSection();
  return (
    <>
      <a className="skip-link" href="#about">Skip to content</a>
      <Header />
      <main>
        <Home />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
