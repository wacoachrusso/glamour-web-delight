import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Clock, MapPin, Phone } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

export const Navbar = () => {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Info Bar */}
      <div className="w-full bg-secondary/10 text-primary-foreground py-3">
        <div className="container flex justify-between items-center text-xs uppercase tracking-wider">
          <div className="flex items-center gap-3">
            <Clock className="h-3.5 w-3.5 text-secondary" />
            <span className="text-gray-700 font-medium">{t('nav.hours')}</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <MapPin className="h-3.5 w-3.5 text-secondary" />
            <span className="text-gray-700 font-medium">{t('nav.address')}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-3.5 w-3.5 text-secondary" />
            <span className="text-gray-700 font-medium">{t('nav.phone')}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="border-b border-secondary/10 bg-white">
        <div className="container flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/513dcf5a-b256-4137-a428-3656375e1aa4.png"
              alt="Glamour's Beauty Salon"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <Link
              to="/"
              className="text-gray-700 hover:text-secondary transition-all duration-300 font-medium tracking-widest text-sm relative group"
            >
              {t('nav.home')}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/meet-the-owner"
              className="text-gray-700 hover:text-secondary transition-all duration-300 font-medium tracking-widest text-sm relative group"
            >
              {t('nav.about')}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/services"
              className="text-gray-700 hover:text-secondary transition-all duration-300 font-medium tracking-widest text-sm relative group"
            >
              {t('nav.services')}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/team"
              className="text-gray-700 hover:text-secondary transition-all duration-300 font-medium tracking-widest text-sm relative group"
            >
              {t('nav.team')}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/store"
              className="text-gray-700 hover:text-secondary transition-all duration-300 font-medium tracking-widest text-sm relative group"
            >
              {t('nav.products')}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
          </nav>

          {/* Right side items */}
          <div className="flex items-center gap-6">
            <LanguageSwitcher />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};