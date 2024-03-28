import { Dispatch, SetStateAction } from "react";
import './HamburgerMenu.scss';

type hamburgerMenuTypes = {
  isNavOpen: boolean;
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
};

const HamburgerMenu = ({ isNavOpen, setIsNavOpen }: hamburgerMenuTypes) => {
  return (
    <div className="hamburger-menu">
      <button
        className="hamburger-menu-button"
        id={isNavOpen ? "hamburger-menu-open" : "hamburger-menu-closed"}
        onClick={() => setIsNavOpen(!isNavOpen)}
      >
        <span></span>
      </button>
    </div>
  );
};

export default HamburgerMenu;
