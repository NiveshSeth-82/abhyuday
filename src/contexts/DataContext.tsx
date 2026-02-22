import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Department {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface EventItem {
  id: string;
  name: string;
  departmentId: string;
  description: string;
  rules: string;
  eligibility: string;
  teamSize: string;
  venue: string;
  date: string;
  time: string;
  prize: string;
  googleFormLink: string;
  bannerImage: string;
  coordinators: { name: string; phone: string; email: string }[];
  status: 'active' | 'inactive';
}

export interface Coordinator {
  id: string;
  name: string;
  photo: string;
  role: string;
  phone: string;
  email: string;
  department: string;
  social?: { linkedin?: string; instagram?: string };
}

export interface TimelineItem {
  id: string;
  day: string;
  title: string;
  time: string;
  description: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  category: 'title' | 'gold' | 'silver';
  link: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  caption: string;
}

export interface Feature {
  id: string;
  title: string;
  value: string;
  icon: string;
}

export interface SiteSettings {
  collegeName: string;
  festName: string;
  tagline: string;
  logo: string;
  heroText: string;
  heroSubtext: string;
  festDate: string;
  contactAddress: string;
  contactEmail: string;
  contactPhone: string;
  socialLinks: { instagram?: string; facebook?: string; twitter?: string; youtube?: string; linkedin?: string };
  mapEmbed: string;
}

interface DataContextType {
  settings: SiteSettings;
  departments: Department[];
  events: EventItem[];
  coordinators: Coordinator[];
  timeline: TimelineItem[];
  sponsors: Sponsor[];
  gallery: GalleryItem[];
  features: Feature[];
  updateSettings: (s: SiteSettings) => void;
  setDepartments: (d: Department[]) => void;
  setEvents: (e: EventItem[]) => void;
  setCoordinators: (c: Coordinator[]) => void;
  setTimeline: (t: TimelineItem[]) => void;
  setSponsors: (s: Sponsor[]) => void;
  setGallery: (g: GalleryItem[]) => void;
  setFeatures: (f: Feature[]) => void;
}

const defaultSettings: SiteSettings = {
  collegeName: "National Institute of Technology",
  festName: "ABHYUDAY'26",
  tagline: "Annual Techno-Cultural Fest",
  logo: "",
  heroText: "ABHYUDAY'26",
  heroSubtext: "Where Innovation Meets Culture — The Biggest Techno-Cultural Fest",
  festDate: "2026-03-15T09:00:00",
  contactAddress: "NIT Campus, Technology Road, Innovation City - 123456",
  contactEmail: "contact@abhyuday.com",
  contactPhone: "+91 98765 43210",
  socialLinks: { instagram: "#", facebook: "#", twitter: "#", youtube: "#" },
  mapEmbed: "",
};

const defaultDepartments: Department[] = [
  { id: "1", name: "Computer Science", image: "💻", description: "Coding challenges, hackathons, and AI competitions" },
  { id: "2", name: "Mechanical", image: "⚙️", description: "Robotics, CAD design, and engineering marvels" },
  { id: "3", name: "Electrical", image: "⚡", description: "Circuit design, IoT projects, and power systems" },
  { id: "4", name: "Civil", image: "🏗️", description: "Bridge building, structural analysis, and design" },
  { id: "5", name: "Management", image: "📊", description: "Business plans, case studies, and strategy" },
  { id: "6", name: "Cultural", image: "🎭", description: "Dance, music, drama, and artistic expression" },
  { id: "7", name: "Robotics", image: "🤖", description: "Bot wars, line followers, and autonomous bots" },
  { id: "8", name: "Gaming", image: "🎮", description: "Esports tournaments and gaming challenges" },
  { id: "9", name: "Open Events", image: "🌟", description: "Events open to all — no department restrictions" },
];

const defaultEvents: EventItem[] = [
  { id: "e1", name: "Code Clash", departmentId: "1", description: "Ultimate competitive programming contest. Solve algorithmic puzzles under pressure.", rules: "Individual participation. No external help. 3 hours duration.", eligibility: "All college students", teamSize: "1", venue: "CS Lab 1", date: "2026-03-15", time: "10:00 AM", prize: "₹25,000", googleFormLink: "#", bannerImage: "", coordinators: [{ name: "Rahul Kumar", phone: "+91 99999 11111", email: "rahul@abhyuday.com" }], status: "active" },
  { id: "e2", name: "Hackathon 36", departmentId: "1", description: "36-hour hackathon. Build solutions to real-world problems.", rules: "Team of 2-4. Bring your own laptop.", eligibility: "All college students", teamSize: "2-4", venue: "Innovation Hub", date: "2026-03-15", time: "6:00 PM", prize: "₹50,000", googleFormLink: "#", bannerImage: "", coordinators: [{ name: "Priya Singh", phone: "+91 99999 22222", email: "priya@abhyuday.com" }], status: "active" },
  { id: "e3", name: "RoboWars", departmentId: "7", description: "Battle your robots in the arena! Last bot standing wins.", rules: "Max weight 15kg. No projectile weapons.", eligibility: "Engineering students", teamSize: "2-5", venue: "Main Ground", date: "2026-03-16", time: "2:00 PM", prize: "₹40,000", googleFormLink: "#", bannerImage: "", coordinators: [{ name: "Amit Verma", phone: "+91 99999 33333", email: "amit@abhyuday.com" }], status: "active" },
  { id: "e4", name: "Dance Off", departmentId: "6", description: "Solo and group dance competition across genres.", rules: "Time limit 5 mins solo, 8 mins group.", eligibility: "All students", teamSize: "1-8", venue: "Main Auditorium", date: "2026-03-16", time: "6:00 PM", prize: "₹30,000", googleFormLink: "#", bannerImage: "", coordinators: [{ name: "Neha Sharma", phone: "+91 99999 44444", email: "neha@abhyuday.com" }], status: "active" },
  { id: "e5", name: "Valorant Tournament", departmentId: "8", description: "5v5 Valorant esports tournament.", rules: "Standard competitive rules. Bo3 format.", eligibility: "All students", teamSize: "5", venue: "Gaming Arena", date: "2026-03-15", time: "11:00 AM", prize: "₹20,000", googleFormLink: "#", bannerImage: "", coordinators: [{ name: "Karan Patel", phone: "+91 99999 55555", email: "karan@abhyuday.com" }], status: "active" },
  { id: "e6", name: "Bridge It", departmentId: "4", description: "Design and build the strongest bridge from given materials.", rules: "Materials provided. Max load test.", eligibility: "Civil & Mechanical", teamSize: "2-3", venue: "Civil Lab", date: "2026-03-16", time: "10:00 AM", prize: "₹15,000", googleFormLink: "#", bannerImage: "", coordinators: [{ name: "Sanjay Gupta", phone: "+91 99999 66666", email: "sanjay@abhyuday.com" }], status: "active" },
  { id: "e7", name: "Business Plan", departmentId: "5", description: "Present your business idea to a panel of investors.", rules: "10 min pitch + 5 min Q&A.", eligibility: "All students", teamSize: "2-4", venue: "Seminar Hall", date: "2026-03-15", time: "1:00 PM", prize: "₹35,000", googleFormLink: "#", bannerImage: "", coordinators: [{ name: "Sneha Reddy", phone: "+91 99999 77777", email: "sneha@abhyuday.com" }], status: "active" },
  { id: "e8", name: "Circuit Wizard", departmentId: "3", description: "Design and debug circuits in a timed challenge.", rules: "Components provided. Individual event.", eligibility: "EE & ECE students", teamSize: "1", venue: "EE Lab", date: "2026-03-16", time: "11:00 AM", prize: "₹15,000", googleFormLink: "#", bannerImage: "", coordinators: [{ name: "Deepak Joshi", phone: "+91 99999 88888", email: "deepak@abhyuday.com" }], status: "active" },
];

const defaultCoordinators: Coordinator[] = [
  { id: "c1", name: "Dr. Rajesh Sharma", photo: "", role: "Faculty Advisor", phone: "+91 98765 00001", email: "rajesh@nit.edu", department: "Management", social: {} },
  { id: "c2", name: "Arjun Mehta", photo: "", role: "Overall Coordinator", phone: "+91 98765 00002", email: "arjun@abhyuday.com", department: "Computer Science", social: { linkedin: "#" } },
  { id: "c3", name: "Kavya Nair", photo: "", role: "Cultural Secretary", phone: "+91 98765 00003", email: "kavya@abhyuday.com", department: "Cultural", social: { instagram: "#" } },
  { id: "c4", name: "Vikram Singh", photo: "", role: "Technical Head", phone: "+91 98765 00004", email: "vikram@abhyuday.com", department: "Computer Science", social: {} },
  { id: "c5", name: "Riya Patel", photo: "", role: "Sponsorship Head", phone: "+91 98765 00005", email: "riya@abhyuday.com", department: "Management", social: {} },
  { id: "c6", name: "Aditya Kumar", photo: "", role: "Event Manager", phone: "+91 98765 00006", email: "aditya@abhyuday.com", department: "Mechanical", social: {} },
];

const defaultTimeline: TimelineItem[] = [
  { id: "t1", day: "Day 1", title: "Opening Ceremony", time: "9:00 AM", description: "Grand inauguration with chief guest" },
  { id: "t2", day: "Day 1", title: "Technical Events Begin", time: "10:30 AM", description: "Hackathon, Code Clash, Circuit Wizard kick off" },
  { id: "t3", day: "Day 1", title: "Business Plan Pitch", time: "1:00 PM", description: "Aspiring entrepreneurs pitch their ideas" },
  { id: "t4", day: "Day 1", title: "Gaming Arena Opens", time: "3:00 PM", description: "Esports tournaments begin" },
  { id: "t5", day: "Day 2", title: "RoboWars", time: "10:00 AM", description: "The epic robot battle arena" },
  { id: "t6", day: "Day 2", title: "Cultural Performances", time: "4:00 PM", description: "Dance, music, and drama" },
  { id: "t7", day: "Day 2", title: "Prize Distribution", time: "7:00 PM", description: "Award ceremony and felicitation" },
  { id: "t8", day: "Day 2", title: "Closing Ceremony", time: "8:30 PM", description: "Grand finale and DJ night" },
];

const defaultSponsors: Sponsor[] = [
  { id: "s1", name: "TechCorp", logo: "", category: "title", link: "#" },
  { id: "s2", name: "InnoVentures", logo: "", category: "gold", link: "#" },
  { id: "s3", name: "CodeBase Inc", logo: "", category: "gold", link: "#" },
  { id: "s4", name: "Digital Solutions", logo: "", category: "silver", link: "#" },
  { id: "s5", name: "StartUp Hub", logo: "", category: "silver", link: "#" },
];

const defaultFeatures: Feature[] = [
  { id: "f1", title: "Events", value: "25+", icon: "🎪" },
  { id: "f2", title: "Prize Pool", value: "₹5L+", icon: "🏆" },
  { id: "f3", title: "Workshops", value: "10+", icon: "🔧" },
  { id: "f4", title: "Participants", value: "2000+", icon: "👥" },
  { id: "f5", title: "Departments", value: "9+", icon: "🏛️" },
  { id: "f6", title: "Days", value: "2", icon: "📅" },
];

const DataContext = createContext<DataContextType | undefined>(undefined);

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch { return fallback; }
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(() => loadFromStorage('abhyuday_settings', defaultSettings));
  const [departments, setDepartments] = useState<Department[]>(() => loadFromStorage('abhyuday_departments', defaultDepartments));
  const [events, setEvents] = useState<EventItem[]>(() => loadFromStorage('abhyuday_events', defaultEvents));
  const [coordinators, setCoordinators] = useState<Coordinator[]>(() => loadFromStorage('abhyuday_coordinators', defaultCoordinators));
  const [timeline, setTimeline] = useState<TimelineItem[]>(() => loadFromStorage('abhyuday_timeline', defaultTimeline));
  const [sponsors, setSponsors] = useState<Sponsor[]>(() => loadFromStorage('abhyuday_sponsors', defaultSponsors));
  const [gallery, setGallery] = useState<GalleryItem[]>(() => loadFromStorage('abhyuday_gallery', []));
  const [features, setFeatures] = useState<Feature[]>(() => loadFromStorage('abhyuday_features', defaultFeatures));

  useEffect(() => { localStorage.setItem('abhyuday_settings', JSON.stringify(settings)); }, [settings]);
  useEffect(() => { localStorage.setItem('abhyuday_departments', JSON.stringify(departments)); }, [departments]);
  useEffect(() => { localStorage.setItem('abhyuday_events', JSON.stringify(events)); }, [events]);
  useEffect(() => { localStorage.setItem('abhyuday_coordinators', JSON.stringify(coordinators)); }, [coordinators]);
  useEffect(() => { localStorage.setItem('abhyuday_timeline', JSON.stringify(timeline)); }, [timeline]);
  useEffect(() => { localStorage.setItem('abhyuday_sponsors', JSON.stringify(sponsors)); }, [sponsors]);
  useEffect(() => { localStorage.setItem('abhyuday_gallery', JSON.stringify(gallery)); }, [gallery]);
  useEffect(() => { localStorage.setItem('abhyuday_features', JSON.stringify(features)); }, [features]);

  return (
    <DataContext.Provider value={{
      settings, departments, events, coordinators, timeline, sponsors, gallery, features,
      updateSettings: setSettings, setDepartments, setEvents, setCoordinators,
      setTimeline, setSponsors, setGallery, setFeatures,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be inside DataProvider');
  return ctx;
}
