import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import CompetencesSection from '@/components/CompetencesSection';
import FormationsSection from '@/components/FormationsSection';
import ProjetsSection from '@/components/ProjetsSection';
import ContactSection from '@/components/ContactSection';

/**
 * Page principale du portfolio
 * 
 * Structure : Page unique avec navigation par ancres vers les différentes sections
 * Chaque section est un composant indépendant et modulaire
 * 
 * Pour modifier le contenu :
 * - Éditez directement chaque composant de section
 * - Les styles globaux sont définis dans index.css et tailwind.config.ts
 */

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation fixe */}
      <Navigation />
      
      {/* Sections principales du portfolio */}
      <main>
        <HeroSection />
        <CompetencesSection />
        <FormationsSection />
        <ProjetsSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
