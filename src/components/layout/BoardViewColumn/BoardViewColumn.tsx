import { addTask } from "@/api/addData";
import { modifyTask } from "@/api/modifyData";
import PlusIcon from "@/assets/interface/PlusIcon";
import TaskLoader from "@/components/Loaders/TaskLoader/TaskLoader";
import TaskWrapper from "@/components/TaskWrapper/TaskWrapper";
import { TaskType } from "@/state/taskSlice/taskSlice";
import { useUser } from "@clerk/clerk-react";
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

type ModifyType = {
  name: string;
  emoji: string;
};

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

  const sortedTasks = useMemo(
    () =>
      filteredTasks?.sort((a, b) => {
        if (a.order != null && b.order != null) {
          return a.order - b.order;
        }
        return 0;
      }),
    [filteredTasks]
  );

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

  const handleModify = async (name: string | undefined, emoji: string | undefined) => {
    console.log(emoji);
    console.log(name);
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
    <div className="BoardViewLayout_col">
      <div className="losion-group-status">
        <span className={`losion-group-status-text ${taskClassName}`}>
          {statusTitle}
        </span>
        <span className="losion-group-count">{filteredTasks?.length}</span>
      </div>
      <ul className="losion-tasks-group">
        {sortedTasks ? (
          sortedTasks.map((sortedTask, index) => (
            <TaskWrapper
              customKey={sortedTask.id}
              key={index}
              customFunc={handleModify}
              editBoolean={isEditable}
              setEditBoolean={setIsEditable}
              emoji={sortedTask.emoji}
            >
              <span>{sortedTask.table_name}</span>
            </TaskWrapper>
          ))
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
