import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useIsMobile } from "@/hooks/use-mobile";

export const Navbar = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-playfair text-primary-foreground">
              {t("brand")}
            </Link>
            {!isMobile && (
              <div className="flex items-center space-x-4">
                <Link
                  to="/meet-the-owner"
                  className="text-primary-foreground hover:text-accent transition-colors"
                >
                  {t("meetTheOwner")}
                </Link>
                <Link
                  to="/store"
                  className="text-primary-foreground hover:text-accent transition-colors"
                >
                  Store
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            {isMobile && (
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};