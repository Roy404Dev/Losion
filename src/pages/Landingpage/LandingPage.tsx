import Header from "../../components/layout/Header/Header";
import ChevronArrowRight from "../../assets/interface/ArrowRight";

import "./LandingPage.scss";
import { SignInButton } from "@clerk/clerk-react";
const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <main className="main-page">
        <h1 className="primary-heading">
          Write, plan, share. With AI at your side.
        </h1>
        <h2 className="secondary-heading">
          Notion is the connected workspace where better, faster work happens.
        </h2>
        <SignInButton mode="modal" redirectUrl="taskList">
          <button className="get-losion-free" aria-label="get losion free">
            Get Losion free <ChevronArrowRight />
          </button>
        </SignInButton>
        <img
          className="background-image"
          srcSet="/home-hero.webp 1x, /home-hero.webp 2x"
          alt=""
        />
      </main>
    </div>
  );
};

export default LandingPage;
