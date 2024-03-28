import HorizontalElipsis from "@/assets/interface/HorizontalElipsis";
import "./TabActions.scss";
import PlusIcon from "@/assets/interface/PlusIcon";
const TabActions = () => {
  return (
    <div className="TabActions">
      <div className="TabActions__wrapper">
        <button className="tabAction-show-more tabActionBtn">
          <HorizontalElipsis />
        </button>
        <button className="tabAction-add-page tabActionBtn">
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};

export default TabActions;
