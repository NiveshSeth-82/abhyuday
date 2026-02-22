import { useState } from 'react';
import { useData, type EventItem } from '@/contexts/DataContext';
import { Trash2, Edit2, Plus } from 'lucide-react';

const emptyEvent: EventItem = {
  id: '', name: '', departmentId: '', description: '', rules: '', eligibility: '',
  teamSize: '', venue: '', date: '', time: '', prize: '', googleFormLink: '',
  bannerImage: '', coordinators: [], status: 'active',
};

export default function AdminEvents() {
  const { events, setEvents, departments } = useData();
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<EventItem>({ ...emptyEvent });

  const handleAdd = () => { setForm({ ...emptyEvent, id: Date.now().toString() }); setEditing(null); setShowForm(true); };
  const handleEdit = (e: EventItem) => { setForm({ ...e }); setEditing(e); setShowForm(true); };
  const handleDelete = (id: string) => { if (confirm('Delete?')) setEvents(events.filter(e => e.id !== id)); };

  const handleSave = () => {
    if (editing) {
      setEvents(events.map(e => e.id === form.id ? form : e));
    } else {
      setEvents([...events, form]);
    }
    setShowForm(false);
  };

  const input = (label: string, key: keyof EventItem, type = 'text') => (
    <div>
      <label className="text-xs text-muted-foreground">{label}</label>
      <input type={type} value={form[key] as string} onChange={e => setForm({ ...form, [key]: e.target.value })}
        className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary text-sm" />
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold gradient-text">Events</h1>
        <button onClick={handleAdd} className="glow-btn !text-xs flex items-center gap-2"><Plus size={16} /> Add</button>
      </div>

      {showForm && (
        <div className="glass-card p-6 mb-6 max-w-2xl space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {input('Name', 'name')}
            <div>
              <label className="text-xs text-muted-foreground">Department</label>
              <select value={form.departmentId} onChange={e => setForm({ ...form, departmentId: e.target.value })}
                className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary text-sm">
                <option value="">Select</option>
                {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary text-sm resize-none" rows={3} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Rules</label>
            <textarea value={form.rules} onChange={e => setForm({ ...form, rules: e.target.value })}
              className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary text-sm resize-none" rows={2} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {input('Eligibility', 'eligibility')}
            {input('Team Size', 'teamSize')}
            {input('Venue', 'venue')}
            {input('Date', 'date', 'date')}
            {input('Time', 'time')}
            {input('Prize', 'prize')}
            {input('Google Form Link', 'googleFormLink', 'url')}
            {input('Banner Image URL', 'bannerImage', 'url')}
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Status</label>
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as 'active' | 'inactive' })}
              className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary text-sm">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="glow-btn !text-xs">Save</button>
            <button onClick={() => setShowForm(false)} className="glow-btn-outline !text-xs">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {events.map((e) => {
          const dept = departments.find(d => d.id === e.departmentId);
          return (
            <div key={e.id} className="glass-card p-4 flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">{e.name}</p>
                <p className="text-xs text-muted-foreground">{dept?.name} • {e.date} • {e.status}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(e)} className="text-muted-foreground hover:text-primary"><Edit2 size={16} /></button>
                <button onClick={() => handleDelete(e.id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
