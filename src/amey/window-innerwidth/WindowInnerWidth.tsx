import useWindowInnerWidth from "../../hooks/amey/useWindowInnerWidth";

const WindowInnerWidth = () => {
  const { view } = useWindowInnerWidth();

  return (
    <div>
      <h2>Window Inner Width</h2>
      {view === "xs" ? (
        <h2>this is xs view</h2>
      ) : view === "sm" ? (
        <h2>this is sm view</h2>
      ) : view === "md" ? (
        <h2>this is md view</h2>
      ) : view === "lg" ? (
        <h2>this is lg view</h2>
      ) : view === "xl" ? (
        <h2>this is xl view</h2>
      ) : view === "xxl" ? (
        <h2>this is xxl view</h2>
      ) : (
        <h2>this is above xxl view</h2>
      )}
    </div>
  );
};

export default WindowInnerWidth;
