import { useState } from 'react';
import { useData, type Sponsor } from '@/contexts/DataContext';
import { Trash2, Edit2, Plus } from 'lucide-react';

const empty: Sponsor = { id: '', name: '', logo: '', category: 'silver', link: '' };

export default function AdminSponsors() {
  const { sponsors, setSponsors } = useData();
  const [editing, setEditing] = useState<Sponsor | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Sponsor>({ ...empty });

  const handleAdd = () => { setForm({ ...empty, id: Date.now().toString() }); setEditing(null); setShowForm(true); };
  const handleEdit = (s: Sponsor) => { setForm({ ...s }); setEditing(s); setShowForm(true); };
  const handleDelete = (id: string) => { if (confirm('Delete?')) setSponsors(sponsors.filter(s => s.id !== id)); };
  const handleSave = () => {
    if (editing) setSponsors(sponsors.map(s => s.id === form.id ? form : s));
    else setSponsors([...sponsors, form]);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold gradient-text">Sponsors</h1>
        <button onClick={handleAdd} className="glow-btn !text-xs flex items-center gap-2"><Plus size={16} /> Add</button>
      </div>

      {showForm && (
        <div className="glass-card p-6 mb-6 max-w-lg space-y-3">
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary text-sm" />
          <input value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} placeholder="Website URL" className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary text-sm" />
          <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value as 'title' | 'gold' | 'silver' })}
            className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary text-sm">
            <option value="title">Title Sponsor</option>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
          </select>
          <div className="flex gap-2">
            <button onClick={handleSave} className="glow-btn !text-xs">Save</button>
            <button onClick={() => setShowForm(false)} className="glow-btn-outline !text-xs">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {sponsors.map((s) => (
          <div key={s.id} className="glass-card p-4 flex items-center justify-between">
            <div>
              <p className="text-foreground font-medium">{s.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{s.category}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(s)} className="text-muted-foreground hover:text-primary"><Edit2 size={16} /></button>
              <button onClick={() => handleDelete(s.id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
