import { useEffect, useState } from "react";
import type { GetAllProductsProps, Product } from "../types/shared/api.types";

const Search = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deBounce, setDebounce] = useState("");

  const getAllProductsApi = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/ruchika/api/product/getAllProducts",
      );
      if (response.ok) {
        const data = await response.json();
        // console.log("original ", data?.result);
        if (data?.isSuccessful) {
          let flatProducts = flatternArray(data?.result);
          // console.log(flatProducts);
          setProducts(flatProducts);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProductsApi();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  const flatternArray = (result: GetAllProductsProps[]): Product[] => {
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
  console.log(deBounce);
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
        {deBounce.length > 0 && filteredData.length > 0
          ? filteredData.map((item) => {
              return <h2 key={item.id}>{item.title}</h2>;
            })
          : ""
            // <h2>"no products found"</h2>
        }
      </div>
    </div>
  );
};

export default Search;
