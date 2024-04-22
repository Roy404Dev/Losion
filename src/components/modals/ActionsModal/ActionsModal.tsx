import { deleteTask } from "@/api/deleteData";
import TrashIcon from "@/assets/interface/actions/TrashIcon";
import "./ActionsModal.scss";
import { useMutation, useQueryClient } from "react-query";
import { useAuth } from "@clerk/clerk-react";

type actionModalProps = {
  task_id: string;
};
const ActionsModal = ({ task_id }: actionModalProps) => {
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  
  const { mutateAsync: deleteTaskMutation } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["taskLayout"]);
    },
  });

  const handleDelete = async () => {
    const data = await deleteTaskMutation({task_id: task_id, user_id: userId});
    return data;
  };

  return (
    <div className="actionsModal">
      <div className="actionsModal__wrapper">
        <input
          type="text"
          placeholder="Search actions..."
          className="actionsModal__searchInput"
        />
        <ul>
          <li>
            <TrashIcon />
            <button tabIndex={0} onClick={handleDelete}>
              Delete
            </button>
          </li>
          <li>
            <button>Duplicate</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ActionsModal;
