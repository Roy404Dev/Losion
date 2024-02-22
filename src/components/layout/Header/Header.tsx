import logo from "/logoBlack.svg";
import themeIcon from "@/assets/interface/themeIcon.svg";
import "./Header.scss";
const Header = () => {
  return (
    <header className="page-header">
      <div className="page-header-container-row">
        <div className="page-header-content-left">
          <img className="logo-image" src={logo} alt="logo" />
          <span className="header-app-name">Losion</span>
        </div>
        <div className="page-header-content-right">
          <button className="login-btn">Log in</button>
          <button className="get-losion-free">Get Lotion free</button>
          <button className="change-color-theme-icon">
            <img src={themeIcon} className="themeIcon" alt="Theme icon" />
            <ul>
              <li>
                <button>Light</button>
              </li>
              <li>
                <button>Dark</button>
              </li>
              <li>
                <button>System</button>
              </li>
            </ul>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
