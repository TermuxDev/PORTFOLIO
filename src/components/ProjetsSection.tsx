import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Code, Trophy, User, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Section Projets avec grille interactive
 * Style : Cartes avec effet hover et filtrage par catégorie
 * 
 * Pour ajouter/modifier des projets :
 * - Ajoutez des objets dans le tableau `projets`
 * - Chaque projet doit avoir : titre, description, technologies, categorie, image, liens
 * - Catégories disponibles : 'academique', 'personnel', 'hackathon'
 */

// Configuration des projets (facile à modifier)
const projets = [

  
  {
    titre: "Site Internet Professionnel",
    description: "C'est un site web vitrine développé pour un client professionnel, mettant en avant ses services et réalisations.Cette plateforme est conçue pour offrir une expérience utilisateur fluide et engageante.",
    technologies: ["HTML", "CSS", "JS"],
    categorie: "personnel",
    image: "💪",
    liens: {
      github: "",
      demo: ""
    },
    statut: "Terminé",
    duree: "2 semaines"
  },

  
  {
    titre: "Site de E-commerce semi-dynamique",
    description: "Ce Site de e-commerce semi-dynamique est une plateforme en ligne qui permet aux utilisateurs de parcourir et d'acheter des produits. Il intègre des fonctionnalités dynamiques pour améliorer l'expérience utilisateur tout en utilisant des technologies web modernes comme une rédirection vers whatsapp pour la terminaison de l'achat.",
    technologies: ["HTML", "CSS", "JAVASCRIPT"],
    categorie: "personnel",
    image: "🛒",
    liens: {
      github: "",
      demo: ""
    },
    statut: "En cours",
    duree: "1 mois"
  },
  
  {
    titre: "Assistant IA pour la prise en charge dans les services médicaux",
    description: "Projet développé lors du Hackathon AbiHack Google 2025 visant à créer un assistant intelligent pour améliorer la prise en charge des patients dans les services médicaux. L'assistant utilise des technologies d'IA basés sous Google pour fournir des recommandations et automatiser certaines tâches administratives.C'est un projet réalisé par un groupe de 4 personnes dont j'ai occupé de LEAD DEV et assistant developpeur Backend IA",
    technologies: ["Python", "Google Cloud", "MySQL", "Gemini AI"],
    categorie: "hackathon",
    image: "🎓",
    liens: {
      github: ""
    },
    statut: "Terminé",
    duree: "48h",
    prix: "Certificat de participation et réseautage avec des professionnels du secteur"
  }
  /*
  {
    titre: "App Mobile Fitness",
    description: "Application mobile de suivi sportif avec planification d'entraînements, tracking GPS et communauté sociale.",
    technologies: ["React Native", "Firebase", "Google Maps API", "Redux"],
    categorie: "personnel",
    image: "💪",
    liens: {
      github: "https://github.com/username/fitness-app",
      demo: "https://fitness-app-demo.com"
    },
    statut: "Beta",
    duree: "6 mois"
  },
  {
    titre: "Système de Monitoring IoT",
    description: "Dashboard en temps réel pour surveiller des capteurs IoT avec alertes automatiques et historique des données.",
    technologies: ["Python", "Raspberry Pi", "InfluxDB", "Grafana", "MQTT"],
    categorie: "academique",
    image: "📡",
    liens: {
      github: "https://github.com/username/iot-monitoring"
    },
    statut: "Terminé",
    duree: "3 mois"
  },
  {
    titre: "Jeu Web Multijoueur",
    description: "Jeu de stratégie en temps réel dans le navigateur avec système de matchmaking et classements globaux.",
    technologies: ["TypeScript", "Socket.io", "Phaser.js", "Node.js", "Redis"],
    categorie: "personnel",
    image: "🎮",
    liens: {
      github: "https://github.com/username/web-game",
      demo: "https://web-game-demo.com"
    },
    statut: "Terminé",
    duree: "8 mois"
  }

  */
];

// Configuration des filtres
const filtres = [
  { id: 'tous', label: 'Tous les projets', icone: Code },
  { id: 'academique', label: 'Projets académiques', icone: User },
  { id: 'personnel', label: 'Projets personnels', icone: Lightbulb },
  { id: 'hackathon', label: 'Hackathons', icone: Trophy }
];

export default function ProjetsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [filtreActif, setFiltreActif] = useState('tous');
  const [projetsVisibles, setProjetsVisibles] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  // Observer pour déclencher les animations au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animer les projets avec délai
          setTimeout(() => {
            projets.forEach((_, index) => {
              setTimeout(() => {
                setProjetsVisibles(prev => new Set([...prev, index]));
              }, index * 150);
            });
          }, 300);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Filtrer les projets selon la catégorie sélectionnée
  const projetsFiltres = filtreActif === 'tous' 
    ? projets 
    : projets.filter(projet => projet.categorie === filtreActif);

  return (
    <section ref={sectionRef} id="projets" className="py-16 lg:py-20 bg-muted/30">
      {/* Arrière-plan épuré */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-muted/20 to-background/80"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className={`text-center mb-12 lg:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 text-primary">
            Mes Réalisations
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Découvrez mes projets académiques, personnels et réalisations lors de hackathons. Chaque projet reflète ma passion pour l'innovation technologique.
          </p>
        </div>

        {/* Filtres de catégories */}
        <div className={`flex flex-wrap justify-center gap-3 lg:gap-4 mb-8 lg:mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {filtres.map((filtre) => (
            <button
              key={filtre.id}
              onClick={() => setFiltreActif(filtre.id)}
              className={`flex items-center space-x-2 px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-medium transition-all duration-200 ${
                filtreActif === filtre.id
                  ? 'bg-primary text-primary-foreground shadow-elegant'
                  : 'bg-card text-muted-foreground hover:bg-accent/50 hover:text-foreground border border-border'
              }`}
            >
              <filtre.icone className="w-4 h-4" />
              <span className="text-sm lg:text-base">{filtre.label}</span>
            </button>
          ))}
        </div>

        {/* Grille des projets */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projetsFiltres.map((projet, index) => {
            const isProjectVisible = projetsVisibles.has(index);
            
            return (
              <div 
                key={index}
                className={`transition-all duration-700 delay-${index * 100} ${
                  isProjectVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="bg-card border border-border rounded-lg overflow-hidden hover:bg-accent/30 transition-all duration-200 hover:shadow-soft group">
                  
                  {/* En-tête du projet avec image/emoji */}
                  <div className="relative p-4 lg:p-6 pb-3 lg:pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3 lg:space-x-4">
                        <div className="text-2xl lg:text-4xl">{projet.image}</div>
                        <div>
                          <h3 className="text-lg lg:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {projet.titre}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                              projet.statut === 'Terminé' ? 'bg-primary/20 text-primary' :
                              projet.statut === 'En cours' ? 'bg-accent/20 text-accent' :
                              projet.statut === 'Beta' ? 'bg-secondary/20 text-secondary' :
                              'bg-primary/20 text-primary'
                            }`}>
                              {projet.statut}
                            </span>
                            <span className="text-xs text-muted-foreground">• {projet.duree}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Prix/Récompense si applicable */}
                    {projet.prix && (
                      <div className="mt-3 p-2 bg-primary/10 rounded-lg">
                        <p className="text-sm text-primary font-medium flex items-center">
                          <Trophy className="w-4 h-4 mr-2" />
                          {projet.prix}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="px-4 lg:px-6 pb-3 lg:pb-4">
                    <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                      {projet.description}
                    </p>
                  </div>

                  {/* Technologies utilisées */}
                  <div className="px-4 lg:px-6 pb-3 lg:pb-4">
                    <div className="flex flex-wrap gap-2">
                      {projet.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-2 lg:px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs lg:text-sm hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Liens et actions */}
                  <div className="px-4 lg:px-6 pb-4 lg:pb-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
                    {projet.liens.github && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center justify-center space-x-2 border-primary/20 hover:border-primary hover:bg-primary/10 text-xs lg:text-sm"
                        onClick={() => window.open(projet.liens.github, '_blank')}
                      >
                        <Github className="w-4 h-4" />
                        <span>Code</span>
                      </Button>
                    )}
                    {projet.liens.demo && (
                      <Button 
                        size="sm"
                        className="flex items-center justify-center space-x-2 bg-primary hover:bg-primary/90 text-xs lg:text-sm"
                        onClick={() => window.open(projet.liens.demo, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Démo</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Message si aucun projet dans la catégorie */}
        {projetsFiltres.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Aucun projet trouvé dans cette catégorie.
            </p>
          </div>
        )}

        {/* Statistiques des projets */}
        <div className={`mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { 
              numero: projets.length.toString(), 
              label: "Projets réalisés", 
              icone: "💻",
              description: "Applications complètes développées"
            },
            { 
              numero: projets.filter(p => p.categorie === 'hackathon').length.toString(), 
              label: "Hackathons", 
              icone: "🏆",
              description: "Événements de développement participés"
            },
            { 
              numero: [...new Set(projets.flatMap(p => p.technologies))].length.toString(), 
              label: "Technologies", 
              icone: "⚡",
              description: "Outils et langages utilisés"
            }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center bg-card border border-border rounded-lg p-4 lg:p-6 hover:bg-accent/30 transition-all duration-200 shadow-soft group"
            >
              <div className="text-3xl lg:text-4xl mb-3">{stat.icone}</div>
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                {stat.numero}
              </div>
              <div className="font-semibold text-foreground mb-1 text-sm lg:text-base">{stat.label}</div>
              <div className="text-xs lg:text-sm text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}