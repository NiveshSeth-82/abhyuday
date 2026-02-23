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
  collegeName: "Ashoka Institute of Technology & Management, Varanasi",
  festName: "ABHYUDAY'26",
  tagline: "Annual Techno-Cultural Fest",
  logo: "",
  heroText: "Abhyuday'26",
  heroSubtext: "Where Innovation Meets Culture — The Biggest Techno-Cultural Fest",
  festDate: "2026-02-23T09:00:00+05:30",
  contactAddress: "Ashoka Engineering Chauraha, Paharia Rd, Sarnath, Varanasi, Uttar Pradesh 221007",
  contactEmail: "abhyuday@ashokainstitute.com",
  contactPhone: "+91 9277149879",
  socialLinks: { instagram: "#", facebook: "#", twitter: "#", youtube: "#" },
  mapEmbed: "",
};

const defaultDepartments: Department[] = generatedDepartments as Department[];

const defaultEvents: EventItem[] = generatedEvents as EventItem[];

const defaultCoordinators: Coordinator[] = [
  { id: "c1", name: "Pankaj Srivastava", photo: "/coordinators/pankaj-srivastava.png", role: "Faculty", phone: "+91 94551 06460", email: "", department: "Computer Science", social: {} },
  { id: "c2", name: "Er. Arvind Kumar", photo: "", role: "Faculty", phone: "+91 831 706 6128", email: "", department: "Computer Science", social: {} },
  { id: "c3", name: "Dr. Sharmila Singh", photo: "/coordinators/sharmila-singh.jpg", role: "Faculty", phone: "+91 831 706 6128", email: "", department: "MBA", social: {} },
  { id: "c4", name: "Aditya Dubey", photo: "/coordinators/aditya-dubey.png", role: "Student Coordinator", phone: "+91 89320 56388", email: "", department: "Computer Science", social: {} },
  { id: "c5", name: "Diwakar Patel", photo: "", role: "Student Coordinator", phone: "+91 92355 08350", email: "", department: "Computer Science", social: {} },
  { id: "c6", name: "Sobrat Dayal", photo: "/coordinators/sobrat-dayal.png", role: "Student Coordinator", phone: "+91 95656 76988", email: "", department: "Computer Science", social: {} },
];

const defaultTimeline: TimelineItem[] = [
  // ===== Day 1 — 25 Feb 2026 =====
  { id: "t1", day: "Day 1 — 25 Feb", title: "Opening Ceremony & Inauguration", time: "9:00 AM", description: "Grand inauguration of Abhyuday'26 with chief guests and dignitaries" },
  { id: "t2", day: "Day 1 — 25 Feb", title: "Vibe Coding | Code Master", time: "10:00 AM", description: "CS Cipher kicks off with coding challenges at Lab 1" },
  { id: "t3", day: "Day 1 — 25 Feb", title: "Robo Soccer | Velocity Vertices (Rubik's Cube)", time: "10:00 AM", description: "Robotics events at D Block & Rubik's Cube at G-5" },
  { id: "t4", day: "Day 1 — 25 Feb", title: "Intellect Fusion | Debate Charades", time: "10:30 AM", description: "Mind games at G-1 and debates at G-3 by CS Cipher" },
  { id: "t5", day: "Day 1 — 25 Feb", title: "Pharma Health Camp & Herbal Shots", time: "10:00 AM", description: "Pharma events — health camp, herbal preparations, and more" },
  { id: "t6", day: "Day 1 — 25 Feb", title: "EE Vidyutam & ECE Digital Dusk Events", time: "10:00 AM", description: "Maze challenges, circuit art, robo race & project exhibitions" },
  { id: "t7", day: "Day 1 — 25 Feb", title: "ME Yantrika — Junk Yard & CAD", time: "10:00 AM", description: "Mechanical events — junk yard creation, CAD design contests" },
  { id: "t8", day: "Day 1 — 25 Feb", title: "Civil Symposium — Paper Tower & AutoCAD", time: "10:00 AM", description: "Civil engineering challenges — paper tower, water supply & AutoCAD" },
  { id: "t9", day: "Day 1 — 25 Feb", title: "Nitro Race | Robo Tug of War", time: "12:30 PM", description: "RC car racing at Central Ground & robot tug of war at D Block" },
  { id: "t10", day: "Day 1 — 25 Feb", title: "BT Spark — Fun Games & Lab Experiments", time: "10:00 AM", description: "Biotechnology events — lab experiments, carrom, slow cycling & more" },

  // ===== Day 2 — 26 Feb 2026 =====
  { id: "t11", day: "Day 2 — 26 Feb", title: "Nexus 2026 — Tech Quiz", time: "9:30 AM", description: "CS Cipher's ultimate tech quiz at Lab 1" },
  { id: "t12", day: "Day 2 — 26 Feb", title: "BGMI / Free Fire Tournament", time: "11:30 AM", description: "Mobile gaming battles at G7 & G8" },
  { id: "t13", day: "Day 2 — 26 Feb", title: "The Escape Room", time: "10:30 AM", description: "Puzzle-solving room challenge at G-2 — duo teams only" },
  { id: "t14", day: "Day 2 — 26 Feb", title: "The Horcrux Hunt", time: "11:30 AM", description: "Campus-wide treasure hunt — teams of 4" },
  { id: "t15", day: "Day 2 — 26 Feb", title: "Code Master — Round 2", time: "1:00 PM", description: "Advanced coding challenge in C and Java at Lab 1" },
  { id: "t16", day: "Day 2 — 26 Feb", title: "Pharma Quiz & Expo", time: "10:00 AM", description: "Pharmacy department quiz competition and expo" },
  { id: "t17", day: "Day 2 — 26 Feb", title: "ASB Events — Shark Tank & Cooking", time: "10:00 AM", description: "Business pitches, cooking competition & reel-making at ASB" },
  { id: "t18", day: "Day 2 — 26 Feb", title: "Management Ensemble Events", time: "10:00 AM", description: "Business plan pitches, GD competitions & poster gallery" },

  // ===== Day 3 — 27 Feb 2026 =====
  { id: "t19", day: "Day 3 — 27 Feb", title: "Panel Samvad — Panel Discussion", time: "10:30 AM", description: "Literary discussion panel at Seminar Hall 1" },
  { id: "t20", day: "Day 3 — 27 Feb", title: "Nari Talks — Women's Empowerment", time: "11:40 AM", description: "Talks on financial independence for women at Seminar Hall 1" },
  { id: "t21", day: "Day 3 — 27 Feb", title: "Declamation — Rise of Virtual Influencers", time: "12:30 PM", description: "Speech competition at Seminar Hall 1" },
  { id: "t22", day: "Day 3 — 27 Feb", title: "Lafz & Layer — Poetry (Kavita Sangrah)", time: "2:00 PM", description: "Poetry and spoken word at Seminar Hall 1" },
  { id: "t23", day: "Day 3 — 27 Feb", title: "Fine Art Kalakriti — Sketching, Quilling, Henna", time: "10:00 AM", description: "Art events — sketching, quilling art, henna design & comic strip at G-7" },
  { id: "t24", day: "Day 3 — 27 Feb", title: "Cultural Rangmanch — Solo & Duet Dance", time: "12:00 PM", description: "Solo dance, duet dance & singing competitions at New Seminar Hall" },
  { id: "t25", day: "Day 3 — 27 Feb", title: "Style Spectrum — Fashion Show", time: "3:00 PM", description: "Grand fashion show at New Seminar Hall" },
  { id: "t26", day: "Day 3 — 27 Feb", title: "Hasna Mana Hai — Stand-Up Comedy", time: "4:00 PM", description: "Comedy performances at Buddha Hall" },
  { id: "t27", day: "Day 3 — 27 Feb", title: "Closing Ceremony & Prize Distribution", time: "6:00 PM", description: "Grand finale — awards, felicitation & celebrations" },
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

// Bump this version whenever code defaults change to flush stale localStorage
const DATA_VERSION = "v4";

// One-time migration: clear stale data when code version changes
const ALL_KEYS = [
  'abhyuday_settings', 'abhyuday_departments', 'abhyuday_events',
  'abhyuday_coordinators', 'abhyuday_timeline', 'abhyuday_sponsors',
  'abhyuday_gallery', 'abhyuday_features',
];
if (localStorage.getItem('abhyuday_data_version') !== DATA_VERSION) {
  ALL_KEYS.forEach(k => localStorage.removeItem(k));
  localStorage.setItem('abhyuday_data_version', DATA_VERSION);
}

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
