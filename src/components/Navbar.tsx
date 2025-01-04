import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShoppingCart, Clock, MapPin, Phone } from "lucide-react";
import { Button } from "./ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

export const Navbar = () => {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full" role="banner">
      {/* Top Info Bar */}
      <div className="w-full bg-gradient-to-r from-secondary/5 via-secondary/10 to-secondary/5 text-primary-foreground py-3">
        <div className="container flex justify-between items-center text-xs uppercase tracking-wider">
          <div className="flex items-center gap-3">
            <Clock className="h-3.5 w-3.5 text-secondary" aria-hidden="true" />
            <span className="text-gray-700 font-medium">{t('nav.hours')}</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <MapPin className="h-3.5 w-3.5 text-secondary" aria-hidden="true" />
            <span className="text-gray-700 font-medium">{t('nav.address')}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-3.5 w-3.5 text-secondary" aria-hidden="true" />
            <a 
              href="tel:+19733445199" 
              className="text-gray-700 font-medium hover:text-secondary transition-colors"
              aria-label="Call us at (973) 344-5199"
            >
              {t('nav.phone')}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="border-b border-secondary/10 bg-gradient-to-b from-white/95 via-white/90 to-transparent backdrop-blur-sm" role="navigation">
        <div className="container flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" aria-label="Glamour's Beauty Salon - Home">
            <img 
              src="/lovable-uploads/513dcf5a-b256-4137-a428-3656375e1aa4.png"
              alt="Glamour's Beauty Salon Logo"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
            <Link
              to="/"
              className="text-gray-700 hover:text-secondary focus:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 rounded-md transition-all duration-300 font-medium tracking-widest text-sm relative group"
              aria-current={location.pathname === "/" ? "page" : undefined}
            >
              {t('nav.home')}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/meet-the-owner"
              className="text-gray-700 hover:text-secondary focus:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 rounded-md transition-all duration-300 font-medium tracking-widest text-sm relative group"
              aria-current={location.pathname === "/meet-the-owner" ? "page" : undefined}
            >
              {t('nav.about')}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/services"
              className="text-gray-700 hover:text-secondary focus:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 rounded-md transition-all duration-300 font-medium tracking-widest text-sm relative group"
              aria-current={location.pathname === "/services" ? "page" : undefined}
            >
              {t('nav.services')}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/team"
              className="text-gray-700 hover:text-secondary focus:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 rounded-md transition-all duration-300 font-medium tracking-widest text-sm relative group"
              aria-current={location.pathname === "/team" ? "page" : undefined}
            >
              {t('nav.team')}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/store"
              className="text-gray-700 hover:text-secondary focus:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 rounded-md transition-all duration-300 font-medium tracking-widest text-sm relative group"
              aria-current={location.pathname === "/store" ? "page" : undefined}
            >
              {t('nav.products')}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
          </nav>

          {/* Right side items */}
          <div className="flex items-center gap-6">
            <LanguageSwitcher />
            <Link to="/store">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-secondary/5 transition-colors duration-300"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-5 w-5 text-gray-600" aria-hidden="true" />
                <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-xs font-medium border border-secondary/20" aria-label="Cart items">
                  0
                </div>
              </Button>
            </Link>
            <MobileMenu />
          </div>
        </div>
      </nav>
    </header>
  );
};