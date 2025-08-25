import { useState, useEffect, useRef } from 'react';
import { Mail, Linkedin, Github, Download, MapPin, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Section Contact avec liens sociaux et CV téléchargeable
 * Style : Design élégant avec cartes interactives et informations de contact
 * 
 * Pour personnaliser :
 * - Modifiez les informations de contact dans la configuration
 * - Ajoutez/supprimez des liens sociaux
 * - Changez l'URL du CV dans le lien de téléchargement
 */

// Configuration des informations de contact (facile à modifier)
const contactInfo = {
  nom: "Diomandé Keuwe Mickael",
  email: "keuwemichael@gmail.com",
  telephone: "+225 05 4608 9911",
  localisation: "Yamoussoukro, Cote d'Ivoire",
  disponibilite: "Disponible pour stage/alternance/projet"
};

// Configuration des liens sociaux
const liensSociaux = [
  {
    nom: "Email",
    icone: Mail,
    url: `mailto:${contactInfo.email}`,
    couleur: "primary",
    description: "Envoyez-moi un email"
  },
  {
    nom: "LinkedIn",
    icone: Linkedin, 
    url: "/",
    couleur: "primary",
    description: "Connectons-nous professionnellement"
  },
  {
    nom: "GitHub",
    icone: Github,
    url: "",
    couleur: "secondary",
    description: "Découvrez mes projets open source"
  }
];

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Observer pour déclencher les animations au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Fonction pour télécharger le CV
  const telechargerCV = () => {
    // Remplacez cette URL par le lien réel vers votre CV
    const urlCV = "/cv-diomande-mickael.pdf";
    window.open(urlCV, '_blank');
  };

  return (
    <section ref={sectionRef} id="contact" className="py-16 lg:py-20 bg-background">
      {/* Arrière-plan épuré */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/10 via-background to-muted/10"></div>
      
      {/* Éléments décoratifs subtils */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-48 h-48 bg-primary/20 rounded-full blur-2xl animate-float-subtle"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-accent/15 rounded-full blur-2xl animate-float-subtle" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className={`text-center mb-12 lg:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 text-primary">
            Restons en Contact
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Intéressé par mon profil ? N'hésitez pas à me contacter pour discuter d'opportunités de collaboration, de stage ou simplement pour échanger sur nos passions communes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Informations de contact */}
          <div className={`space-y-6 lg:space-y-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            
            {/* Carte d'information principale */}
            <div className="bg-card border border-border rounded-lg p-6 lg:p-8 shadow-elegant">
              <h3 className="text-2xl font-bold text-foreground mb-6">Informations de Contact</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <a href={`mailto:${contactInfo.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-secondary/10 rounded-lg">
                    <Phone className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Téléphone</p>
                    <p className="text-muted-foreground">{contactInfo.telephone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Localisation</p>
                    <p className="text-muted-foreground">{contactInfo.localisation}</p>
                  </div>
                </div>
              </div>

              {/* Statut de disponibilité */}
              <div className="mt-8 p-4 bg-accent/10 rounded-lg border border-accent/20">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                  <p className="text-accent font-medium">{contactInfo.disponibilite}</p>
                </div>
              </div>
            </div>

            {/* Bouton de téléchargement CV */}
            <div className="text-center">
              <Button 
                onClick={telechargerCV}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 lg:px-8 py-3 lg:py-4 transition-all duration-200 shadow-elegant hover:shadow-glow w-full sm:w-auto"
              >
                <Download className="w-5 h-5 mr-3" />
                Télécharger mon CV
              </Button>
            </div>
          </div>

          {/* Liens sociaux */}
          <div className={`space-y-4 lg:space-y-6 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <h3 className="text-xl lg:text-2xl font-bold text-primary mb-6 lg:mb-8 text-center lg:text-left">Mes Réseaux</h3>
            
            {liensSociaux.map((lien, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <a
                  href={lien.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <div className={`bg-card border border-border rounded-lg p-4 lg:p-6 hover:bg-accent/30 transition-all duration-200 hover:shadow-soft ${
                    hoveredCard === index ? 'shadow-glow' : ''
                  }`}>
                    <div className="flex items-center space-x-3 lg:space-x-4">
                      <div className="p-3 lg:p-4 bg-primary/10 rounded-lg">
                        <lien.icone className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg lg:text-xl font-bold text-foreground mb-1">{lien.nom}</h4>
                        <p className="text-sm lg:text-base text-muted-foreground">{lien.description}</p>
                      </div>
                      <div className={`transition-transform duration-200 ${hoveredCard === index ? 'translate-x-2' : ''}`}>
                        <Send className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}

            {/* Carte d'invitation à l'action */}
            <div className="bg-primary rounded-lg p-4 lg:p-6 text-primary-foreground mt-6 lg:mt-8 shadow-elegant">
              <h4 className="text-lg lg:text-xl font-bold mb-3">🚀 Prêt à collaborer ?</h4>
              <p className="text-primary-foreground/90 mb-4 text-sm lg:text-base leading-relaxed">
                Que ce soit pour un stage, une alternance ou un projet innovant, je suis toujours ouvert aux nouvelles opportunités !
              </p>
              <div className="flex items-center space-x-2 text-sm lg:text-base">
                <div className="w-2 h-2 bg-primary-foreground/60 rounded-full animate-pulse-soft"></div>
                <span className="text-primary-foreground/80">Réponse garantie sous 24h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer avec remerciement */}
        <div className={`text-center mt-16 lg:mt-20 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-card border border-border rounded-lg p-6 lg:p-8 shadow-soft">
            <p className="text-base lg:text-lg text-muted-foreground mb-4 leading-relaxed">
              Merci d'avoir pris le temps de découvrir mon univers professionnel.
            </p>
            <p className="text-foreground font-medium">
              J'ai hâte de discuter avec vous et de découvrir comment nous pourrions collaborer ! 🤝
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}