import EditIcon from "@/assets/interface/TaskIcons/EditIcon";
import "./TaskWrapper.scss";
import HorizontalElipsis from "@/assets/interface/HorizontalElipsis";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Picker from "@emoji-mart/react";
import PageIcon from "@/assets/interface/icons/PageIcon";
import ActionsModal from "../modals/ActionsModal/ActionsModal";

type taskWrapper = {
  children: JSX.Element;
  customKey: string;
  customFunc: (name: string) => void;
  setEditBoolean: Dispatch<SetStateAction<{ taskId: string }>>;
  editBoolean: {
    taskId: string;
  };
  emoji?: string;
};

const TaskWrapper = ({
  children,
  customKey,
  editBoolean,
  setEditBoolean,
  customFunc,
  emoji,
}: taskWrapper) => {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiData, setEmojiData] = useState("");
  const [showActionModal, setShowActionModal] = useState(false);
  let isEditable = editBoolean.taskId === customKey;
  interface Emoji {
    unified: string;
    // Add more properties if necessary
  }
  if (emoji) {
    setEmojiData(emoji);
  }
  const addEmoji = (e: Emoji) => {
    let sym = e.unified.split("-");
    let codesArray: number[] = []; // Explicitly defining the type as number[]
    sym.forEach((el) => codesArray.push(parseInt(el, 16))); // Parse hexadecimal string to number
    let emoji = String.fromCodePoint(...codesArray);
    setEmojiData(emoji);
    setShowEmojiPicker(!showEmojiPicker);
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      // Select the text inside the input element
      inputRef.current.select();
    }
  }, []);
  return (
    <div
      className="taskWrapper"
      key={customKey}
      onKeyDown={(e) => (e.key === "Enter" ? customFunc(name) : "")}
    >
      {showEmojiPicker && <Picker onEmojiSelect={addEmoji} />}
      <div className="taskWrapper-row-content">
        <button
          className="selectIconBtn"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          {emojiData && isEditable ? (
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
