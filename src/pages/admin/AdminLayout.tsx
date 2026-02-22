import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LayoutDashboard, Calendar, Users, Image, Handshake, Settings, Clock, LogOut, Home, FolderOpen } from 'lucide-react';

const sidebarLinks = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
  { to: '/admin/departments', icon: FolderOpen, label: 'Departments' },
  { to: '/admin/events', icon: Calendar, label: 'Events' },
  { to: '/admin/coordinators', icon: Users, label: 'Coordinators' },
  { to: '/admin/timeline', icon: Clock, label: 'Timeline' },
  { to: '/admin/gallery', icon: Image, label: 'Gallery' },
  { to: '/admin/sponsors', icon: Handshake, label: 'Sponsors' },
];

export default function AdminLayout() {
  const { isAdmin, logout } = useAuth();
  const location = useLocation();

  if (!isAdmin) return <Navigate to="/admin" replace />;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-60 border-r border-border bg-card/50 backdrop-blur-xl hidden md:flex flex-col">
        <div className="p-6 border-b border-border">
          <h2 className="font-display font-bold gradient-text text-sm tracking-wider">ABHYUDAY'26</h2>
          <p className="text-xs text-muted-foreground mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {sidebarLinks.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                location.pathname === to
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-border space-y-1">
          <Link to="/" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50">
            <Home size={18} /> View Site
          </Link>
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-b border-border p-3 flex items-center justify-between">
        <span className="font-display font-bold gradient-text text-sm">Admin</span>
        <div className="flex gap-2 overflow-x-auto">
          {sidebarLinks.map(({ to, icon: Icon }) => (
            <Link key={to} to={to} className={`p-2 rounded-lg ${location.pathname === to ? 'text-primary bg-primary/10' : 'text-muted-foreground'}`}>
              <Icon size={18} />
            </Link>
          ))}
          <button onClick={logout} className="p-2 text-destructive"><LogOut size={18} /></button>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 p-6 md:p-8 overflow-auto md:max-h-screen mt-14 md:mt-0">
        <Outlet />
      </main>
    </div>
  );
}
