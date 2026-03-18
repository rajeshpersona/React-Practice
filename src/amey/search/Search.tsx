import { useEffect, useState } from "react";
import type { GetAllProductsProps, Product } from "../types/shared/api.types";
import { flatternArray } from "../utils/flattenProducts";
import useApi from "../hooks/useApi";

const url = "http://localhost:5000/ruchika/api/product/getAllProducts";
// const method = "GET";
// const headers = { "Content-Type": "application/json" };
// const reqBody = {};
const Search = () => {
  const { apiData, isLoading, isError, refetch } =
    useApi<GetAllProductsProps[]>(url);

  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deBounce, setDebounce] = useState("");

  useEffect(() => {
    if (apiData && apiData.isSuccessful) {
      const flatProducts = flatternArray(apiData.result);
      setProducts(flatProducts);
    }
  }, [apiData]); // Runs when API returns new data

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredData =
    products &&
    products.filter((item) =>
      item.title.toLowerCase().includes(deBounce.toLowerCase()),
    );

  console.log("search term ", searchTerm);
  // console.log("filtered array ", filteredData);
  // console.log("products ", products);
  // console.log(deBounce);
  return (
    <div>
      <h2>Search</h2>
      <input
        type="text"
        placeholder="search"
        onChange={handleSearch}
        value={searchTerm}
      />
      <div>
        {deBounce.length > 0 && filteredData.length > 0 ? (
          filteredData.map((item) => {
            return <h2 key={item.id}>{item.title}</h2>;
          })
        ) : (
          <h2>"no products found"</h2>
        )}
      </div>
    </div>
  );
};

export default Search;
