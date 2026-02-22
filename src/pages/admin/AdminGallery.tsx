import { useState } from 'react';
import { useData, type GalleryItem } from '@/contexts/DataContext';
import { Trash2, Plus } from 'lucide-react';

export default function AdminGallery() {
  const { gallery, setGallery } = useData();
  const [showForm, setShowForm] = useState(false);
  const [url, setUrl] = useState('');
  const [caption, setCaption] = useState('');

  const handleAdd = () => {
    if (!url) return;
    setGallery([...gallery, { id: Date.now().toString(), url, type: 'image', caption }]);
    setUrl(''); setCaption(''); setShowForm(false);
  };

  const handleDelete = (id: string) => { if (confirm('Delete?')) setGallery(gallery.filter(g => g.id !== id)); };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold gradient-text">Gallery</h1>
        <button onClick={() => setShowForm(!showForm)} className="glow-btn !text-xs flex items-center gap-2"><Plus size={16} /> Add</button>
      </div>

      {showForm && (
        <div className="glass-card p-6 mb-6 max-w-lg space-y-3">
          <input value={url} onChange={e => setUrl(e.target.value)} placeholder="Image URL" className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary text-sm" />
          <input value={caption} onChange={e => setCaption(e.target.value)} placeholder="Caption" className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary text-sm" />
          <button onClick={handleAdd} className="glow-btn !text-xs">Add Image</button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gallery.map((g) => (
          <div key={g.id} className="glass-card overflow-hidden relative group">
            <img src={g.url} alt={g.caption} className="w-full h-32 object-cover" />
            <button onClick={() => handleDelete(g.id)} className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        {gallery.length === 0 && <p className="text-muted-foreground col-span-4 text-center py-8">No gallery items yet.</p>}
      </div>
    </div>
  );
}
