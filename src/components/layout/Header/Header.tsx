import logo from "/logoBlack.svg";
import "./Header.scss";
import { useState } from "react";
import { SignInButton } from "@clerk/clerk-react";
import ColorTheme from "../../colorTheme/ColorTheme";
import HamburgerMenu from "../../primitives/HamburgerMenu/HamburgerMenu";

const Header = () => {
  const [colorTheme, setColorTheme] = useState("light");
  const [isListVisible, setIsListVisible] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  console.log(colorTheme);
  //TODO
  return (
    <header className="page-header">
      <div className="page-header-container-row">
        <div className="page-header-content-left">
          <img className="logo-image" src={logo} alt="logo" />
          <span className="header-app-name">Losion</span>
        </div>
        <div className="page-header-content-right">
          <SignInButton
            mode="modal"
            afterSignInUrl="tasklist"
            redirectUrl="tasklist"
          >
            <button className="login-btn">Log in</button>
          </SignInButton>
          <SignInButton
            mode="modal"
            afterSignUpUrl="tasklist"
            redirectUrl="tasklist"
          >
            <button className="get-losion-free">Get Lotion free</button>
          </SignInButton>
          <ColorTheme
            isListVisible={isListVisible}
            setColorTheme={setColorTheme}
            setIsListVisible={setIsListVisible}
          />
        </div>
        <HamburgerMenu isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        <div className="menu" id={isNavOpen ? "menu-open" : "menu-closed"}>
          <SignInButton mode="modal">
            <button className="login-btn">Log in</button>
          </SignInButton>
          <SignInButton mode="modal">
            <button className="get-losion-free">Get Lotion free</button>
          </SignInButton>
          <ColorTheme
            isListVisible={isListVisible}
            setColorTheme={setColorTheme}
            setIsListVisible={setIsListVisible}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
