import themeIcon from "@/assets/interface/themeIcon.svg";
import { Dispatch, SetStateAction } from "react";
import "./ColorTheme.scss";
type colorThemeType = {
  setColorTheme: Dispatch<SetStateAction<string>>;
  setIsListVisible: Dispatch<SetStateAction<boolean>>;
  isListVisible: boolean;
};

const ColorTheme = ({
  setColorTheme,
  setIsListVisible,
  isListVisible,
}: colorThemeType) => {
  const handleThemeChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    setColorTheme(e.currentTarget.id);
    setIsListVisible(!isListVisible);
  };

  return (
    <div className="button-change-color-theme">
      <button className="change-color-theme-icon">
        <img
          onClick={() => setIsListVisible(!isListVisible)}
          src={themeIcon}
          className="themeIcon"
          alt="Theme icon"
        />
      </button>
      {isListVisible && (
        <ul className="color-themes-list">
          <li>
            <button id="light-theme" onClick={(e) => handleThemeChange(e)}>
              Light
            </button>
          </li>
          <li>
            <button id="dark-theme" onClick={(e) => handleThemeChange(e)}>
              Dark
            </button>
          </li>
          <li>
            <button id="system-theme" onClick={(e) => handleThemeChange(e)}>
              System
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ColorTheme;
