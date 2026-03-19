import { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import type { GetAllProductsProps, Product } from "../types/shared/api.types";
import { flatternArray } from "../utils/flattenProducts";

const Filter = () => {
  const { apiData, isLoading, isError } = useApi(
    "http://localhost:5000/ruchika/api/product/getAllProducts",
  );
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (apiData && apiData.isSuccessful) {
      const flats = flatternArray(apiData?.result as GetAllProductsProps[]);
      setProducts(flats);
    }
  }, [apiData]);

  //   console.log(flats);

  console.log("products ", products);
  console.log("apiData ", apiData?.result);

  return <div>Filter</div>;
};

export default Filter;
