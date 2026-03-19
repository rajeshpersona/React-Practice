import React, { useEffect, useState } from "react";
import { flatternArray } from "../utils/FlatProductsUtils";
import type { GetAllProductsProps, Product } from "../types/shared/api.types";
import useApi from "./useApi";

const apiDetails = {
  url: "http://localhost:5000/rajesheco/api/product/getAllProducts",
  method: "GET",
  headers: { "Content-Type": "application/json" },
  body: null,
};
export const useSearchProduct = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [debounce, setDebounce] = useState("");

  const { isLoading, isError, apiData, refetch } = useApi(apiDetails.url);
  useEffect(() => {
    if (apiData?.result && apiData.isSuccessful) {
      const flatArry = flatternArray(apiData?.result as GetAllProductsProps[]);
      console.log(flatArry);
      setProducts(flatArry);
    }
  }, [apiData]);

  // const getAllProductsApi = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:5000/rajesheco/api/product/getAllProducts",
  //     );

  //     if (response.ok) {
  //       const result = await response.json();
  //       console.log(result);
  //       const flatArry = flatternArray(result.result);
  //       console.log(flatArry);
  //       setProducts(flatArry);
  //     }
  //   } catch {
  //     console.log("Error");
  //   }
  // };

  const filteredData =
    products &&
    products.filter((item) => {
      return item.title.toLowerCase().includes(debounce.toLowerCase());
    });
  console.log(filteredData);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // useEffect(() => {
  //   getAllProductsApi();
  // }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(search);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  return { handleSearch, debounce, filteredData, search };
};
