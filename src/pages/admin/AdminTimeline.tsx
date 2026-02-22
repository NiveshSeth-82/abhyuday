import { useState } from 'react';
import { useData, type TimelineItem } from '@/contexts/DataContext';
import { Trash2, Edit2, Plus } from 'lucide-react';

const empty: TimelineItem = { id: '', day: '', title: '', time: '', description: '' };

export default function AdminTimeline() {
  const { timeline, setTimeline } = useData();
  const [editing, setEditing] = useState<TimelineItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<TimelineItem>({ ...empty });

  const handleAdd = () => { setForm({ ...empty, id: Date.now().toString() }); setEditing(null); setShowForm(true); };
  const handleEdit = (t: TimelineItem) => { setForm({ ...t }); setEditing(t); setShowForm(true); };
  const handleDelete = (id: string) => { if (confirm('Delete?')) setTimeline(timeline.filter(t => t.id !== id)); };
  const handleSave = () => {
    if (editing) setTimeline(timeline.map(t => t.id === form.id ? form : t));
    else setTimeline([...timeline, form]);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold gradient-text">Timeline</h1>
        <button onClick={handleAdd} className="glow-btn !text-xs flex items-center gap-2"><Plus size={16} /> Add</button>
      </div>

      {showForm && (
        <div className="glass-card p-6 mb-6 max-w-lg space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs text-muted-foreground">Day</label><input value={form.day} onChange={e => setForm({ ...form, day: e.target.value })} placeholder="Day 1" className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary text-sm" /></div>
            <div><label className="text-xs text-muted-foreground">Time</label><input value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary text-sm" /></div>
          </div>
          <div><label className="text-xs text-muted-foreground">Title</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary text-sm" /></div>
          <div><label className="text-xs text-muted-foreground">Description</label><input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary text-sm" /></div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="glow-btn !text-xs">Save</button>
            <button onClick={() => setShowForm(false)} className="glow-btn-outline !text-xs">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {timeline.map((t) => (
          <div key={t.id} className="glass-card p-4 flex items-center justify-between">
            <div>
              <p className="text-foreground font-medium">{t.title}</p>
              <p className="text-xs text-muted-foreground">{t.day} • {t.time}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(t)} className="text-muted-foreground hover:text-primary"><Edit2 size={16} /></button>
              <button onClick={() => handleDelete(t.id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
