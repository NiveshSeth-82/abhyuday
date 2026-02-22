import { motion } from 'framer-motion';
import { useData } from '@/contexts/DataContext';
import { Phone, Mail } from 'lucide-react';

export default function CoordinatorsSection() {
  const { coordinators } = useData();

  return (
    <section id="coordinators" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm font-display uppercase tracking-[0.3em] text-primary mb-3">Our Team</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold gradient-text">Core Coordinators</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coordinators.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card-hover p-6 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center text-3xl font-display gradient-text border border-primary/20">
                {c.name.charAt(0)}
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground">{c.name}</h3>
              <p className="text-sm text-primary font-display mt-1">{c.role}</p>
              <p className="text-xs text-muted-foreground mt-1">{c.department}</p>
              <div className="flex justify-center gap-3 mt-4">
                <a href={`tel:${c.phone}`} className="text-muted-foreground hover:text-primary transition-colors">
                  <Phone size={16} />
                </a>
                <a href={`mailto:${c.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                  <Mail size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
