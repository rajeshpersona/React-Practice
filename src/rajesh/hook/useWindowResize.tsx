import React, { useEffect, useState } from "react";

export const useWindowResize = () => {
  const [resizeWidth, setResizeWidth] = useState(window.innerWidth);

  const windowResize = () => {
    setResizeWidth(window.innerWidth);
  };

  useEffect(() => {
    addEventListener("resize", windowResize);
    return () => removeEventListener("resize", windowResize);
  }, []);

  return { resizeWidth };
};
