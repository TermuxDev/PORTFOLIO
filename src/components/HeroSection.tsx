import { useState, useEffect } from 'react';
import { Code, Cpu, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroPortrait from '@/assets/hero-portrait.jpg';

/**
 * Section d'accueil / Hero
 * Style : Grande section avec photo, présentation et "vie active"
 * 
 * Pour personnaliser :
 * - Modifiez les variables nom, role, phraseAccroche
 * - Ajoutez/supprimez des éléments dans vieActive
 * - Changez l'image en remplaçant heroPortrait
 */

// Configuration du contenu (facile à modifier)
const nom = "Diomandé Keuwe Mickael";
const role = "Étudiant en Génie Logiciel";
const phraseAccroche = "Explorer, apprendre et construire le futur numérique ensemble.";

const vieActive = [
  {
    icon: Code,
    titre: "Hackathons & Compétitions",
    description: "Participation active aux événements tech"
  },
  {
    icon: Users,
    titre: "Clubs & Associations",
    description: "Membre d'association de développeurs et techs"
  },
  {
    icon: Cpu,
    titre: "Projets Open Source",
    description: "Contributeur à divers projets open source"
  },
  {
    icon: Shield,
    titre: "Veille Technologique",
    description: "en veille constante sur les nouvelles technologies"
  }
];

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);

  // Animation d'apparition au chargement
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Effet de typing pour la phrase d'accroche
  useEffect(() => {
    if (textIndex < phraseAccroche.length) {
      const timeout = setTimeout(() => {
        setCurrentText(phraseAccroche.slice(0, textIndex + 1));
        setTextIndex(textIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [textIndex]);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const element = document.querySelector('#projets');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="accueil" className="min-h-screen flex items-center relative bg-gradient-hero">
      {/* Éléments décoratifs subtils */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-2xl animate-float-subtle"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/15 rounded-full blur-2xl animate-float-subtle" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Contenu principal */}
          <div className={`space-y-6 lg:space-y-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Nom et rôle */}
            <div className="space-y-3 lg:space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-tight">
                {nom}
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground font-medium">
                {role}
              </p>
            </div>

            {/* Phrase d'accroche avec effet typing */}
            <div className="space-y-6">
              <div className="h-12 sm:h-16 flex items-center">
                <p className="text-base sm:text-lg lg:text-xl text-foreground font-medium leading-relaxed">
                  {currentText}
                  <span className="animate-blink border-r-2 border-primary ml-1"></span>
                </p>
              </div>

              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button 
                  onClick={scrollToProjects}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 sm:px-8 py-3 transition-all duration-200 shadow-elegant hover:shadow-glow focus-outline"
                >
                  Voir mes projets
                </Button>
                <Button 
                  variant="outline" 
                  onClick={scrollToContact}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 sm:px-8 py-3 transition-all duration-200 focus-outline"
                >
                  Me contacter
                </Button>
              </div>
            </div>
          </div>

          {/* Photo et éléments visuels */}
          <div className={`flex justify-center lg:justify-end transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 relative">
                {/* Cercle subtil autour de la photo */}
                <div className="absolute inset-0 bg-gradient-secondary rounded-full blur-lg opacity-20 animate-pulse-soft"></div>
                
                {/* Photo principale */}
                <img 
                  src={heroPortrait} 
                  alt="Portrait professionnel de Diomandé Keuwe Mickael, étudiant en Génie Logiciel"
                  className="relative z-10 w-full h-full object-cover rounded-full border-2 border-border shadow-elegant"
                />

                {/* Élément décoratif minimaliste */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full animate-pulse-soft"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Section "Vie Active" */}
        <div className={`mt-16 lg:mt-20 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-2xl lg:text-3xl font-bold text-center mb-8 lg:mb-12 text-primary">
            Ma Vie Active
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {vieActive.map((item, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-lg p-4 lg:p-6 hover:bg-accent/50 transition-all duration-200 hover:shadow-soft group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-center space-y-3 lg:space-y-4">
                  <div className="p-2 lg:p-3 bg-primary/10 rounded-lg group-hover:bg-primary/15 transition-colors">
                    <item.icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground text-sm lg:text-base">{item.titre}</h4>
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}