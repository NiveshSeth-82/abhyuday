import { motion } from 'framer-motion';
import { useData } from '@/contexts/DataContext';

export default function TimelineSection() {
  const { timeline } = useData();
  const days = [...new Set(timeline.map(t => t.day))];

  return (
    <section id="timeline" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm font-display uppercase tracking-[0.3em] text-primary mb-3">Schedule</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold gradient-text">Event Timeline</h2>
        </motion.div>

        {days.map((day) => (
          <div key={day} className="mb-12">
            <h3 className="text-xl font-display font-bold text-primary mb-6 neon-text">{day}</h3>
            <div className="relative border-l-2 border-primary/20 ml-4">
              {timeline.filter(t => t.day === day).map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-8 pb-8 last:pb-0"
                >
                  <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-primary/30 border-2 border-primary" />
                  <div className="glass-card p-5">
                    <span className="text-xs font-display text-primary tracking-wider">{item.time}</span>
                    <h4 className="text-lg font-heading font-semibold text-foreground mt-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
