import { useState } from "react";
import "../../styles/modal-action.scss";
import { modifyTabAPI } from "@/api/modifyData";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
type RenameActionType = {
  inputValue: string | undefined;
  inputEmoji: string | undefined;
  tab_id: string;
};

const RenameAction = ({ inputValue, inputEmoji, tab_id }: RenameActionType) => {
  const user = useSelector((state: RootState) => state.user);
  const userId = user.userId;
  const [input, setInput] = useState({
    inputValue: inputValue || "",
    inputEmoji: inputEmoji || "📄",
  });
  const queryClient = useQueryClient();
  const { mutateAsync: renameActionMutation } = useMutation({
    mutationFn: modifyTabAPI,
    onSuccess: () => queryClient.invalidateQueries(["tabs"]),
  });

  const handleRenameAction = async () => {
    if (!userId) return null;
    await renameActionMutation({
      emoji: input.inputEmoji,
      id: tab_id,
      name: input.inputValue,
      user_id: userId,
    });
  };

  return (
    <div
      className="rename-action modal-action"
      onClick={() => handleRenameAction()}
    >
      <div className="modal-action__wrapper">
        <button>{input.inputEmoji}</button>
        <input
          type="text"
          value={input.inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput({ ...input, inputValue: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default RenameAction;
