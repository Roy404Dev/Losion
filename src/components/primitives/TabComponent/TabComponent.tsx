import React, { Dispatch, SetStateAction, useState } from "react";
import "./TabComponent.scss";
import { Link } from "react-router-dom";
import ChevronRight from "@/assets/interface/ChevronRight";
import TabActions from "../TabActions/TabActions";
import TabModal from "@/components/modals/TabModal/TabModal";

type TabComponentType = {
  children: React.ReactNode;
  className: string;
  dataValue?: number;
  selectedTab?: number;
  tabId: string;
  setSelectedTab?: Dispatch<SetStateAction<number>>;
  showActions?: boolean;
};

const TabComponent = ({
  children,
  className,
  dataValue,
  selectedTab,
  setSelectedTab,
  tabId,
  showActions,
}: TabComponentType) => {
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
      {showModal && <TabModal tab_id={tabId} />}
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
