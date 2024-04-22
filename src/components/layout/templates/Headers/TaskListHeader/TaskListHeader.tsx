import ClockIcon from "@/assets/interface/ClockIcon";
import HorizontalElipsis from "@/assets/interface/HorizontalElipsis";
import StarIcon from "@/assets/interface/icons/StarIcon";
import { TabsState } from "@/state/tab/tabSlice";
import "./TaskListHeader.scss";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "@/state/hamburger/hamburgerSlice";
import { RootState } from "@/state/store";
import { useParams } from "react-router";
import FilledStarIcon from "@/assets/interface/FilledStarIcon";

const TaskListHeader = ({ tabs }: TabsState) => {
  const params = useParams();
  const filter = tabs.filter((tab) => tab.id === params.id);
  const hamburgerMenuBoolean = useSelector(
    (state: RootState) => state.hamburger
  );
  const dispatch = useDispatch();
  const handleChangeEmoji = () => {
    console.log("test");
    //TODO
  };
  const isFavorite = filter[0]?.favorite;
  const addToFavorites = () => {
    //--save to localStorage to prevent unesasary database requests.--\\
    const favoriteTabsString = localStorage.getItem("fs-tabs");
    const favoriteTabs = favoriteTabsString
      ? JSON.parse(favoriteTabsString)
      : [];
    //Check if duplicate
    if (favoriteTabs.includes(params.id)) {
      const filteredTabs = favoriteTabs.filter(
        (tab: string) => tab !== params.id
      );
      localStorage.setItem("fs-tabs", JSON.stringify(filteredTabs));
    } else {
      localStorage.setItem(
        "fs-tabs",
        JSON.stringify([...favoriteTabs, params.id])
      );
    }
  };
  return (
    <div className="taskListLayout__header">
      <div className="taskListLayout__header-row">
        <div className="taskListLayout__header__left__content">
          <div className="task-name-wrapper">
            <div
              className="taskListLayout__header-hamburgerMenu"
              onClick={() =>
                dispatch(
                  toggleMenu({
                    isHamburgerMenuSelected:
                      !hamburgerMenuBoolean.isHamburgerMenuSelected,
                  })
                )
              }
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
            <button
              className="task-change-tab-emoji"
              onClick={handleChangeEmoji}
            >
              <span className="task-name__emoji">{tabs[0]?.emoji}</span>
            </button>
            <span className="task-name">
              {tabs[0]?.name === "" ? "Untitled" : tabs[0]?.name}
            </span>
          </div>
        </div>
        <div className="taskListLayout__header__right__content">
          <span className="edited-time-stamp">Edited 2d ago</span>
          <button className="share-btn">share</button>
          <button
            className="view-all-updates"
            aria-labelledby="view all updates"
            aria-label="view all updates"
          >
            <ClockIcon />
          </button>
          <button
            className={`add-to-favorite`}
            aria-label="add to favorite"
            onClick={() => addToFavorites()}
          >
            {isFavorite ? <FilledStarIcon /> : <StarIcon />}
          </button>
          <button
            className="more-btn"
            aria-labelledby="Style, export and more"
            aria-label="show more"
          >
            <HorizontalElipsis />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskListHeader;
