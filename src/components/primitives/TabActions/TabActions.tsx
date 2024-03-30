import HorizontalElipsis from "@/assets/interface/HorizontalElipsis";
import "./TabActions.scss";
import PlusIcon from "@/assets/interface/PlusIcon";
import { Dispatch, SetStateAction, useState } from "react";
import TabModal from "@/components/modals/TabModal/TabModal";

type TabActionsType = {
  modalState: boolean;
  setModalState: Dispatch<SetStateAction<boolean>>;
};

const TabActions = ({ modalState, setModalState }: TabActionsType) => {
  return (
    <div className="TabActions">
      <div className="TabActions__wrapper">
        <button
          className="tabAction-show-more tabActionBtn"
          onClick={() => setModalState(!modalState)}
        >
          <HorizontalElipsis />
        </button>
        <button className="tabAction-add-page tabActionBtn">
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};

export default TabActions;
