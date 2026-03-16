import { useEffect, useState } from "react";

const useWindowInnerWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleMediaQueries = () => {
    if (width < 576) {
      return "xs";
    } else if (width < 768) {
      return "sm";
    } else if (width < 992) {
      return "md";
    } else if (width < 1200) {
      return "lg";
    } else if (width < 1400) {
      return "xl";
    } else {
      return "xxl";
    }
  };

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  console.log(width);

  return {
    width,
    view: handleMediaQueries(),
  };
};

export default useWindowInnerWidth;
