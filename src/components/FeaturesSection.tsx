import { motion } from 'framer-motion';
import { useData } from '@/contexts/DataContext';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

function Counter({ value, label, icon }: { value: string; label: string; icon: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="glass-card-hover p-6 md:p-8 text-center"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <div className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">{value}</div>
      <div className="text-sm text-muted-foreground font-display uppercase tracking-widest">{label}</div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const { features } = useData();

  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-display font-bold text-center gradient-text mb-16"
        >
          Why ABHYUDAY?
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {features.map((f) => (
            <Counter key={f.id} value={f.value} label={f.title} icon={f.icon} />
          ))}
        </div>
      </div>
    </section>
  );
}
