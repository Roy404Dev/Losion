import Header from "../../components/layout/Header/Header";
import ChevronArrowRight from "../../assets/interface/ArrowRight";

import "./LandingPage.scss";
import { SignInButton, SignOutButton } from "@clerk/clerk-react";
const LandingPage = () => {
  // const user = useUser();
  // console.log(user.user?.id);
  return (
    <div className="landing-page">
      <SignOutButton>
        <button>signout</button>
      </SignOutButton>
      <Header />
      <main className="main-page">
        <h1 className="primary-heading">
          Write, plan, share. With AI at your side.
        </h1>
        <h2 className="secondary-heading">
          Notion is the connected workspace where better, faster work happens.
        </h2>
        <SignInButton mode="modal">
          <button className="get-losion-free" aria-label="get losion free">
            Get Losion free <ChevronArrowRight />
          </button>
        </SignInButton>
        <img
          className="background-image"
          srcSet="/home-hero.webp 1x, /home-hero.webp 2x"
          alt="background image"
        />
      </main>
    </div>
  );
};

export default LandingPage;
