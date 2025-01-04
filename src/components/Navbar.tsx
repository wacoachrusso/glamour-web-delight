import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

export const Navbar = () => {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex flex-1 items-center justify-between">
          {/* Logo and main navigation */}
          <div className="flex items-center gap-8">
            <Link 
              to="/" 
              className="text-2xl font-playfair text-primary-foreground hover:text-accent transition-colors"
            >
              {t("brand")}
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/meet-the-owner"
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                {t("meetTheOwner")}
              </Link>
              <Link
                to="/store"
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                Store
              </Link>
            </nav>
          </div>

          {/* Right side items */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link to="/store">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Shopping cart</span>
                <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-xs font-medium">
                  0
                </div>
              </Button>
            </Link>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};