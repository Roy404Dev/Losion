import { LocalStorageDatasType } from "@/components/layout/BoardView/BoardViewLayout";
import { TaskType } from "@/state/taskSlice/taskSlice";
import { useMemo } from "react";
import { useParams } from "react-router";

export const useLocalStorageSort = (
  tasks: TaskType[] | undefined
): TaskType[] | undefined => {
  if (!tasks) return undefined;
  const params = useParams();
  const data: LocalStorageDatasType[] = JSON.parse(
    localStorage.getItem(`taskOrder-${params.id}`) || "[]"
  );

  // Use useMemo to memoize the sorting logic
  const sortingTasks = useMemo(() => {
    return tasks?.slice().sort((a: TaskType, b: TaskType) => {
      const aCopy = { ...a }; // Create a shallow copy of 'a'
      const bCopy = { ...b }; // Create a shallow copy of 'b'
      if (localStorage.getItem(`taskOrder-${params.id}`) !== null) {
        console.log("invoked");
        if (data[0]?.taskId === aCopy.id) {
          aCopy.order = data[0].order; // Update the copy
        }
        if (data[0]?.taskId === bCopy.id) {
          bCopy.order = data[0].order; // Update the copy
        }
      }
      if (aCopy.order != null && bCopy.order != null) {
        return aCopy.order - bCopy.order;
      }
      return 0;
    });
  }, [tasks, params.id, data]); // Depend on 'tasks', 'params.id', and 'data'

  return sortingTasks;
};
