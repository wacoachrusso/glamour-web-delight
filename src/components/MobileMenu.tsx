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

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col gap-8 mt-8">
          {/* Info section for mobile */}
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 text-secondary" />
              <span>Mon-Sun: 10:00 AM - 7:00 PM</span>
            </div>
            <div 
              className="flex items-center gap-2 text-muted-foreground cursor-pointer hover:text-secondary transition-colors"
              onClick={openInWaze}
            >
              <MapPin className="h-4 w-4 text-secondary" />
              <span>275 Adams St, Newark NJ 07105</span>
            </div>
            <a 
              href="tel:+19733445199"
              className="flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors"
            >
              <Phone className="h-4 w-4 text-secondary" />
              <span>(973) 344-5199</span>
            </a>
          </div>

          <nav className="flex flex-col gap-4">
            {[
              { path: "/", label: "HOME" },
              { path: "/meet-the-owner", label: "ABOUT US" },
              { path: "/services", label: "SERVICES" },
              { path: "/team", label: "OUR TEAM" },
              { path: "/store", label: "PRODUCTS" }
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  "text-lg font-medium transition-colors",
                  isActiveLink(path) ? "text-secondary" : "hover:text-accent"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};