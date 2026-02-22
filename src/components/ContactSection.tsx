import { motion } from 'framer-motion';
import { useData } from '@/contexts/DataContext';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import { useState } from 'react';

export default function ContactSection() {
  const { settings } = useData();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! (Demo)');
    setForm({ name: '', email: '', message: '' });
  };

  const socials = [
    { icon: Instagram, link: settings.socialLinks.instagram },
    { icon: Facebook, link: settings.socialLinks.facebook },
    { icon: Twitter, link: settings.socialLinks.twitter },
    { icon: Youtube, link: settings.socialLinks.youtube },
  ];

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm font-display uppercase tracking-[0.3em] text-primary mb-3">Reach Us</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold gradient-text">Contact</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 space-y-6"
          >
            <div className="flex items-start gap-4">
              <MapPin className="text-primary mt-1 shrink-0" size={20} />
              <p className="text-muted-foreground">{settings.contactAddress}</p>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-primary shrink-0" size={20} />
              <p className="text-muted-foreground">{settings.contactPhone}</p>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="text-primary shrink-0" size={20} />
              <p className="text-muted-foreground">{settings.contactEmail}</p>
            </div>
            <div className="flex gap-4 pt-4">
              {socials.map(({ icon: Icon, link }, i) => (
                link && <a key={i} href={link} target="_blank" rel="noopener" className="text-muted-foreground hover:text-primary transition-colors"><Icon size={22} /></a>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 space-y-4"
          >
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              required
            />
            <textarea
              placeholder="Your Message"
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              rows={4}
              className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
              required
            />
            <button type="submit" className="glow-btn w-full">Send Message</button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
