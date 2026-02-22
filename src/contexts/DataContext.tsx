import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import generatedDepartments from '@/data/departments.json';
import generatedEvents from '@/data/events.json';

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
  heroText: "Abhyuday'26",
  heroSubtext: "Where Innovation Meets Culture — The Biggest Techno-Cultural Fest",
  festDate: "2026-02-23T09:00:00+05:30",
  contactAddress: "NIT Campus, Technology Road, Innovation City - 123456",
  contactEmail: "contact@abhyuday.com",
  contactPhone: "+91 98765 43210",
  socialLinks: { instagram: "#", facebook: "#", twitter: "#", youtube: "#" },
  mapEmbed: "",
};

const defaultDepartments: Department[] = generatedDepartments as Department[];

const defaultEvents: EventItem[] = generatedEvents as EventItem[];

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
  { id: "f2", title: "Prize Pool", value: "₹2L+", icon: "🏆" },
  { id: "f3", title: "Workshops", value: "10+", icon: "🔧" },
  { id: "f4", title: "Participants", value: "2000+", icon: "👥" },
  { id: "f5", title: "Departments", value: "9+", icon: "🏛️" },
  { id: "f6", title: "Days", value: "4", icon: "📅" },
];

const DataContext = createContext<DataContextType | undefined>(undefined);

// Keys that should always use code defaults (fed from JSON), not localStorage cache
const ALWAYS_USE_DEFAULTS = ['abhyuday_departments', 'abhyuday_events', 'abhyuday_gallery', 'abhyuday_settings'];

function loadFromStorage<T>(key: string, fallback: T): T {
  if (ALWAYS_USE_DEFAULTS.includes(key)) return fallback;
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
  const [gallery, setGallery] = useState<GalleryItem[]>(() => loadFromStorage('abhyuday_gallery', [
    { id: "g1", url: "https://abhyuday25-ashoka-webfest-hub.vercel.app/lovable-uploads/3b3daad0-67ce-4b63-b47a-9cf7b4b6aba7.png", type: "image" as const, caption: "Abhyuday'26 Highlights" },
    { id: "g2", url: "https://abhyuday25-ashoka-webfest-hub.vercel.app/lovable-uploads/6dbc8a9d-47ca-40ee-a1f6-0c66635c1e2c.png", type: "image" as const, caption: "Abhyuday'26 Moments" },
    { id: "g3", url: "https://abhyuday25-ashoka-webfest-hub.vercel.app/lovable-uploads/09ee8e0b-774d-4ac6-8b38-04c0edb37219.png", type: "image" as const, caption: "Abhyuday'26 Activities" },
    { id: "g4", url: "https://abhyuday25-ashoka-webfest-hub.vercel.app/lovable-uploads/7735f666-c401-440c-b49e-6990132240d3.png", type: "image" as const, caption: "Abhyuday'26 Events" },
    { id: "g5", url: "https://abhyuday25-ashoka-webfest-hub.vercel.app/lovable-uploads/676ab6da-9af7-45bd-b9b9-c7dfd6b97239.png", type: "image" as const, caption: "Abhyuday'26 Stage" },
    { id: "g6", url: "https://abhyuday25-ashoka-webfest-hub.vercel.app/lovable-uploads/954a3897-9dde-45a3-ad7d-cafdd7336f08.png", type: "image" as const, caption: "Abhyuday'26 Performance" },
    { id: "g7", url: "https://abhyuday25-ashoka-webfest-hub.vercel.app/lovable-uploads/c5f5a74a-d656-4d7b-8cbc-1ec166e7d33a.png", type: "image" as const, caption: "Abhyuday'26 Crowd" },
    { id: "g9", url: "https://abhyuday25-ashoka-webfest-hub.vercel.app/lovable-uploads/7e7bb29d-5fa6-4a99-ab86-eb9204a0e170.png", type: "image" as const, caption: "Abhyuday'26 Special" },
  ]));
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
