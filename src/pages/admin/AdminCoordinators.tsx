import { useState } from 'react';
import { useData, type Coordinator } from '@/contexts/DataContext';
import { Trash2, Edit2, Plus } from 'lucide-react';

const empty: Coordinator = { id: '', name: '', photo: '', role: '', phone: '', email: '', department: '', social: {} };

export default function AdminCoordinators() {
  const { coordinators, setCoordinators } = useData();
  const [editing, setEditing] = useState<Coordinator | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Coordinator>({ ...empty });

  const handleAdd = () => { setForm({ ...empty, id: Date.now().toString() }); setEditing(null); setShowForm(true); };
  const handleEdit = (c: Coordinator) => { setForm({ ...c }); setEditing(c); setShowForm(true); };
  const handleDelete = (id: string) => { if (confirm('Delete?')) setCoordinators(coordinators.filter(c => c.id !== id)); };

  const handleSave = () => {
    if (editing) setCoordinators(coordinators.map(c => c.id === form.id ? form : c));
    else setCoordinators([...coordinators, form]);
    setShowForm(false);
  };

  const input = (label: string, key: keyof Coordinator) => (
    <div>
      <label className="text-xs text-muted-foreground">{label}</label>
      <input value={form[key] as string} onChange={e => setForm({ ...form, [key]: e.target.value })}
        className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary text-sm" />
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold gradient-text">Coordinators</h1>
        <button onClick={handleAdd} className="glow-btn !text-xs flex items-center gap-2"><Plus size={16} /> Add</button>
      </div>

      {showForm && (
        <div className="glass-card p-6 mb-6 max-w-lg space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {input('Name', 'name')}
            {input('Role', 'role')}
            {input('Phone', 'phone')}
            {input('Email', 'email')}
            {input('Department', 'department')}
            {input('Photo URL', 'photo')}
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="glow-btn !text-xs">Save</button>
            <button onClick={() => setShowForm(false)} className="glow-btn-outline !text-xs">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {coordinators.map((c) => (
          <div key={c.id} className="glass-card p-4 flex items-center justify-between">
            <div>
              <p className="text-foreground font-medium">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.role} • {c.department}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(c)} className="text-muted-foreground hover:text-primary"><Edit2 size={16} /></button>
              <button onClick={() => handleDelete(c.id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
