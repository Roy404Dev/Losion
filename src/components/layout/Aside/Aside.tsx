import "./Aside.scss";
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
import { RootState } from "@/state/store";
import { toggleMenu } from "@/state/hamburger/hamburgerSlice";
import { useNavigate } from "react-router";
import ActionTabs from "./ActionTabs/ActionTabs";

const Aside = () => {
  const [ref] = useDragger();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useUser();
  let FetchRan = false;
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const hamburgerMenuBoolean = useSelector(
    (state: RootState) => state.hamburger
  );
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
    if (tabsData && !FetchRan) {
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
        <div
          className="transparent-bg-on-hamburger-menu"
          onClick={() =>
            dispatch(toggleMenu({ isHamburgerMenuSelected: false }))
          }
        ></div>
      )}
      <aside
        className={`app-aside ${selectedClassMobile} custom-scroll-bar`}
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
            <ActionTabs tabsData={tabsData} />
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
