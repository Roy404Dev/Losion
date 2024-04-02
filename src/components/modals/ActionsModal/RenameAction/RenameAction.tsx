import { useState } from "react";
import "../../styles/modal-action.scss";
import { modifyTabAPI } from "@/api/modifyData";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import "./RenameAction.scss";
import EmojiPickerBtn from "@/components/primitives/EmojiPickerBtn/EmojiPickerBtn";
import { EmojiType } from "@/components/TaskWrapper/TaskWrapper";
import { getEmoji } from "@/hooks/getEmoji";
import { addModalAction } from "@/state/modalActions/modalActionsSlice";

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

  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  const { mutateAsync: renameActionMutation } = useMutation({
    mutationFn: modifyTabAPI,
    onSuccess: () => queryClient.invalidateQueries(["tabs"]),
  });

  const handleRenameAction = async () => {
    if (!userId) return null;
    //Toggle action
    dispatch(
      addModalAction({
        actionsInitial: {
          selectedAction: "",
          selectedTabId: "",
        },
      })
    );
    await renameActionMutation({
      emoji: input.inputEmoji,
      id: tab_id,
      name: input.inputValue,
      user_id: userId,
    });
  };

  const setEmoji = (e: EmojiType) => {
    const emoji = getEmoji(e);
    setInput({ ...input, inputEmoji: emoji });
  };

  return (
    <div
      className="rename-action modal-action"
      onKeyDown={(e) => (e.key === "Enter" ? handleRenameAction() : "")}
    >
      <div className="modal-action__wrapper">
        <EmojiPickerBtn state={input.inputEmoji} onChangeFunc={setEmoji} />
        <input
          className="modal-action-input"
          type="text"
          value={input.inputValue}
          placeholder="Untitled"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput({ ...input, inputValue: e.target.value })
          }
          tabIndex={0}
          maxLength={25}
        />
      </div>
    </div>
  );
};

export default RenameAction;
