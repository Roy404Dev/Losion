import EditIcon from "@/assets/interface/TaskIcons/EditIcon";
import "./TaskWrapper.scss";
import HorizontalElipsis from "@/assets/interface/HorizontalElipsis";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Picker from "@emoji-mart/react";
import PageIcon from "@/assets/interface/icons/PageIcon";
import ActionsModal from "../modals/ActionsModal/ActionsModal";
import { getEmoji } from "@/hooks/getEmoji";
import { useDragTask } from "@/hooks/useDragTask";

type taskWrapper = {
  children: JSX.Element;
  customKey: string;
  customFunc: (name: string | undefined, emoji: string | undefined) => void;
  setEditBoolean: Dispatch<SetStateAction<{ taskId: string }>>;
  editBoolean: {
    taskId: string;
  };
  emoji?: string;
  order: number;
};

export type EmojiType = {
  unified: string;
};

const TaskWrapper = ({
  children,
  customKey,
  editBoolean,
  setEditBoolean,
  customFunc,
  emoji,
  order
}: taskWrapper) => {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiData, setEmojiData] = useState<string | undefined>(undefined);
  const [showActionModal, setShowActionModal] = useState(false);
  let isEditable = editBoolean.taskId === customKey;
  const [ref] = useDragTask();

  const addEmoji = (e: EmojiType) => {
    const emoji = getEmoji(e);
    setEmojiData(emoji);
    setShowEmojiPicker(!showEmojiPicker);
  };

  let fetchRan = false;

  useEffect(() => {
    if (!fetchRan) {
      if (inputRef.current) {
        inputRef.current.focus();
        // Select the text inside the input element
        inputRef.current.select();
      }
      setEmojiData(emoji);
    }
    return () => {
      fetchRan = true;
    };
  }, []);

  return (
    <div
      className="taskWrapper"
      data-id="task"
      data-taskid={customKey}
      data-order={order}
      key={customKey}
      onKeyDown={(e) => (e.key === "Enter" ? customFunc(name, emojiData) : "")}
      ref={ref}
    >
      {showEmojiPicker && <Picker onEmojiSelect={addEmoji} />}
      <div className="taskWrapper-row-content">
        <button
          className="selectIconBtn"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          aria-label="select icon"
        >
          {emojiData ? (
            <span className="selectedEmoji">{emojiData}</span>
          ) : (
            <PageIcon />
          )}
        </button>
        {isEditable ? (
          <input
            placeholder="Type a name..."
            className="taskWrapper_editField"
            onChange={(e) => setName(e.target.value)}
            ref={inputRef}
            maxLength={25}
          />
        ) : (
          children
        )}
      </div>
      <div className="taskWrapper__hover-menu">
        <button
          className="task-edit-btn"
          onClick={() =>
            setEditBoolean(
              customKey === editBoolean.taskId
                ? { taskId: "" }
                : { taskId: customKey }
            )
          }
        >
          <EditIcon />
        </button>
        <button
          className="task-show-more"
          onClick={() => setShowActionModal(!showActionModal)}
        >
          <HorizontalElipsis />
        </button>
      </div>
      {showActionModal && <ActionsModal task_id={customKey} />}
    </div>
  );
};

export default TaskWrapper;
