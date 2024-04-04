import ClockIcon from "@/assets/interface/ClockIcon";
import HorizontalElipsis from "@/assets/interface/HorizontalElipsis";
import StarIcon from "@/assets/interface/icons/StarIcon";
import { TabsState } from "@/state/tab/tabSlice";
import "./TaskListHeader.scss";
const TaskListHeader = ({ tabs }: TabsState) => {
  // const [selectedEmoji, setSelectedEmoji] = useState("");

  const handleChangeEmoji = () => {};
  return (
    <div className="taskListLayout__header">
      <div className="taskListLayout__header-row">
        <div className="taskListLayout__header__left__content">
          <div className="task-name-wrapper">
            <div className="taskListLayout__header-hamburgerMenu">
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
          <button className="add-to-favorite" aria-label="add to favorite">
            <StarIcon />
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
