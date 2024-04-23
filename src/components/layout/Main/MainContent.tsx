import AddPageModal from "@/components/modals/AddPageModal/AddPageModal";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import TaskListLayout from "../templates/taskList/TaskListLayout";

const MainContent = () => {
  const tabs = useSelector((state: RootState) => state.tab.tabs);
  const params = useParams();
  const filteredTabs = tabs.filter((tab) => tab.id === params.id);
  const templateId = filteredTabs.length > 0 ? filteredTabs[0].template_id : null;
  //Get favorites
  
  switch (templateId) {
    case 0:
      return <AddPageModal />;
    default:
      return <TaskListLayout />;
  }
};

export default MainContent;