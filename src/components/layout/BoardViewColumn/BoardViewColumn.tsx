import { addTask } from "@/api/addData";
import { modifyTask } from "@/api/modifyData";
import PlusIcon from "@/assets/interface/PlusIcon";
import TaskLoader from "@/components/Loaders/TaskLoader/TaskLoader";
import TaskWrapper from "@/components/TaskWrapper/TaskWrapper";
import { useLocalStorageSort } from "@/hooks/useLocalStorageSort";
import { TaskType } from "@/state/taskSlice/taskSlice";
import { useUser } from "@clerk/clerk-react";
import { Reorder } from "framer-motion";
import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";

type BoardViewColumnType = {
  statusTitle: string;
  statusName: string;
  tasks?: TaskType[] | null;
  taskClassName: string;
};
//TODO

// const {} = use

const BoardViewColumn = ({
  statusTitle,
  statusName,
  tasks,
  taskClassName,
}: BoardViewColumnType) => {
  const user = useUser();
  // const dispatch = useDispatch();
  const params = useParams();
  const queryClient = useQueryClient();

  const filteredTasks = useMemo(
    () => tasks?.filter((task) => task.status === statusName),
    [tasks]
  );

  const useSort = useLocalStorageSort(filteredTasks) ?? filteredTasks;
  const { mutateAsync: addTaskMutation } = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["taskLayout"]);
    },
  });

  const { mutateAsync: modifyTaskMutation } = useMutation({
    mutationFn: modifyTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["taskLayout"]);
    },
  });

  const [isEditable, setIsEditable] = useState({
    taskId: "",
  });

  const handleAddTask = async () => {
    if (user.user?.id && params.id) {
      try {
        const uniqueId = uuidv4();
        setIsEditable({
          taskId: uniqueId,
        });
        await addTaskMutation({
          id: uniqueId,
          table_name: "",
          property: "",
          status: statusName,
          user_id: user.user?.id,
          emoji: "",
          tab_id: params.id,
        });
        console.log("Tasks added successfully.");
      } catch (err) {
        console.error("Error adding tasks:", err);
      }
    }
  };

  const handleModify = async (
    name: string | undefined,
    emoji: string | undefined
  ) => {
    if (user.user?.id && params.id) {
      await modifyTaskMutation({
        table_name: name || "",
        property: "",
        status: statusName,
        user_id: user.user?.id,
        emoji: emoji || "",
        tab_id: params.id,
        task_id: isEditable.taskId,
      });
    }
    setIsEditable({
      taskId: "",
    });
  };

  return (
    <div className="BoardViewLayout_col" data-status={statusName}>
      <div className="losion-group-status">
        <span className={`losion-group-status-text ${taskClassName}`}>
          {statusTitle}
        </span>
        <span className="losion-group-count">{useSort?.length}</span>
      </div>
      <ul className="losion-tasks-group">
        {useSort ? (
          <Reorder.Group values={useSort} onReorder={(e) => console.log(e)}>
            {useSort.map((sortedTask, index) => (
              <TaskWrapper
                customKey={sortedTask.id}
                key={index}
                order={index + 1}
                customFunc={handleModify}
                editBoolean={isEditable}
                setEditBoolean={setIsEditable}
                emoji={sortedTask.emoji}
              >
                <span>{sortedTask.table_name}</span>
              </TaskWrapper>
            ))}
          </Reorder.Group>
        ) : (
          <TaskLoader />
        )}
        <li>
          <button className="add-new-task-btn" onClick={() => handleAddTask()}>
            <PlusIcon />
            New
          </button>
        </li>
      </ul>
    </div>
  );
};

export default BoardViewColumn;
