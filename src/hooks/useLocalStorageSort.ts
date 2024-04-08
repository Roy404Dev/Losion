import { LocalStorageDatasType } from "@/components/layout/BoardView/BoardViewLayout";
import { TaskType } from "@/state/taskSlice/taskSlice";
import { useParams } from "react-router";

export const useLocalStorageSort = (
  tasks: TaskType[] | undefined
): TaskType[] | undefined => {
  const params = useParams();
  const data: LocalStorageDatasType[] | undefined = JSON.parse(
    localStorage.getItem(`taskOrder-${params.id}`) || "[]"
  );

  if (!tasks || tasks.length === 0) {
    return tasks; // Return tasks as is if no tasks are provided
  }

  if (!data || data.length === 0) {
    return tasks?.slice(); // Return tasks without sorting if data doesn't exist
  }

  const sortingTasks = tasks?.slice().sort((a: TaskType, b: TaskType) => {
    const aCopy = { ...a }; // Create a shallow copy of 'a'
    const bCopy = { ...b }; // Create a shallow copy of 'b'

    if (localStorage.getItem(`taskOrder-${params.id}`) !== null) {
      if (data[0]?.taskId === aCopy.id) {
        aCopy.order = data[0].order - 1; // Update the copy
      }
      if (data[0]?.taskId === bCopy.id) {
        bCopy.order = data[0].order - 1; // Update the copy
      }
    }

    if (aCopy.order != null && bCopy.order != null) {
      return aCopy.order - bCopy.order;
    }
    return 0;
  });

  return sortingTasks;
};
