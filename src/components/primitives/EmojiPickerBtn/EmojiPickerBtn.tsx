import { useState } from "react";
import Picker from "@emoji-mart/react";
import { EmojiType } from "@/components/TaskWrapper/TaskWrapper";

type Emojipicker = {
  state: string;
  onChangeFunc: (e: EmojiType) => void;
};

const EmojiPickerBtn = ({ state, onChangeFunc }: Emojipicker) => {
  const [togglePicker, setTogglePicker] = useState(false);
  return (
    <div className="emojiPickerBtn">
      <button
        className="emojiPickerBtn__button"
        onClick={() => setTogglePicker(!togglePicker)}
      >
        {state}
      </button>
      {togglePicker && (
        <Picker
          onEmojiSelect={(e: EmojiType) => {
            setTogglePicker(!togglePicker);
            onChangeFunc(e);
          }}
        />
      )}
    </div>
  );
};

export default EmojiPickerBtn;
