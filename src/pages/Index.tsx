import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturesSection from '@/components/FeaturesSection';
import DepartmentsSection from '@/components/DepartmentsSection';
import TimelineSection from '@/components/TimelineSection';
import CoordinatorsSection from '@/components/CoordinatorsSection';
import GallerySection from '@/components/GallerySection';
import SponsorsSection from '@/components/SponsorsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import ScrollProgress from '@/components/ScrollProgress';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <ParticleBackground />
      <Navbar />
      <Hero />
      <FeaturesSection />
      <DepartmentsSection />
      <TimelineSection />
      <CoordinatorsSection />
      <GallerySection />
      {/* <SponsorsSection /> */}
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
