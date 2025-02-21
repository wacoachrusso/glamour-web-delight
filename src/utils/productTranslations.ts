import { Product } from "@/integrations/supabase/types/product";
import i18n from "@/i18n/config";

export const getTranslatedProductContent = (product: Product) => {
  const currentLang = i18n.language;

  // Handle category translation
  const translatedCategory = i18n.t(`products.categories.${product.category.toLowerCase()}`);

  // For products stored in the database, we expect translations to be stored in JSON format
  // e.g., { en: "Description in English", es: "Descripción en Español", pt: "Descrição em Português" }
  let translatedDescription = product.description;
  try {
    const descriptions = JSON.parse(product.description);
    if (descriptions[currentLang]) {
      translatedDescription = descriptions[currentLang];
    }
  } catch {
    // If parsing fails, use the original description
    console.debug('Product description is not in JSON format, using original text');
  }

  return {
    ...product,
    category: translatedCategory,
    description: translatedDescription
  };
};