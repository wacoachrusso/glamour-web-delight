import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  const { t } = useTranslation();

  return (
    <div className="mb-12">
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <Button
          variant={selectedCategory === null ? "secondary" : "outline"}
          onClick={() => onCategoryChange(null)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          {t('store.allProducts')}
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "secondary" : "outline"}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;