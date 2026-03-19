import { useSearchProduct } from "../hook/useSearchProduct";

const SearchProduct = () => {
  const { handleSearch, debounce, filteredData, search } = useSearchProduct();
  return (
    <>
      <div className="container">
        <div className="row">
          {" "}
          <form className="d-flex my-5">
            <input
              className="form-control me-2"
              type="search"
              id="searchValue"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={handleSearch}
            />
            <div>
              {
                debounce && filteredData.length > 0
                  ? filteredData.map((item) => {
                      return <h2 key={item.id}>{item.title}</h2>;
                    })
                  : ""
                // <h2>"no products found"</h2>
              }
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SearchProduct;
