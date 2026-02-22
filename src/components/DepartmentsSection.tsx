import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import { ArrowRight } from 'lucide-react';

export default function DepartmentsSection() {
  const { departments, events } = useData();

  return (
    <section id="departments" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-display uppercase tracking-[0.3em] text-primary mb-3">Explore</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold gradient-text">Departments</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, i) => {
            const eventCount = events.filter(e => e.departmentId === dept.id && e.status === 'active').length;
            return (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/department/${dept.id}`} className="glass-card-hover p-6 md:p-8 block group">
                  <div className="text-5xl mb-4">{dept.image}</div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 font-body">{dept.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-display text-primary">{eventCount} Events</span>
                    <ArrowRight size={16} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
