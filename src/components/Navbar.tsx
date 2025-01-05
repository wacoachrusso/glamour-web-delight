import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Clock, MapPin, Phone } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  const openInWaze = () => {
    const salonLocation = { lat: 40.7241, lng: -74.1584 };
    const wazeUrl = `https://www.waze.com/ul?ll=${salonLocation.lat}%2C${salonLocation.lng}&navigate=yes`;
    window.open(wazeUrl, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-sm">
      {/* Top Info Bar */}
      <div className="w-full bg-primary/90 backdrop-blur-sm border-b border-secondary/10">
        <div className="container flex flex-col sm:flex-row justify-between items-center text-sm tracking-wide py-3">
          <div className="flex items-center gap-3 mb-2 sm:mb-0">
            <Clock className="h-4 w-4 text-secondary" />
            <span className="text-primary-foreground/90 font-medium hover:text-primary-foreground transition-colors">
              Mon-Sun: 10:00 AM - 7:00 PM
            </span>
          </div>
          <div className="flex items-center gap-3 mb-2 sm:mb-0 cursor-pointer group" onClick={openInWaze}>
            <MapPin className="h-4 w-4 text-secondary group-hover:scale-110 transition-transform" />
            <span className="text-primary-foreground/90 font-medium group-hover:text-primary-foreground transition-colors">
              275 Adams St, Newark NJ 07105
            </span>
          </div>
          <a 
            href="tel:+19733445199" 
            className="flex items-center gap-3 hover:scale-105 transition-transform"
          >
            <Phone className="h-4 w-4 text-secondary" />
            <span className="text-primary-foreground/90 font-medium hover:text-primary-foreground transition-colors">
              (973) 344-5199
            </span>
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white/95 backdrop-blur-md border-b border-secondary/10 shadow-sm">
        <div className="container flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/513dcf5a-b256-4137-a428-3656375e1aa4.png"
              alt="Glamour's Beauty Salon"
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {[
              { path: "/", label: t('nav.home') },
              { path: "/meet-the-owner", label: t('nav.about') },
              { path: "/services", label: t('nav.services') },
              { path: "/team", label: t('nav.team') },
              { path: "/store", label: t('nav.products') }
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  "text-primary-foreground/80 transition-all duration-300 font-medium tracking-widest text-sm relative group",
                  isActiveLink(path) && "text-secondary",
                  !isActiveLink(path) && "hover:text-secondary"
                )}
              >
                {label}
                <span 
                  className={cn(
                    "absolute inset-x-0 bottom-0 h-0.5 bg-secondary transform transition-transform duration-300 ease-out",
                    isActiveLink(path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </Link>
            ))}
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