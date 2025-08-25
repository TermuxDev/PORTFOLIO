import { useState, useEffect, useRef } from 'react';
import { GraduationCap, Award, BookOpen, ExternalLink } from 'lucide-react';

/**
 * Section Formations avec timeline élégante
 * Style : Timeline verticale avec cartes détaillées
 * 
 * Pour ajouter/modifier des formations :
 * - Ajoutez des objets dans le tableau `formations`
 * - Chaque formation doit avoir : titre, etablissement, periode, type, description, logo (optionnel)
 * - Les types possibles : 'scolaire', 'certification', 'mooc', 'atelier'
 */

// Configuration des formations (facile à modifier)
const formations = [
  {
    titre: "Formation Developpment Web ",
    etablissement: "Dclic Academy",
    periode: "Juillet 2025 - Septembre 2025",
    type: "certification",
    description: "Formation en developpement web, méthodes d'éco-conception, et gestion de ressources. Certification en developpement web Niveau 1.",
    competences: ["HTML", "CSS", "JAVASCRIPT", "archicteure web eco-conception"],
    logo: "🎓"
  },
  {
    titre: "Hackathon AbiHack",
    etablissement: "AbiHack / Google",
    periode: "2025",
    type: "certification",
    description: "AbiHack Google 2025 est un hackathon de 48 heures visant à résoudre des défis locaux en utilisant la technologie IA de Google.",
    competences: ["Google Cloud", "Python", "Mathématiques", "DevOps"],
    logo: "☁️",
    lien: ""
  },
  {
    titre: "Licence 1 en Informatique option Génie Logiciel",
    etablissement: "Université Internationale de Yamoussoukro",
    periode: "2024 - 2025",
    type: "scolaire", 
    description: "Fondamentaux de l'informatique : algorithmique, structures de données, programmation informatique, bases de données.",
    competences: ["Algorithmique", "Programmation", "Bases de données", "Mathématiques"],
    logo: "🎓"
  }
  /*
  
  {
    titre: "Cisco CCNA",
    etablissement: "Cisco Networking Academy",
    periode: "2023",
    type: "certification",
    description: "Certification réseaux couvrant les protocoles TCP/IP, routage, commutation et sécurité réseau.",
    competences: ["Réseaux", "TCP/IP", "Sécurité réseau", "Administration"],
    logo: "🌐",
    lien: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html"
  },
  {
    titre: "Cybersécurité ANSSI",
    etablissement: "Agence Nationale de Sécurité",
    periode: "2023",
    type: "atelier",
    description: "Formation intensive sur les enjeux de cybersécurité, analyse de malwares et réponse aux incidents.",
    competences: ["Cybersécurité", "Forensics", "Incident Response", "Malware Analysis"],
    logo: "🛡️"
  },
  {
    titre: "AWS Cloud Practitioner",
    etablissement: "Amazon Web Services",
    periode: "2024",
    type: "certification",
    description: "Certification fondamentale AWS couvrant les services cloud, la tarification et les meilleures pratiques.",
    competences: ["AWS", "Cloud Architecture", "Sécurité Cloud", "Cost Optimization"],
    logo: "☁️",
    lien: "https://aws.amazon.com/certification/certified-cloud-practitioner/"
  }
  */


];

// Fonction pour obtenir l'icône selon le type
const getTypeIcon = (type: string) => {
  switch (type) {
    case 'scolaire': return GraduationCap;
    case 'certification': return Award;
    case 'mooc': return BookOpen;
    case 'atelier': return BookOpen;
    default: return GraduationCap;
  }
};

// Fonction pour obtenir la couleur selon le type  
const getTypeColor = (type: string) => {
  switch (type) {
    case 'scolaire': return 'primary';
    case 'certification': return 'accent';
    case 'mooc': return 'secondary';
    case 'atelier': return 'secondary';
    default: return 'primary';
  }
};

export default function FormationsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  // Observer pour déclencher les animations au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animer les éléments de la timeline avec délai
          formations.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, index]));
            }, index * 200);
          });
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
    <section ref={sectionRef} id="formations" className="py-16 lg:py-20 bg-background">
      {/* Arrière-plan épuré */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/10 via-background to-muted/10"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className={`text-center mb-12 lg:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 text-primary">
            Mon Parcours de Formation
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Un parcours académique et professionnel riche en apprentissages, certifications et expériences pratiques.
          </p>
        </div>

        {/* Timeline des formations */}
        <div className="relative">
          {/* Ligne centrale de la timeline */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary"></div>

          <div className="space-y-12">
            {formations.map((formation, index) => {
              const TypeIcon = getTypeIcon(formation.type);
              const isEven = index % 2 === 0;
              const isItemVisible = visibleItems.has(index);

              return (
                <div 
                  key={index}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Icône centrale */}
                  <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 z-10">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center border-4 border-background shadow-elegant">
                      <TypeIcon className="w-5 h-5 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Carte de formation */}
                  <div 
                    className={`w-full md:w-5/12 ml-20 md:ml-0 transition-all duration-700 delay-${index * 100} ${
                      isItemVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isEven ? 'translate-x-8' : '-translate-x-8'}`
                    } ${isEven ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}
                  >
                    <div className="bg-card border border-border rounded-lg p-4 lg:p-6 hover:bg-accent/30 transition-all duration-200 hover:shadow-soft">
                      
                      {/* En-tête avec logo et période */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{formation.logo}</span>
                          <div>
                            <h3 className="text-xl font-bold text-foreground">{formation.titre}</h3>
                            <p className="text-muted-foreground font-medium">{formation.etablissement}</p>
                          </div>
                        </div>
                        {formation.lien && (
                          <a 
                            href={formation.lien}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-secondary transition-colors"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>

                      {/* Période */}
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                          {formation.periode}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {formation.description}
                      </p>

                      {/* Compétences acquises */}
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3">Compétences acquises :</h4>
                        <div className="flex flex-wrap gap-2">
                          {formation.competences.map((competence, compIndex) => (
                            <span 
                              key={compIndex}
                              className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm hover:bg-primary/10 hover:text-primary transition-colors"
                            >
                              {competence}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Statistiques de formation */}
        <div className={`mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 transition-all duration-700 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { numero: "1+", label: "Années d'études", icone: "🎓" },
            { numero: "2+", label: "Certifications", icone: "🏆" },
            { numero: "0+", label: "Projets réalisés", icone: "💻" },
            { numero: "0", label: "Langages maîtrisés", icone: "⚡" }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center bg-card border border-border rounded-lg p-4 lg:p-6 hover:bg-accent/30 transition-all duration-200 shadow-soft"
            >
              <div className="text-2xl lg:text-3xl mb-2">{stat.icone}</div>
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-2">
                {stat.numero}
              </div>
              <div className="text-sm lg:text-base text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}