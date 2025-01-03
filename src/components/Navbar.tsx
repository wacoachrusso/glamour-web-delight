import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/lovable-uploads/2721060a-90fa-4a64-97e9-d7747f1a40a8.png"
              alt="Glamour's Beauty Salon"
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/">{t('nav.home')}</NavLink>
            <NavLink to="/services">{t('nav.services')}</NavLink>
            <NavLink to="/about">{t('nav.about')}</NavLink>
            <NavLink to="/gallery">{t('nav.gallery')}</NavLink>
            <NavLink to="/contact">{t('nav.contact')}</NavLink>
            <LanguageSwitcher />
            <Button 
              className="bg-secondary hover:bg-secondary-light text-secondary-foreground px-6 py-2 rounded-none border border-secondary transition-all duration-300"
            >
              {t('nav.bookNow')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <LanguageSwitcher />
            <button
              className="p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6 text-primary-foreground" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg py-4">
            <div className="flex flex-col space-y-4 px-4">
              <NavLink to="/">{t('nav.home')}</NavLink>
              <NavLink to="/services">{t('nav.services')}</NavLink>
              <NavLink to="/about">{t('nav.about')}</NavLink>
              <NavLink to="/gallery">{t('nav.gallery')}</NavLink>
              <NavLink to="/contact">{t('nav.contact')}</NavLink>
              <Button 
                className="bg-secondary hover:bg-secondary-light text-secondary-foreground w-full rounded-none border border-secondary transition-all duration-300"
              >
                {t('nav.bookNow')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="font-montserrat text-primary-foreground hover:text-secondary transition-colors duration-300 text-sm uppercase tracking-wider"
  >
    {children}
  </Link>
);

export default Navbar;