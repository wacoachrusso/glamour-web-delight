import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export const MobileMenu = () => {
  const { t } = useTranslation();

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
          {/* Address for mobile */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>275 Adams St, Newark NJ 07105</span>
          </div>

          <nav className="flex flex-col gap-4">
            <Link
              to="/"
              className="text-lg font-medium hover:text-accent transition-colors"
            >
              HOME
            </Link>
            <Link
              to="/meet-the-owner"
              className="text-lg font-medium hover:text-accent transition-colors"
            >
              ABOUT US
            </Link>
            <Link
              to="/services"
              className="text-lg font-medium hover:text-accent transition-colors"
            >
              SERVICES
            </Link>
            <Link
              to="/team"
              className="text-lg font-medium hover:text-accent transition-colors"
            >
              OUR TEAM
            </Link>
            <Link
              to="/store"
              className="text-lg font-medium hover:text-accent transition-colors"
            >
              PRODUCTS
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};