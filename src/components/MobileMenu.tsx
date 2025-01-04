import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
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
          <nav className="flex flex-col gap-4">
            <Link
              to="/"
              className="text-lg font-medium hover:text-accent transition-colors"
            >
              {t("home")}
            </Link>
            <Link
              to="/meet-the-owner"
              className="text-lg font-medium hover:text-accent transition-colors"
            >
              {t("meetTheOwner")}
            </Link>
            <Link
              to="/store"
              className="text-lg font-medium hover:text-accent transition-colors"
            >
              Store
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