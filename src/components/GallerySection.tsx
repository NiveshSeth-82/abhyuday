import { motion } from 'framer-motion';
import { useData } from '@/contexts/DataContext';
import { Camera } from 'lucide-react';

export default function GallerySection() {
  const { gallery } = useData();

  if (gallery.length === 0) {
    return (
      <section id="gallery" className="section-padding">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <p className="text-sm font-display uppercase tracking-[0.3em] text-primary mb-3">Memories</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold gradient-text mb-8">Gallery</h2>
            <div className="glass-card p-12 flex flex-col items-center gap-4">
              <Camera size={48} className="text-muted-foreground" />
              <p className="text-muted-foreground">Photos & videos coming soon!</p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm font-display uppercase tracking-[0.3em] text-primary mb-3">Memories</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold gradient-text">Gallery</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card overflow-hidden group cursor-pointer"
            >
              <img src={item.url} alt={item.caption} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
