import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '@/contexts/DataContext';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import Footer from '@/components/Footer';
import { Search, Calendar, MapPin, Trophy, Filter, X } from 'lucide-react';

export default function SearchPage() {
  const { events, departments } = useData();
  const [query, setQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return events.filter(e => {
      if (e.status !== 'active') return false;
      const dept = departments.find(d => d.id === e.departmentId);
      const searchStr = `${e.name} ${e.description} ${e.venue} ${dept?.name || ''}`.toLowerCase();
      if (query && !searchStr.includes(query.toLowerCase())) return false;
      if (deptFilter && e.departmentId !== deptFilter) return false;
      if (dateFilter && e.date !== dateFilter) return false;
      return true;
    });
  }, [events, departments, query, deptFilter, dateFilter]);

  const dates = [...new Set(events.map(e => e.date))].sort();
  const hasActiveFilters = deptFilter || dateFilter;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ParticleBackground />
      <Navbar />
      <div className="pt-24 pb-20 px-4 max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-6">Search Events</h1>

          {/* Search bar */}
          <div className="relative mb-4">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search events by name, department, keyword..."
              className="w-full bg-muted/50 border border-border rounded-xl pl-12 pr-4 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-base"
              autoFocus
            />
          </div>

          {/* Filter toggle */}
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-display transition-colors ${
                showFilters || hasActiveFilters ? 'bg-primary/10 text-primary border border-primary/30' : 'glass-card text-muted-foreground hover:text-foreground'
              }`}
            >
              <Filter size={16} />
              Filters
              {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-primary" />}
            </button>
            {hasActiveFilters && (
              <button
                onClick={() => { setDeptFilter(''); setDateFilter(''); }}
                className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
              >
                <X size={14} /> Clear filters
              </button>
            )}
            <span className="text-sm text-muted-foreground ml-auto">
              {filtered.length} event{filtered.length !== 1 ? 's' : ''} found
            </span>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="glass-card p-5 mb-6 flex flex-wrap gap-4"
            >
              <div className="flex-1 min-w-[200px]">
                <label className="text-xs text-muted-foreground font-display uppercase tracking-wider block mb-2">Department</label>
                <select
                  value={deptFilter}
                  onChange={e => setDeptFilter(e.target.value)}
                  className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2.5 text-foreground focus:outline-none focus:border-primary text-sm"
                >
                  <option value="">All Departments</option>
                  {departments.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="text-xs text-muted-foreground font-display uppercase tracking-wider block mb-2">Date</label>
                <select
                  value={dateFilter}
                  onChange={e => setDateFilter(e.target.value)}
                  className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2.5 text-foreground focus:outline-none focus:border-primary text-sm"
                >
                  <option value="">All Dates</option>
                  {dates.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results */}
        {filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-12 text-center">
            <Search size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">No events found</p>
            <p className="text-muted-foreground/60 text-sm mt-1">Try different keywords or adjust filters</p>
          </motion.div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((event, i) => {
              const dept = departments.find(d => d.id === event.departmentId);
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link to={`/event/${event.id}`} className="glass-card-hover p-5 block group">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                        {event.name}
                      </h3>
                      <span className="text-xs font-display text-primary bg-primary/10 px-2 py-1 rounded shrink-0 ml-2">
                        {dept?.name}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{event.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {event.date}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} /> {event.venue}</span>
                      <span className="flex items-center gap-1"><Trophy size={12} /> {event.prize}</span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
