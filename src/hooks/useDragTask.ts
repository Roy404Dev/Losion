import React, { useEffect } from "react";
import { useParams } from "react-router";

type selectedTaskNewDataType = {
  task_id: null | string;
  status: string;
  order: null | number;
};

export const useDragTask = () => {
  const [node, setNode] = React.useState<HTMLElement | null>(null);
  const ref = React.useCallback((nodeEle: HTMLDivElement) => {
    setNode(nodeEle);
  }, []);

  const arrOfElements: HTMLElement[] = [];
  const ulElement = node?.parentElement as HTMLUListElement | null;

  if (ulElement) {
    ulElement.childNodes.forEach((childNode) => {
      if (
        childNode instanceof HTMLElement &&
        childNode.classList.contains("taskWrapper")
      ) {
        arrOfElements.push(childNode);
      }
    });
  }

  const params = useParams();

  const todoDimensions = document.querySelector(
    '[data-status="todo"]'
  ) as HTMLElement;
  const doingDimentions = document.querySelector(
    "[data-status=doing]"
  ) as HTMLElement;
  const doneDimentions = document.querySelector(
    "[data-status=done]"
  ) as HTMLElement;

  const selectedTaskNewData: selectedTaskNewDataType = {
    task_id: null,
    status: "",
    order: null,
  };

  const handleMouseDown = React.useCallback(
    (e: MouseEvent) => {
      if (!node) return;
      if (!todoDimensions || !doingDimentions || !doneDimentions) return;
      //clone a task
      const taskClone = node.cloneNode(true) as HTMLElement;
      //Constraints
      //Dont allow run when task at edit state
      //Dont allow when renaming or changing other properties of task's

      if (taskClone.dataset.edit === "true") return 0;

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
        x: e.clientX,
        y: e.clientY,
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
      const allTasks =
        taskCloneParent?.querySelectorAll<HTMLElement>("[data-id=task]");
      const tasksAmount = allTasks?.length || 0;

      const calcPosition = (
        dy: number,
        taskHeight: number,
        maxTasks: number
      ) => {
        if (maxTasks < Math.ceil(dy / taskHeight)) return maxTasks;
        if (Math.ceil(dy / taskHeight) < 0) return 1;
        return Math.ceil(Math.abs(dy) / taskHeight);
      };

      const applyStyle = (selectElement: HTMLElement) => {
        if (e.clientX > todoPosition.xStart && e.clientX < todoPosition.xEnd) {
          //Remove styles from previous
          allTasks?.forEach((element) => {
            element.style.boxShadow = "none";
          });
          //If selected element exists apply styles
          if (selectElement) {
            selectElement.style.boxShadow = "0 -5px 0 #2a4a6e inset";
          }
        } else {
          if (selectElement) {
            selectElement.style.boxShadow = "none";
          }
        }
      };
      //Tracks position and saves to localstorage.
      setTimeout(() => {
        localStorage.setItem(
          `taskOrder-${params.id}`,
          JSON.stringify([
            {
              taskId: node.dataset?.taskid,
              status: selectedTaskNewData.status,
              order: selectedTaskNewData.order,
            },
          ])
        );
      }, 1000);

      const handleMouseMove = (e: globalThis.MouseEvent) => {
        //taskClone.offsetWidth is added to make sure task is the same position as the cursor
        // const dx = e.clientX - startPos.x + taskClone.offsetWidth / 2;
        const dy = e.clientY - startPos.y + taskClone.offsetHeight / 2;
        todoDimensions.style.transition = "200ms ease";
        //Calculate position where should task be placed
        const position = calcPosition(dy, taskClone.clientHeight, tasksAmount);
        if (selectedTaskNewData.order != position)
          selectedTaskNewData.order = position;

        const selectElement = taskCloneParent?.querySelector(
          `[data-order="${position}"]`
        ) as HTMLElement;

        //Apply style to selected element
        applyStyle(selectElement);

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
        //Remove styles from previous

        allTasks?.forEach((element) => {
          element.style.boxShadow = "none";
        });
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










































//Will god save me?
