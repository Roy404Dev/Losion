import ClockIcon from "@/assets/interface/ClockIcon";
import SearchIcon from "@/assets/interface/SearchIcon";
import SettingsIcon from "@/assets/interface/UI/SettingsIcon";
import TabComponent from "@/components/primitives/TabComponent/TabComponent";
import "./ActionTab.scss";

const ActionTabs = () => {
  return (
    <ul className="app-aside-action-tabs">
      <TabComponent className="aside-action-tab" dataValue={-1} tabId="null">
        <button className="task-tab-button action-tab-button">
          <SearchIcon />
          Search
        </button>
      </TabComponent>
      <TabComponent className="aside-action-tab" dataValue={-1} tabId="null">
        <button className="task-tab-button action-tab-button">
          <ClockIcon />
          Updates
        </button>
      </TabComponent>
      <TabComponent className="aside-action-tab" dataValue={-1} tabId="null">
        <button className="task-tab-button action-tab-button">
          <SettingsIcon />
          Settings & members
        </button>
      </TabComponent>
    </ul>
  );
};

export default ActionTabs;
