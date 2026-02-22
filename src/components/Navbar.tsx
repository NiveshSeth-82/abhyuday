import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';
import { useData } from '@/contexts/DataContext';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Events', to: '/#departments' },
  { label: 'Schedule', to: '/#timeline' },
  { label: 'Coordinators', to: '/#coordinators' },
  { label: 'Gallery', to: '/#gallery' },
  { label: 'Sponsors', to: '/#sponsors' },
  { label: 'Contact', to: '/#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { settings } = useData();
  const location = useLocation();

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const handleNav = (to: string) => {
    setMobileOpen(false);
    if (to.includes('#')) {
      const id = to.split('#')[1];
      if (location.pathname !== '/') {
        window.location.href = to;
        return;
      }
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="font-display font-bold text-lg md:text-xl gradient-text tracking-wider">
            {settings.festName}
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => handleNav(link.to)}
                className="px-3 py-2 text-sm font-body text-muted-foreground hover:text-primary transition-colors duration-300 tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/search"
              className="px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
              title="Search Events"
            >
              <Search size={18} />
            </Link>
            <Link
              to="/admin"
              className="ml-3 glow-btn text-xs !px-5 !py-2"
            >
              Admin
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-foreground p-2"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6"
          >
            <button onClick={() => setMobileOpen(false)} className="absolute top-5 right-5 text-foreground">
              <X size={28} />
            </button>
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={link.to}
                  onClick={() => handleNav(link.to)}
                  className="text-2xl font-display tracking-wider text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <Link to="/search" onClick={() => setMobileOpen(false)} className="text-xl font-display tracking-wider text-foreground hover:text-primary transition-colors">
              Search
            </Link>
            <Link to="/admin" onClick={() => setMobileOpen(false)} className="glow-btn mt-4">
              Admin Panel
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
