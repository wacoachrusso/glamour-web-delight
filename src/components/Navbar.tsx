import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";

export const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: "/", label: t('nav.home') },
    { path: "/meet-the-owner", label: t('nav.about') },
    { path: "/services", label: t('nav.services') },
    { path: "/portfolio", label: t('nav.portfolio') },
    { path: "/store", label: t('nav.store') },
    { 
      path: "/blog", 
      label: t('nav.blog'),
      icon: BookOpen,
      isNew: true 
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-sm">
      <div className="bg-white/95 backdrop-blur-md border-b border-secondary/10 shadow-sm">
        <div className="container flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/513dcf5a-b256-4137-a428-3656375e1aa4.png"
              alt={t('nav.logo_alt')}
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map(({ path, label, icon: Icon, isNew }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  "text-primary-foreground/80 transition-all duration-300 font-medium tracking-widest text-sm relative group flex items-center gap-1",
                  isActiveLink(path) && "text-secondary",
                  !isActiveLink(path) && "hover:text-secondary"
                )}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {label}
                {isNew && (
                  <span className="absolute -top-3 -right-6 bg-secondary text-white text-xs px-1.5 py-0.5 rounded-full">
                    New
                  </span>
                )}
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