import "./Aside.scss";
import SearchIcon from "@/assets/interface/SearchIcon";
import ClockIcon from "@/assets/interface/ClockIcon";
import AddIcon from "@/assets/interface/AddIcon";
import TabComponent from "@/components/primitives/TabComponent/TabComponent";
import { useDragger } from "@/hooks/useDragger";
import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { AddPage } from "@/api/addData";
import PlusIcon from "@/assets/interface/PlusIcon";
import { getTabs } from "@/api/getData";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { addNewTab } from "@/state/tab/tabSlice";
import SettingsIcon from "@/assets/interface/UI/SettingsIcon";
import { RootState } from "@/state/store";
import { toggleMenu } from "@/state/hamburger/hamburgerSlice";
import { useNavigate } from "react-router";

const Aside = () => {
  const [ref] = useDragger();
  const dispatch = useDispatch();
  const user = useUser();
  let FetchRan = false;
  const queryClient = useQueryClient();
  const token = useSelector((state: RootState) => state.user.token);
  const { userId } = useAuth();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const hamburgerMenuBoolean = useSelector(
    (state: RootState) => state.hamburger
  );
  const navigate = useNavigate();

  const { data: tabsData } = useQuery({
    queryFn: () => getTabs(userId || ""),
    queryKey: ["tabs"],
    staleTime: 1000 * 60 * 60,
  });

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
  useEffect(() => {
    if (tabsData && !FetchRan && token != null) {
      dispatch(addNewTab({ tabs: tabsData }));
      //When aside is loaded navigate user to first tab
      navigate(`/${tabsData[0].id}`);
      //TODO
    }
    return () => {
      FetchRan = true;
    };
  }, [tabsData]);

  const selectedClassMobile = hamburgerMenuBoolean.isHamburgerMenuSelected
    ? "app-aside-tab-link-on-mobile--selected"
    : "app-aside-tab-link-on-mobile--notselected";

  return (
    <>
      {hamburgerMenuBoolean.isHamburgerMenuSelected && (
        <div className="transparent-bg-on-hamburger-menu" onClick={() => dispatch(toggleMenu({isHamburgerMenuSelected: false}))}></div>
      )}
      <aside
        className={`app-aside ${selectedClassMobile}`}
        data-drag="aside-drag"
      >
        <div className="app-aside-row" ref={ref}>
          <div className="app-aside-col">
            <div className="app-aside-top-user">
              <img
                className="user-profile-image"
                src={user.user?.imageUrl}
                alt="user image"
              />
              <span className="user-profile-firstname">
                {user.user?.firstName}
              </span>
            </div>
            <ul className="app-aside-action-tabs">
              <TabComponent
                className="aside-action-tab"
                dataValue={-1}
                tabId="null"
              >
                <button className="task-tab-button action-tab-button">
                  <SearchIcon />
                  Search
                </button>
              </TabComponent>
              <TabComponent
                className="aside-action-tab"
                dataValue={-1}
                tabId="null"
              >
                <button className="task-tab-button action-tab-button">
                  <ClockIcon />
                  Updates
                </button>
              </TabComponent>
              <TabComponent
                className="aside-action-tab"
                dataValue={-1}
                tabId="null"
              >
                <button className="task-tab-button action-tab-button">
                  <SettingsIcon />
                  Settings & members
                </button>
              </TabComponent>
              <TabComponent
                className="aside-action-tab"
                dataValue={-1}
                tabId="null"
              >
                <button
                  className="task-tab-button action-tab-button"
                  onClick={handleAddTab}
                >
                  <AddIcon />
                  New Page
                </button>
              </TabComponent>
            </ul>
            <ul className="app-aside-task-tabs">
              {tabsData &&
                tabsData.map((element, index) => (
                  <TabComponent
                    className="aside-task-tab"
                    dataValue={index + 1}
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                    key={index}
                    tabId={element.id}
                    showActions={true}
                    data={element}
                  >
                    <button className="task-tab-button">
                      {element.emoji} {element.name}
                    </button>
                  </TabComponent>
                ))}
            </ul>
            <button className="add-page-btn" onClick={handleAddTab}>
              <PlusIcon /> Add a page
            </button>
            <ul className="app-aside-settings">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Aside;
