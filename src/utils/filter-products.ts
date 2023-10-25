import { ProductsCategoryData } from "tp-kit/types";
import { ProductFiltersResult } from "../types";

/**
 * Filters the product list according to the filters values
 * 
 * @param categories 
 * @param filters 
 * @returns 
 */
export function filterProducts(
  categories: ProductsCategoryData[],
  filters?: ProductFiltersResult
): ProductsCategoryData[] {
  if (!filters) return categories;

  // Excludes non-selected categories using their slug
  let output = categories.filter((cat) => {
    return filters.categoriesSlugs.length ?? 0 > 0
      ? filters.categoriesSlugs.includes(cat.slug)
      : true;
  });

  // Filters products by their name
  if (filters.search) {
    output = output.map((cat) => {
      // Excludes non-matching product names
      const filteredProducts = cat.products.filter((product) =>
        product.name.toLocaleLowerCase().includes(filters.search!)
      );

      // Updates the product category counter 
      return {
        ...cat,
        count: filteredProducts.length,
        products: filteredProducts,
      };
    });

    // Excludes empty product categories
    output = output.filter((cat) => cat.products.length > 0);
  }

  return output;
}
