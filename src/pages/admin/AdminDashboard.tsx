import { useData } from '@/contexts/DataContext';

export default function AdminDashboard() {
  const { events, departments, coordinators, sponsors, timeline, gallery } = useData();

  const stats = [
    { label: 'Departments', value: departments.length, icon: '🏛️' },
    { label: 'Events', value: events.length, icon: '🎪' },
    { label: 'Active Events', value: events.filter(e => e.status === 'active').length, icon: '✅' },
    { label: 'Coordinators', value: coordinators.length, icon: '👥' },
    { label: 'Timeline Items', value: timeline.length, icon: '⏳' },
    { label: 'Sponsors', value: sponsors.length, icon: '🤝' },
    { label: 'Gallery Items', value: gallery.length, icon: '🖼️' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-display font-bold gradient-text mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="glass-card p-5">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-3xl font-display font-bold text-primary">{s.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
