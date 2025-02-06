import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useEffect } from "react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'pt', name: 'Português' }
  ];

  // Load saved language preference on component mount
  useEffect(() => {
    const savedLang = localStorage.getItem('i18nextLng');
    if (savedLang && languages.some(lang => lang.code === savedLang)) {
      i18n.changeLanguage(savedLang);
    } else {
      // Set default language if none is saved
      i18n.changeLanguage('en');
    }
  }, [i18n]);

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('i18nextLng', langCode);
    // Update HTML lang attribute for SEO
    document.documentElement.lang = langCode;
    // Update meta description for SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', i18n.t('meta.description'));
    }
    // Update page title for SEO
    document.title = i18n.t('meta.title');
  };

  // Get current language with fallback to 'en'
  const currentLanguage = i18n.language || 'en';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-primary-foreground relative"
        >
          <Globe className="h-5 w-5" />
          <span className="sr-only">Select language</span>
          <span className="absolute -bottom-1 -right-1 text-[10px] font-medium">
            {currentLanguage.toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`cursor-pointer ${
              currentLanguage === lang.code ? 'bg-secondary/10' : ''
            }`}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;