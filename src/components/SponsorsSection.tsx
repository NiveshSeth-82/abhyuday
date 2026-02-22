import { motion } from 'framer-motion';
import { useData } from '@/contexts/DataContext';

const tierColors = { title: 'text-primary neon-text', gold: 'text-yellow-400', silver: 'text-gray-400' };
const tierLabels = { title: 'Title Sponsor', gold: 'Gold Sponsors', silver: 'Silver Sponsors' };

export default function SponsorsSection() {
  const { sponsors } = useData();
  const tiers: ('title' | 'gold' | 'silver')[] = ['title', 'gold', 'silver'];

  return (
    <section id="sponsors" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm font-display uppercase tracking-[0.3em] text-primary mb-3">Partners</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold gradient-text">Our Sponsors</h2>
        </motion.div>

        {tiers.map((tier) => {
          const tierSponsors = sponsors.filter(s => s.category === tier);
          if (tierSponsors.length === 0) return null;
          return (
            <div key={tier} className="mb-12">
              <h3 className={`text-center text-lg font-display uppercase tracking-widest mb-6 ${tierColors[tier]}`}>
                {tierLabels[tier]}
              </h3>
              <div className="flex flex-wrap justify-center gap-6">
                {tierSponsors.map((s) => (
                  <motion.a
                    key={s.id}
                    href={s.link}
                    target="_blank"
                    rel="noopener"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass-card-hover p-6 md:p-8 flex items-center justify-center min-w-[150px] min-h-[80px]"
                  >
                    <span className="font-display font-semibold text-foreground tracking-wider">{s.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
