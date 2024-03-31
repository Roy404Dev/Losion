import useTasks from "@/hooks/useTasks";
import BoardViewLayout from "../../BoardView/BoardViewLayout";
import "./TaskListLayout.scss";
import LightningIcon from "@/assets/interface/template/LightningIcon";
import SearchIcon from "@/assets/interface/SearchIcon";
import TableIcon from "@/assets/interface/icons/TableIcon";
import BoardIcon from "@/assets/interface/icons/BoardIcon";
import ChevronDown from "@/assets/interface/ChevronDown";
import HorizontalElipsis from "@/assets/interface/HorizontalElipsis";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useParams } from "react-router";
import { addNewTasks } from "@/state/taskSlice/taskSlice";
import TaskListHeader from "../Headers/TaskListHeader/TaskListHeader";
import { useCallback, useEffect, useState } from "react";
import { getEmoji } from "@/hooks/getEmoji";
import EmojiPicker from "@emoji-mart/react";
import { ModifyTab } from "@/state/tab/tabSlice";
import { useAuth } from "@clerk/clerk-react";
import { modifyTabAPI } from "@/api/modifyData";

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
    };
    dispatch(ModifyTab(dataObj));
    await modifyTabAPI({
      emoji: emoji,
      id: filterTabs[0].id,
      name: filterTabs[0].name,
      user_id: userId,
      tab_id: filterTabs[0].id,
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
              <li className="losion-collection-view-tab-button losion-collection-view-tab-button__selected">
                <button>
                  <BoardIcon />
                  Board View
                </button>
              </li>
              <li className="losion-collection-view-tab-button losion-collection-view-tab-table">
                <button>
                  <TableIcon />
                  Table
                </button>
              </li>
            </ul>
            <ol className="losion-action-list">
              <li className="losion-collection-action">
                <button className="losion-collection-action-button">
                  Filter
                </button>
              </li>
              <li className="losion-collection-action">
                <button className="losion-collection-action-button">
                  Sort
                </button>
              </li>
              <li className="losion-collection-action">
                <button className="losion-collection-action-button">
                  <LightningIcon />
                </button>
              </li>
              <li className="losion-collection-action">
                <button className="losion-collection-action-button">
                  <SearchIcon />
                </button>
              </li>
              <li className="losion-collection-action">
                <button className="losion-collection-action-button">
                  <HorizontalElipsis />
                </button>
              </li>
              <li className="losion-collection-action">
                <button className="losion-collection-action-button action-new-button">
                  New
                  <ChevronDown />
                </button>
              </li>
            </ol>
          </div>
          <BoardViewLayout tasks={filteredTasks} />
        </div>
      </div>
    </div>
  );
};

export default TaskListLayout;
