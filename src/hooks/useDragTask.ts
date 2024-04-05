import React, { useEffect } from "react";

export const useDragTask = () => {
  const [node, setNode] = React.useState<HTMLElement | null>(null);
  const ref = React.useCallback((nodeEle: HTMLDivElement) => {
    setNode(nodeEle);
  }, []);

  const todoDimensions = document.querySelector(
    '[data-status="todo"]'
  ) as HTMLElement;
  const doingDimentions = document.querySelector(
    "[data-status=doing]"
  ) as HTMLElement;
  const doneDimentions = document.querySelector(
    "[data-status=done]"
  ) as HTMLElement;

  const handleMouseDown = React.useCallback(
    (e: MouseEvent) => {
      if (!node) return;
      if (!todoDimensions || !doingDimentions || !doneDimentions) return;
      //clone a task
      const taskClone = node.cloneNode(true) as HTMLElement;
      taskClone.classList.add("task-clone-drag-mode");
      //Styles for clone
      taskClone.style.position = "absolute";
      taskClone.style.width = `${node.offsetWidth}px`;
      taskClone.style.opacity = `0.5`;
      //replace data atribute
      taskClone.setAttribute("data-id", "task-clone");
      //Append to parent
      node.parentElement?.appendChild(taskClone);

      const startPos = {
        left: taskClone.style.left,
        top: taskClone.style.top,
        x: taskClone.offsetLeft,
        y: taskClone.offsetTop,
      };
      //Dimensions
      const todoPosition = {
        xStart: todoDimensions.getBoundingClientRect().x,
        xEnd:
          todoDimensions.getBoundingClientRect().width +
          todoDimensions.getBoundingClientRect().x,
      };
      //Get task height and bottom
      const taskCloneParent = taskClone.parentElement;
      //Get all tasks from clone column
      const allTasks = taskCloneParent?.querySelectorAll("[data-id=task]");
      const tasksAmount = allTasks?.length;

      const handleMouseMove = (e: globalThis.MouseEvent) => {
        //taskClone.offsetWidth is added to make sure task is the same position as the cursor
        const dx = e.clientX - startPos.x + taskClone.offsetWidth / 2;
        const dy = e.clientY - startPos.y + taskClone.offsetHeight / 2;
        todoDimensions.style.transition = "200ms ease";
        const position = Math.ceil(Math.abs(dy) / taskClone.clientHeight);
        const selectElement = taskCloneParent?.querySelector(
          `[data-order="${position}"]`
        ) as HTMLElement;
        if (dx > todoPosition.xStart && dx < todoPosition.xEnd) {
          // todoDimensions.style.boxShadow = "0 5px 0 #2a4a6e inset";
          //Set style
          if (selectElement) {
            selectElement.style.boxShadow = "0 -5px 0 #2a4a6e inset";
          }
        } else {
          // todoDimensions.style.boxShadow = "none";
          if (selectElement) {
            selectElement.style.boxShadow = "none";
          }
        }
        requestAnimationFrame(() => {
          taskClone.style.top = `${e.clientY - taskClone.offsetHeight / 2}px`;
          taskClone.style.left = `${e.clientX - taskClone.offsetWidth / 2}px`;
        });
      };

      const handleMouseUp = () => {
        //Removes any event listener's
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        todoDimensions.style.boxShadow = "none";
        taskClone.remove();
      };
      //Adding event listener's
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [node]
  );

  useEffect(() => {
    if (!node) return;

    node.addEventListener("mousedown", handleMouseDown);

    return () => {
      node.removeEventListener("mousedown", handleMouseDown);
    };
  }, [node]);

  return [ref];
};
