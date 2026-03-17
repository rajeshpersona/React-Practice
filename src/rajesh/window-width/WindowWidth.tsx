import React, { useEffect, useState } from "react";
import { useWindowResize } from "../hook/useWindowResize";

export const WindowWidth = () => {
  const {resizeWidth} = useWindowResize();
  return (
    <>
      <p>{resizeWidth}</p>
      {resizeWidth < 576 // 577 >576
        ? "This is XS Section"
        : resizeWidth < 768
          ? "This is MD Section"
          : resizeWidth < 992
            ? "This is LG Section"
            : resizeWidth < 1200
              ? "This is XL Section"
              : resizeWidth < 1400
                ? "This is XXL Section"
                : ""}
    </>
  );
};
