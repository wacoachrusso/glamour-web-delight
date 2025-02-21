import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, MapPin, Phone, Clock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "./LanguageSwitcher";

export const MobileMenu = () => {
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

  const navItems = [
    { path: "/", label: t('nav.home') },
    { path: "/meet-the-owner", label: t('nav.about') },
    { path: "/services", label: t('nav.services') },
    { path: "/portfolio", label: t('nav.portfolio') },
    { path: "/store", label: t('nav.store') },
    { path: "/blog", label: t('nav.blog') }
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
        <div className="flex flex-col h-full bg-white">
          {/* Header with logo */}
          <div className="p-6 border-b border-secondary/10">
            <img 
              src="/lovable-uploads/513dcf5a-b256-4137-a428-3656375e1aa4.png"
              alt="Glamour's Beauty Salon"
              className="h-12 w-auto object-contain mx-auto"
            />
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4">
            {/* Navigation Menu */}
            <nav className="mb-8">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">Menu</h2>
              <div className="flex flex-col space-y-1">
                {navItems.map(({ path, label }) => (
                  <Link
                    key={path}
                    to={path}
                    className={cn(
                      "px-2 py-3 rounded-lg text-base font-medium transition-colors",
                      isActiveLink(path) ? "bg-secondary/10 text-secondary" : "hover:bg-secondary/5 hover:text-secondary"
                    )}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">Contact & Hours</h2>
              <div className="space-y-4 px-2">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock className="h-5 w-5 text-secondary flex-shrink-0" />
                  <span>Mon-Sun: 10:00 AM - 7:00 PM</span>
                </div>
                <div 
                  className="flex items-center gap-3 text-sm text-muted-foreground cursor-pointer hover:text-secondary transition-colors"
                  onClick={openInWaze}
                >
                  <MapPin className="h-5 w-5 text-secondary flex-shrink-0" />
                  <span>275 Adams St, Newark NJ 07105</span>
                </div>
                <a 
                  href="tel:+19733445199"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-secondary transition-colors"
                >
                  <Phone className="h-5 w-5 text-secondary flex-shrink-0" />
                  <span>(973) 344-5199</span>
                </a>
              </div>
            </div>
          </div>

          {/* Footer with Language Switcher */}
          <div className="mt-auto border-t border-secondary/10 p-4">
            <LanguageSwitcher />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};