import { motion } from 'framer-motion';
import { useData } from '@/contexts/DataContext';
import CountdownTimer from './CountdownTimer';
import heroBg from '@/assets/bg-image.png';
import heroTitle from '@/assets/abhyuday-title.png';

import partnerCipher from '@/assets/partners/cipher.jpg';
import partnerMoksh from '@/assets/partners/MOKSH.png';
import partnerIEEE from '@/assets/partners/IEEE.png';
import partnerIIC from '@/assets/partners/IIC.png';
import partnerIC from '@/assets/partners/ic_logo.png';
import partnerIOE from '@/assets/partners/IOE.png';
import partnerCSI from '@/assets/partners/CSI-LOGO.png';
import partnerGFG from '@/assets/partners/GeeksForGeeks_logo.png';

const partners = [
  { src: partnerCipher, alt: 'CS Cipher' },
  { src: partnerMoksh, alt: 'MOKSH' },
  { src: partnerIEEE, alt: 'IEEE' },
  { src: partnerIIC, alt: 'IIC' },
  { src: partnerIC, alt: 'IC' },
  { src: partnerIOE, alt: 'IOE' },
  { src: partnerCSI, alt: 'CSI' },
  { src: partnerGFG, alt: 'GeeksForGeeks' },
];

export default function Hero() {
  const { settings } = useData();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 via-transparent to-neon-purple/5" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.img
          src={heroTitle}
          alt={settings.heroText}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="h-24 md:h-36 lg:h-44 w-auto mx-auto mb-6 object-contain"
          style={{
            filter: "brightness(0) invert(1) drop-shadow(2px 4px 6px rgba(0,0,0,0.4))",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-base md:text-xl font-body max-w-2xl mx-auto mb-8"
          style={{ color: 'hsl(183.32deg 58.67% 62.66%)' }}
        >
          {settings.heroSubtext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center mb-8"
        >
          <CountdownTimer />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          <a href="#departments" className="glow-btn text-base">
            Register Now
          </a>
          <a href="#departments" className="glow-btn-outline text-base">
            Explore Events
          </a>
        </motion.div>

        {/* Partner Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap justify-center items-center gap-3 md:gap-5"
        >
          {partners.map((p, i) => (
            <div
              key={i}
              className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/90 flex items-center justify-center p-2 shadow-lg backdrop-blur-sm transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-[0_0_15px_rgba(0,255,255,0.5),0_0_30px_rgba(0,255,255,0.2)]"
            >
              <img
                src={p.src}
                alt={p.alt}
                className="w-full h-full object-contain rounded-full"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
