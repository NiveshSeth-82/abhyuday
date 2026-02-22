import { useState } from 'react';
import { useData, type SiteSettings } from '@/contexts/DataContext';

export default function AdminSettings() {
  const { settings, updateSettings } = useData();
  const [form, setForm] = useState<SiteSettings>({ ...settings });

  const handleSave = () => {
    updateSettings(form);
    alert('Settings saved!');
  };

  const field = (label: string, key: keyof SiteSettings, type = 'text') => (
    <div key={key}>
      <label className="text-sm text-muted-foreground block mb-1">{label}</label>
      <input
        type={type}
        value={form[key] as string}
        onChange={e => setForm({ ...form, [key]: e.target.value })}
        className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-primary transition-colors text-sm"
      />
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold gradient-text">Site Settings</h1>
        <button onClick={handleSave} className="glow-btn !text-xs">Save Changes</button>
      </div>
      <div className="glass-card p-6 space-y-4 max-w-2xl">
        {field('College Name', 'collegeName')}
        {field('Fest Name', 'festName')}
        {field('Tagline', 'tagline')}
        {field('Hero Text', 'heroText')}
        {field('Hero Subtext', 'heroSubtext')}
        {field('Fest Date (for countdown)', 'festDate', 'datetime-local')}
        {field('Contact Address', 'contactAddress')}
        {field('Contact Email', 'contactEmail')}
        {field('Contact Phone', 'contactPhone')}
      </div>
    </div>
  );
}
