import useTasks from "@/hooks/useTasks";
import BoardViewLayout from "../../BoardView/BoardViewLayout";
import "./TaskListLayout.scss";
import TableIcon from "@/assets/interface/icons/TableIcon";
import BoardIcon from "@/assets/interface/icons/BoardIcon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useParams } from "react-router";
import { addNewTasks } from "@/state/taskSlice/taskSlice";
import TaskListHeader from "../Headers/TaskListHeader/TaskListHeader";
import { useEffect, useState } from "react";
import { getEmoji } from "@/hooks/getEmoji";
import EmojiPicker from "@emoji-mart/react";
import { ModifyTab } from "@/state/tab/tabSlice";
import { useAuth } from "@clerk/clerk-react";
import { modifyTabAPI } from "@/api/modifyData";
import PlusIcon from "@/assets/interface/PlusIcon";
import CollectionActions from "@/components/CollectionActions/CollectionActions";

const TaskListLayout = () => {
  const tasks = useTasks();
  const params = useParams();
  const { userId } = useAuth();
  const filteredTasks = tasks?.filter((task) => task.tab_id === params.id);
  const tabData = useSelector((state: RootState) => state.tab.tabs);
  const filterTabs = tabData.filter((tab) => tab.id === params.id);
  const dispatch = useDispatch();
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  let FetchRan = false;
  interface Emoji {
    unified: string;
  }
  useEffect(() => {
    const setState = () => {
      if (!FetchRan && tasks) {
        dispatch(addNewTasks(tasks));
      }
      FetchRan = true;
    };
    if (!FetchRan) setState();
    return () => {
      FetchRan = true;
    };
  }, [tasks]);

  // name: string | null
  const handleChangeEmoji = async (e: Emoji) => {
    if (!userId) return null;
    const emoji = getEmoji(e);
    if (emoji === selectedEmoji) return null;
    setSelectedEmoji(emoji);
    setShowEmojiPicker(!showEmojiPicker);
    const dataObj = {
      emoji: emoji,
      name: filterTabs[0].name,
      user_id: userId,
      template_id: filterTabs[0].template_id,
      content: filterTabs[0].content,
      id: filterTabs[0].id,
      favorite: filterTabs[0].favorite,
    };
    //TODO FIX HERE
    dispatch(ModifyTab(dataObj));
    await modifyTabAPI({
      emoji: emoji,
      name: filterTabs[0].name,
      user_id: userId,
      id: filterTabs[0].id,
    });
  };

  return (
    <div className="TaskListLayout">
      <TaskListHeader tabs={filterTabs} />
      <div className="TaskListLayout__content">
        <div className="taskListLayout__sub-message">
          <div className="task-name-wrapper">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="task-change-emoji"
            >
              <span className="task-name__emoji">{filterTabs[0]?.emoji}</span>
            </button>
            {showEmojiPicker && (
              <EmojiPicker onEmojiSelect={handleChangeEmoji} />
            )}
            <span className="task-name">{filterTabs[0]?.name}</span>
          </div>
          <p className="task-message-paragraph">
            Use this template to track your personal tasks. <br />
            Click{" "}
            <span className="task-message-paragraph__marked-word">
              + New
            </span>{" "}
            to create a new task directly on this board.
            <br /> Click an existing task to add additional context or subtasks.
          </p>
        </div>
        <div className="taskListLayout__wrapper">
          <div className="losion-selectable losion-collection_view_page-block">
            <ul className="losion-tab-list" role="tabList">
              <li
                className="losion-collection-view-tab-button losion-collection-view-tab-button__selected"
                role="tabElement"
              >
                <button>
                  <BoardIcon />
                  Board View
                </button>
              </li>
              <li
                className="losion-collection-view-tab-button losion-collection-view-tab-table"
                role="tabElement"
                aria-label="table"
              >
                <button>
                  <TableIcon />
                  Table
                </button>
              </li>
              <li
                className="losion-collection-view-tab-button"
                role="tabElement"
              >
                <button className="tab-list-add-btn">
                  <PlusIcon />
                </button>
              </li>
            </ul>
            <CollectionActions />
          </div>
          <BoardViewLayout tasks={filteredTasks} />
        </div>
      </div>
    </div>
  );
};

export default TaskListLayout;
