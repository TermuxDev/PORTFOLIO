import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

/**
 * Composant de navigation fixe avec menu responsive
 * Style : Navigation transparente avec effet de flou au scroll
 * 
 * Pour modifier les liens de navigation :
 * - Ajoutez/supprimez des objets dans le tableau `navItems`
 * - Chaque objet doit avoir : label (texte affiché) et href (ancre de la section)
 */

const navItems = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Compétences', href: '#competences' },
  { label: 'Formations', href: '#formations' },
  { label: 'Projets', href: '#projets' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Détecte le scroll pour appliquer l'effet de transparence
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-nav-background/90 backdrop-blur-md border-b border-nav-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Nom */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('#accueil')}
              className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              TermuxDev
            </button>
          </div>

          {/* Navigation desktop */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>
          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground hover:text-primary transition-colors p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-nav-border">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-nav-background/95 backdrop-blur-md">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-200 rounded-md"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}