import ClockIcon from "@/assets/interface/ClockIcon";
import SearchIcon from "@/assets/interface/SearchIcon";
import SettingsIcon from "@/assets/interface/UI/SettingsIcon";
import TabComponent from "@/components/primitives/TabComponent/TabComponent";
import "./ActionTab.scss";
export type ActionTabs = {
  tabsData: any;
};

const ActionTabs = ({ tabsData }: ActionTabs) => {
  // const { userId } = useAuth();

  // const queryClient = useQueryClient();
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
