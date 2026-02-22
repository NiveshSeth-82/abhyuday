import { useState, useEffect } from 'react';
import { useData } from '@/contexts/DataContext';

export default function CountdownTimer() {
  const { settings } = useData();
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const target = new Date(settings.festDate).getTime();
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [settings.festDate]);

  const blocks = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ];

  return (
    <div className="flex gap-3 md:gap-5">
      {blocks.map((b) => (
        <div key={b.label} className="glass-card p-3 md:p-4 min-w-[60px] md:min-w-[80px] text-center">
          <div className="text-2xl md:text-4xl font-display font-bold neon-text text-primary">
            {String(b.value).padStart(2, '0')}
          </div>
          <div className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground mt-1 font-display">
            {b.label}
          </div>
        </div>
      ))}
    </div>
  );
}
