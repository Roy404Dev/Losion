import { useState } from "react";

type RenameActionType = {
  inputValue: string;
  inputEmoji: string;
};

const RenameAction = ({ inputValue, inputEmoji }: RenameActionType) => {
  const [input, setInput] = useState({
    inputValue: inputValue || "",
    inputEmoji: inputEmoji || "",
  });
  return (
    <div className="rename-action modal-action">
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
