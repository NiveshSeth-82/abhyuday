import { useParams, Link } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import Footer from '@/components/Footer';
import { ArrowLeft, ArrowRight, Calendar, MapPin, Trophy } from 'lucide-react';

export default function DepartmentEvents() {
  const { id } = useParams();
  const { departments, events } = useData();
  const dept = departments.find(d => d.id === id);
  const deptEvents = events.filter(e => e.departmentId === id && e.status === 'active');

  if (!dept) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display gradient-text mb-4">Department Not Found</h1>
          <Link to="/" className="glow-btn-outline">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ParticleBackground />
      <Navbar />
      <div className="pt-24 pb-20 px-4 max-w-6xl mx-auto relative z-10">
        <Link to="/#departments" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Departments
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="text-6xl mb-4">{dept.image}</div>
          <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-3">{dept.name}</h1>
          <p className="text-muted-foreground text-lg">{dept.description}</p>
        </motion.div>

        {deptEvents.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <p className="text-muted-foreground">No events yet in this department.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {deptEvents.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/event/${event.id}`} className="glass-card-hover p-6 block group">
                  <h3 className="text-xl font-display font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                    {event.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event.description}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {event.date}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {event.venue}</span>
                    <span className="flex items-center gap-1"><Trophy size={12} /> {event.prize}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-primary text-sm font-display opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details <ArrowRight size={14} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
