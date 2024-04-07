import "./BoardViewLayout.scss";
import BoardViewColumn from "../BoardViewColumn/BoardViewColumn";
import { TaskType } from "@/state/taskSlice/taskSlice";
import { useMemo } from "react";

type Props = {
  tasks?: TaskType[];
};

export type LocalStorageDatasType = {
  taskId: string;
  status: string;
  order: number;
};

const BoardViewLayout = ({ tasks }: Props) => {
  // const params = useParams();

  const sortingTasks = useMemo(
    () =>
      tasks?.slice().sort((a, b) => {
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
          tasks={sortingTasks}
          taskClassName="losion-task-status-todo"
        />
        <BoardViewColumn
          statusTitle="Doing"
          statusName="doing"
          tasks={sortingTasks}
          taskClassName="losion-task-status-doing"
        />
        <BoardViewColumn
          statusTitle="🙌Done"
          statusName="done"
          tasks={sortingTasks}
          taskClassName="losion-task-status-done"
        />
      </div>
    </div>
  );
};

export default BoardViewLayout;
