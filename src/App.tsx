import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "./contexts/DataContext";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DepartmentEvents from "./pages/DepartmentEvents";
import EventDetails from "./pages/EventDetails";
import AdminLogin from "./pages/AdminLogin";
import SearchPage from "./pages/SearchPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminDepartments from "./pages/admin/AdminDepartments";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminCoordinators from "./pages/admin/AdminCoordinators";
import AdminTimeline from "./pages/admin/AdminTimeline";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminSponsors from "./pages/admin/AdminSponsors";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DataProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/department/:id" element={<DepartmentEvents />} />
              <Route path="/event/:id" element={<EventDetails />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="departments" element={<AdminDepartments />} />
                <Route path="events" element={<AdminEvents />} />
                <Route path="coordinators" element={<AdminCoordinators />} />
                <Route path="timeline" element={<AdminTimeline />} />
                <Route path="gallery" element={<AdminGallery />} />
                <Route path="sponsors" element={<AdminSponsors />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </DataProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
