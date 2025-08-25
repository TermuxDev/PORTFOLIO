import { useState, useEffect, useRef } from 'react';
import { Code, Database, Shield, Settings, Layers, GitBranch } from 'lucide-react';

/**
 * Section Compétences avec barres de progression animées
 * Style : Cartes organisées par catégories avec animations
 * 
 * Pour modifier les compétences :
 * - Ajoutez/supprimez des objets dans les tableaux de chaque catégorie
 * - Modifiez les niveaux (0-100) pour ajuster les barres de progression
 * - Changez les icônes en important de nouvelles icônes Lucide
 */

// Configuration des compétences par catégorie
const competences = {
  langages: {
    titre: "Langages de Programmation",
    icone: Code,
    couleur: "primary",
    items: [
      { nom: "Python", niveau: 40, description: "Scripts, developpement web" },
      { nom: "PHP", niveau: 30, description: "Programmation backend web" },
      { nom: "JavaScript", niveau: 35, description: "Développement web , Script" },
      { nom: "SQL", niveau: 20, description: "Gestion et requêtes de bases de données" },
    ]
  },
  architectures: {
    titre: "Architectures Logicielles",
    icone: Layers,
    couleur: "secondary",
    items: [
      { nom: "MVC/MVP", niveau: 25, description: "Patterns de conception" },
      //{ nom: "Microservices", niveau: 65, description: "Architecture distribuée" },
      { nom: "API REST", niveau: 10, description: "Conception et consommation d'APIs" },
      //{ nom: "Clean Architecture", niveau: 70, description: "Principes SOLID" },
    ]
  },
  securite: {
    titre: "Sécurité Informatique",
    icone: Shield,
    couleur: "accent",
    items: [
      { nom: "Cryptographie", niveau: 20, description: "Chiffrement et hachage" },
      //{ nom: "Tests de pénétration", niveau: 60, description: "Audit sécurité basique" },
      //{ nom: "Authentification", niveau: 75, description: "JWT, OAuth, sessions" },
      //{ nom: "Sécurité web", niveau: 80, description: "OWASP, XSS, CSRF" },
    ]
  },
  outils: {
    titre: "Outils & Technologies",
    icone: Settings,
    couleur: "primary",
    items: [
      { nom: "Git/GitHub", niveau: 55, description: "Contrôle de version" },
      //{ nom: "Docker", niveau: 75, description: "Conteneurisation d'applications" },
      { nom: "Linux/Terminal", niveau: 20, description: "Administration système d'exploitation" },
      { nom: "Suite Office", niveau: 30, description: "Productivité et documentation" },
    ]
  }
};

export default function CompetencesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedBars, setAnimatedBars] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  // Observer pour déclencher les animations au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Déclencher l'animation des barres avec délai
          setTimeout(() => {
            Object.keys(competences).forEach((category, categoryIndex) => {
              const items = competences[category as keyof typeof competences].items;
              items.forEach((_, itemIndex) => {
                setTimeout(() => {
                  setAnimatedBars(prev => new Set([...prev, `${category}-${itemIndex}`]));
                }, (categoryIndex * 200) + (itemIndex * 100));
              });
            });
          }, 300);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="competences" className="py-16 lg:py-20 bg-muted/30">
      {/* Arrière-plan simple et épuré */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-muted/20 to-background/80"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className={`text-center mb-12 lg:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 text-primary">
            Mes Compétences
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Un aperçu de mes competences techniques acquises à travers mes études, projets personnels et expériences pratiques.
          </p>
        </div>

        {/* Grille des catégories de compétences */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {Object.entries(competences).map(([key, category], categoryIndex) => (
            <div 
              key={key}
              className={`transition-all duration-700 delay-${categoryIndex * 100} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="bg-card border border-border rounded-lg p-6 lg:p-8 hover:bg-accent/30 transition-all duration-200 shadow-soft">
                
                {/* En-tête de catégorie */}
                <div className="flex items-center space-x-4 mb-6 lg:mb-8">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <category.icone className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-foreground">{category.titre}</h3>
                </div>

                {/* Liste des compétences */}
                <div className="space-y-6">
                  {category.items.map((competence, index) => (
                    <div key={index} className="space-y-2">
                      
                      {/* Nom et description */}
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-foreground">{competence.nom}</span>
                        <span className="text-sm text-muted-foreground">{competence.niveau}%</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{competence.description}</p>
                      
                      {/* Barre de progression */}
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 bg-primary rounded-full transition-all duration-1000 ease-out ${
                            animatedBars.has(`${key}-${index}`) ? 'opacity-100' : 'opacity-0'
                          }`}
                          style={{ 
                            width: animatedBars.has(`${key}-${index}`) ? `${competence.niveau}%` : '0%'
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Badges de certifications */}
        <div className={`mt-12 lg:mt-16 text-center transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-xl lg:text-2xl font-bold mb-6 lg:mb-8 text-primary">Associations & Clubs</h3>
          <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
            {[
              "Google Developer Group Yamoussoukro",
              "Communauté AbiHack", 
              "AICG - Cote d'Ivoire",
              "Progpha Academie"
            ].map((certification, index) => (
              <div 
                key={index}
                className="bg-secondary text-secondary-foreground px-4 lg:px-6 py-2 lg:py-3 rounded-full text-sm lg:text-base font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-200 shadow-soft"
              >
                {certification}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}