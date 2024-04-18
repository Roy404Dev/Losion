import React, { useEffect } from "react";

export const useDragger = () => {
  const [node, setNode] = React.useState<HTMLElement | null>(null);

  const ref = React.useCallback((nodeEle: HTMLDivElement) => {
    setNode(nodeEle);
  }, []);

  const handleMouseDown = React.useCallback(
    () => {
      if (!node) {
        return;
      }
      // const startPos = {
      //   width: node.clientWidth,
      //   x: e.clientX,
      //   y: e.clientY,
      // };
      const handleMouseMove = (e: MouseEvent) => {
        setTimeout(() => {
          if (node && node.parentElement) {
            if (e.clientX > 200 && e.clientX < 500) {
              node.parentElement.style.width = `${e.clientX + 60}px`;
            }
          }
        }, 200);
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [node]
  );

  useEffect(() => {
    if (!node) {
      return;
    }
    const asideDraggerEl = document.createElement("div");
    asideDraggerEl.classList.add("aside-dragger");

    asideDraggerEl.addEventListener("mousedown", handleMouseDown);
    node.appendChild(asideDraggerEl);
    return () => {
      asideDraggerEl.removeEventListener("mousedown", handleMouseDown);
      node.removeChild(asideDraggerEl);
    };
  }, [node]);
  return [ref];
};
