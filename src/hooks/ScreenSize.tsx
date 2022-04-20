import { useState, useEffect } from "react";

export const useScreenSize = () => {
  const [size, setSize] = useState({ screenHeight: 0, screenWidth: 0 });

  useEffect(() => {
    const updateSize = () => {
      setSize(prevSize => ({
        ...prevSize,
        screenHeight: window.innerHeight,
        screenWidth: window.innerWidth
      }));
    };
    window.addEventListener("resize", updateSize);

    updateSize();
  }, []);

  return size;
};
