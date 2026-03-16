import useWindowInnerWidth from "../../hooks/amey/useWindowInnerWidth";

const WindowInnerWidth = () => {
  const { width } = useWindowInnerWidth();
  return (
    <div>
      <h2>Window Inner Width</h2>
      <p>
        Current width: <strong>{width}px</strong>
      </p>
    </div>
  );
};

export default WindowInnerWidth;
