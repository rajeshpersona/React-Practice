 import type { GetAllProductsProps, Product } from "../types/shared/api.types";
 export const flatternArray = (result: GetAllProductsProps[]): Product[] => {
    return result.flatMap((item) => {
      const currentLevel = (item.products || []) as Product[];
      const nestedLevel =
        item.children && item.children.length > 0
          ? flatternArray(item.children)
          : [];
      // return [...currentLevel, ...nestedLevel];
      let final = currentLevel.concat(nestedLevel);
      return final;
    });
  };

  