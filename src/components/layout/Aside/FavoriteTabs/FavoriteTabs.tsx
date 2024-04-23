import TabComponent, {
  arrOfTabsType,
  tabDataType,
} from "@/components/primitives/TabComponent/TabComponent";
import "./FavoriteTabs.scss";
import { Dispatch, SetStateAction } from "react";
import { RootState, store } from "@/state/store";
import { useSelector } from "react-redux";

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
  let favoriteTabs = useSelector(
    (state: RootState) => state.favorites.favoriteTab
  );
  store.subscribe(() => {
    favoriteTabs = store.getState().favorites.favoriteTab;
  });
  return (
    <div className="favorite-tabs">
      <ul>
        {tabsData &&
          tabsData.map((e1: tabDataType, i: number) => {
            if (
              favoriteTabs.some((e2: { tab_id: string }) => e2.tab_id === e1.id)
            ) {
              // If there's a match
              return (
                <TabComponent
                  className="aside-task-tab"
                  dataValue={i + 1}
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                  key={e1.id}
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
