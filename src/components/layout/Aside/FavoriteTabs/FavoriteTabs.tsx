import TabComponent, {
  arrOfTabsType,
  tabDataType,
} from "@/components/primitives/TabComponent/TabComponent";
import "./FavoriteTabs.scss";
import { Dispatch, SetStateAction } from "react";

export type FavoriteTabsType = {
  tabsData: arrOfTabsType | null | undefined;
  selectedTab: number;
  setSelectedTab: Dispatch<SetStateAction<number>>;
};

const FavoriteTabs = ({
  tabsData,
  selectedTab,
  setSelectedTab,
}: FavoriteTabsType) => {
  const favoriteTabsString = localStorage.getItem("fs-tabs");
  const favoriteTabs = favoriteTabsString ? JSON.parse(favoriteTabsString) : [];
  return (
    <div className="favorite-tabs">
      <ul>
        {tabsData &&
          tabsData.map((e1: tabDataType, i: number) => {
            if (favoriteTabs.some((e2: string) => e2 === e1.id)) {
              // If there's a match
              return (
                <TabComponent
                  className="aside-task-tab"
                  dataValue={i + 1}
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                  key={i}
                  tabId={e1.id}
                  showActions={true}
                >
                  <button className="task-tab-button">
                    {e1.emoji} {e1.name}
                  </button>
                </TabComponent>
              );
            }
          })}
      </ul>
    </div>
  );
};

export default FavoriteTabs;
