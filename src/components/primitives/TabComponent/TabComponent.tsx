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

export type arrOfTabsType = tabDataType[];

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
  const selectedClassName =
    selectedTab === dataValue ? " aside-task-tab--selected" : "";

  return (
    <Link
      to={tabId ?? "/"}
      style={{ textDecoration: "none" }}
      className={`app-aside-tab-link app-aside-tab-link-on-mobile`}
    >
      <li
        className={`app-aside-tab ${className}${selectedClassName}`}
        onClick={handleClick}
        role="tab"
      >
        <button
          className="task-tab-show-more"
          onClick={() => setShowMore(!showMore)}
          aria-label="show more"
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
          <div
            className="modal-overlay-bg"
            onClick={() => setShowModal(!showModal)}
          ></div>
        </>
      )}
      {showModal && data && (
        <>
          <TabModal
            data={data}
            setShowModalState={setShowModal}
            showModalState={showModal}
          />
          <div
            className="modal-overlay-bg"
            onClick={() => setShowModal(!showModal)}
          ></div>
        </>
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
