import { useParams, Link } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import Footer from '@/components/Footer';
import { ArrowLeft, Calendar, Clock, MapPin, Trophy, Users, Share2, Phone, Mail } from 'lucide-react';

export default function EventDetails() {
  const { id } = useParams();
  const { events, departments } = useData();
  const event = events.find(e => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display gradient-text mb-4">Event Not Found</h1>
          <Link to="/" className="glow-btn-outline">Go Home</Link>
        </div>
      </div>
    );
  }

  const dept = departments.find(d => d.id === event.departmentId);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: event.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied!');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ParticleBackground />
      <Navbar />
      <div className="pt-24 pb-20 px-4 max-w-4xl mx-auto relative z-10">
        <Link to={`/department/${event.departmentId}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft size={16} /> Back to {dept?.name || 'Department'}
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {event.bannerImage && (
            <img src={event.bannerImage} alt={event.name} className="w-full h-48 md:h-64 object-cover rounded-xl mb-8 border border-border" />
          )}

          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-sm font-display text-primary uppercase tracking-widest mb-2">{dept?.name}</p>
              <h1 className="text-3xl md:text-5xl font-display font-bold gradient-text">{event.name}</h1>
            </div>
            <button onClick={handleShare} className="glass-card p-3 text-muted-foreground hover:text-primary transition-colors">
              <Share2 size={20} />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Calendar, label: 'Date', value: event.date },
              { icon: Clock, label: 'Time', value: event.time },
              { icon: MapPin, label: 'Venue', value: event.venue },
              { icon: Trophy, label: 'Prize', value: event.prize },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="glass-card p-4 text-center">
                <Icon size={20} className="text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-semibold text-foreground">{value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-lg font-display font-semibold text-primary mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{event.description}</p>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-display font-semibold text-primary mb-3">Rules</h3>
              <p className="text-muted-foreground leading-relaxed">{event.rules}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="glass-card p-6">
                <h3 className="text-lg font-display font-semibold text-primary mb-3">Eligibility</h3>
                <p className="text-muted-foreground">{event.eligibility}</p>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-lg font-display font-semibold text-primary mb-3">Team Size</h3>
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-primary" />
                  <p className="text-muted-foreground">{event.teamSize} members</p>
                </div>
              </div>
            </div>

            {event.coordinators.length > 0 && (
              <div className="glass-card p-6">
                <h3 className="text-lg font-display font-semibold text-primary mb-4">Event Coordinators</h3>
                <div className="space-y-3">
                  {event.coordinators.map((c, i) => (
                    <div key={i} className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
                      <span className="text-foreground font-medium">{c.name}</span>
                      <div className="flex gap-3">
                        <a href={`tel:${c.phone}`} className="text-muted-foreground hover:text-primary"><Phone size={16} /></a>
                        <a href={`mailto:${c.email}`} className="text-muted-foreground hover:text-primary"><Mail size={16} /></a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <a
              href={event.googleFormLink}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-btn text-lg !px-12 !py-4 inline-block"
            >
              Register Now
            </a>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
