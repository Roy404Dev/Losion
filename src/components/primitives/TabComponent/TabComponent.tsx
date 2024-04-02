import React, { Dispatch, SetStateAction, useState } from "react";
import "./TabComponent.scss";
import { Link } from "react-router-dom";
import ChevronRight from "@/assets/interface/ChevronRight";
import TabActions from "../TabActions/TabActions";
import TabModal from "@/components/modals/TabModal/TabModal";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import RenameAction from "@/components/modals/ActionsModal/RenameAction/RenameAction";

export type tabDataType = {
  created_at: string;
  emoji: string;
  id: string;
  modified_at: string;
  name: string;
  template_id: string;
  user_id: string;
};

type TabComponentType = {
  children: React.ReactNode;
  className: string;
  dataValue?: number;
  selectedTab?: number;
  tabId: string;
  setSelectedTab?: Dispatch<SetStateAction<number>>;
  showActions?: boolean;
  data?: tabDataType;
};

const TabComponent = ({
  children,
  className,
  dataValue,
  selectedTab,
  setSelectedTab,
  tabId,
  showActions,
  data,
}: TabComponentType) => {
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const selectedAction = useSelector(
    (state: RootState) => state.modalActions.actionsInitial
  );
  const showAction =
    selectedAction.selectedAction === "rename" &&
    selectedAction.selectedTabId === data?.id;

  const handleClick = () => {
    if (dataValue && setSelectedTab) {
      setSelectedTab(dataValue);
    }
  };

  return (
    <Link
      to={tabId ?? "/"}
      style={{ textDecoration: "none" }}
      className="app-aside-tab-link"
    >
      <li
        className={`app-aside-tab ${className}${
          selectedTab === dataValue ? " aside-task-tab--selected" : ""
        }`}
        onClick={handleClick}
        role="tab"
      >
        <button
          className="task-tab-show-more"
          onClick={() => setShowMore(!showMore)}
        >
          <ChevronRight
            additionalClassName={
              showMore
                ? "task-tab-show-more-active"
                : "task-tab-show-more-notActive"
            }
          />
        </button>
        {children}
        {showActions && (
          <TabActions modalState={showModal} setModalState={setShowModal} />
        )}
      </li>
      {showAction && data && (
        <>
          <RenameAction
            inputEmoji={data?.emoji}
            inputValue={data?.name}
            tab_id={data.id}
          />
          <div className="modal-overlay-bg"></div>
        </>
      )}
      {showModal && data && (
        <TabModal
          data={data}
          setShowModalState={setShowModal}
          showModalState={showModal}
        />
      )}
      {showMore && (
        <>
          <div className="BoardView-aside-tab" role="tab">
            <div className="BoardView-aside-tab__wrapper">
              <span>Board View</span>
            </div>
          </div>
          <div className="Table-aside-tab">
            <div className="Table-aside-tab__wrapper">
              <span>Table</span>
            </div>
          </div>
        </>
      )}
    </Link>
  );
};

export default TabComponent;
