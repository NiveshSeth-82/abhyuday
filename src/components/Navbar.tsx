import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import ashokaLogo from '@/assets/college-logo.png';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Events', to: '/#departments' },
  { label: 'Schedule', to: '/#timeline' },
  { label: 'Coordinators', to: '/#coordinators' },
  { label: 'Gallery', to: '/#gallery' },
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
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3"
      >
        <div
          className={`max-w-6xl w-full rounded-2xl transition-all duration-500 ${scrolled
            ? 'bg-black/40 shadow-lg shadow-black/20 border border-white/10'
            : 'bg-transparent'
            }`}
          style={{ backdropFilter: scrolled ? 'blur(16px)' : 'none' }}
        >
          <div className="px-4 md:px-6 flex items-center justify-between h-14 md:h-16">
            {/* Ashoka Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img
                src={ashokaLogo}
                alt="Ashoka Institute"
                className="h-9 md:h-11 w-auto object-contain"
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => handleNav(link.to)}
                  className="px-3 py-2 text-sm font-semibold text-white/90 hover:text-cyan-300 transition-colors duration-300 tracking-wide rounded-lg hover:bg-white/10"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/search"
                className="px-3 py-2 text-white/80 hover:text-cyan-300 transition-colors rounded-lg hover:bg-white/10"
                title="Search Events"
              >
                <Search size={18} />
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-0 z-[60] bg-white/98 backdrop-blur-xl flex flex-col items-center justify-center gap-6"
          >
            <button onClick={() => setMobileOpen(false)} className="absolute top-5 right-5 text-gray-700">
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
                  className="text-2xl font-semibold tracking-wider text-gray-800 hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <Link to="/search" onClick={() => setMobileOpen(false)} className="text-xl font-semibold tracking-wider text-gray-700 hover:text-blue-600 transition-colors">
              Search
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
