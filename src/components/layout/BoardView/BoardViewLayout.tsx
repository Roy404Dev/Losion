import "./BoardViewLayout.scss";
import BoardViewColumn from "../BoardViewColumn/BoardViewColumn";
import { TaskType } from "@/state/taskSlice/taskSlice";
import { useMutation, useQueryClient } from "react-query";
import { addTask } from "@/api/addData";
import { modifyTask } from "@/api/modifyData";

type Props = {
  tasks?: TaskType[];
};

const BoardViewLayout = ({ tasks }: Props) => {
  return (
    <div className="BoardViewLayout_wrapper">
      <div className="BoardViewLayout_rows">
        <BoardViewColumn
          statusTitle="To Do"
          statusName="todo"
          tasks={tasks}
          taskClassName="losion-task-status-todo"
        />
        <BoardViewColumn
          statusTitle="Doing"
          statusName="doing"
          tasks={tasks}
          taskClassName="losion-task-status-doing"
        />
        <BoardViewColumn
          statusTitle="🙌Done"
          statusName="done"
          tasks={tasks}
          taskClassName="losion-task-status-done"
        />
      </div>
    </div>
  );
};

export default BoardViewLayout;
