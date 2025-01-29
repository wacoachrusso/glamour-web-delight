import { useTranslation } from "react-i18next";
import SectionHeader from "../shared/SectionHeader";
import PortfolioGrid from "./PortfolioGrid";
import { usePortfolioImages } from "@/hooks/usePortfolioImages";

const PortfolioSection = () => {
  const { t } = useTranslation();
  const { data: portfolioImages, isLoading } = usePortfolioImages();

  if (isLoading) {
    return (
      <div className="w-full min-h-[200px] flex items-center justify-center">
        <div className="animate-pulse w-8 h-8 rounded-full bg-secondary/20" />
      </div>
    );
  }

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeader 
          titleKey="portfolio.title"
          highlightKey="portfolio.highlight"
          subtitleKey="portfolio.subtitle"
        />
        <PortfolioGrid images={portfolioImages || []} />
      </div>
    </section>
  );
};

export default PortfolioSection;