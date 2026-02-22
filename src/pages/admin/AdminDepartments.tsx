import { useState } from 'react';
import { useData, type Department } from '@/contexts/DataContext';
import { Trash2, Edit2, Plus } from 'lucide-react';

export default function AdminDepartments() {
  const { departments, setDepartments } = useData();
  const [editing, setEditing] = useState<Department | null>(null);
  const [showForm, setShowForm] = useState(false);

  const emptyDept: Department = { id: '', name: '', image: '📁', description: '' };
  const [form, setForm] = useState<Department>({ ...emptyDept });

  const handleAdd = () => { setForm({ ...emptyDept, id: Date.now().toString() }); setEditing(null); setShowForm(true); };
  const handleEdit = (d: Department) => { setForm({ ...d }); setEditing(d); setShowForm(true); };
  const handleDelete = (id: string) => { if (confirm('Delete?')) setDepartments(departments.filter(d => d.id !== id)); };

  const handleSave = () => {
    if (editing) {
      setDepartments(departments.map(d => d.id === form.id ? form : d));
    } else {
      setDepartments([...departments, form]);
    }
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold gradient-text">Departments</h1>
        <button onClick={handleAdd} className="glow-btn !text-xs flex items-center gap-2"><Plus size={16} /> Add</button>
      </div>

      {showForm && (
        <div className="glass-card p-6 mb-6 max-w-lg space-y-3">
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-primary text-sm" />
          <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="Icon/Emoji" className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-primary text-sm" />
          <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-primary text-sm" />
          <div className="flex gap-2">
            <button onClick={handleSave} className="glow-btn !text-xs">Save</button>
            <button onClick={() => setShowForm(false)} className="glow-btn-outline !text-xs">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {departments.map((d) => (
          <div key={d.id} className="glass-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{d.image}</span>
              <div>
                <p className="text-foreground font-medium">{d.name}</p>
                <p className="text-xs text-muted-foreground">{d.description}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(d)} className="text-muted-foreground hover:text-primary"><Edit2 size={16} /></button>
              <button onClick={() => handleDelete(d.id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
