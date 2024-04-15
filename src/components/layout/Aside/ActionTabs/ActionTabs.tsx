import { AddPage } from "@/api/addData";
import AddIcon from "@/assets/interface/AddIcon";
import ClockIcon from "@/assets/interface/ClockIcon";
import SearchIcon from "@/assets/interface/SearchIcon";
import SettingsIcon from "@/assets/interface/UI/SettingsIcon";
import TabComponent from "@/components/primitives/TabComponent/TabComponent";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "react-query";

type ActionTabs = {
  tabsData: any
}


const ActionTabs = ({tabsData}: ActionTabs) => {
  const { userId } = useAuth();

  const queryClient = useQueryClient();
  const { mutateAsync: addTabMutation } = useMutation({
    mutationFn: AddPage,
    onSuccess: () => queryClient.invalidateQueries(["tabs"]),
  });
  const handleAddTab = async () => {
    if (tabsData && tabsData?.length > 10) return null; //Check if tab limit isn't reached
    await addTabMutation({
      userId: userId,
      name: "Untitled",
      emoji: "",
      template_id: 0,
    });
  };
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
      <TabComponent className="aside-action-tab" dataValue={-1} tabId="null">
        <button
          className="task-tab-button action-tab-button"
          onClick={handleAddTab}
        >
          <AddIcon />
          New Page
        </button>
      </TabComponent>
    </ul>
  );
};

export default ActionTabs;
