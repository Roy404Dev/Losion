import "./BoardViewLayout.scss";
import BoardViewColumn from "../BoardViewColumn/BoardViewColumn";
import { TaskType } from "@/state/taskSlice/taskSlice";
import { useMemo } from "react";

type Props = {
  tasks?: TaskType[];
};


const BoardViewLayout = ({ tasks }: Props) => {

  const sortedTasks = useMemo(
    () =>
      tasks?.sort((a, b) => {
        if (a.order != null && b.order != null) {
          return a.order - b.order;
        }
        return 0;
      }),
    [tasks]
  );

  return (
    <div className="BoardViewLayout_wrapper">
      <div className="BoardViewLayout_rows">
        <BoardViewColumn
          statusTitle="To Do"
          statusName="todo"
          tasks={sortedTasks}
          taskClassName="losion-task-status-todo"
        />
        <BoardViewColumn
          statusTitle="Doing"
          statusName="doing"
          tasks={sortedTasks}
          taskClassName="losion-task-status-doing"
        />
        <BoardViewColumn
          statusTitle="🙌Done"
          statusName="done"
          tasks={sortedTasks}
          taskClassName="losion-task-status-done"
        />
      </div>
    </div>
  );
};

export default BoardViewLayout;
