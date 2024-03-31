import StarIcon from "@/assets/interface/icons/StarIcon";
import "./TabModal.scss";
import CopyLinkIcon from "@/assets/actionIcons/CopyLinkIcon";
import DuplicateIcon from "@/assets/actionIcons/DuplicateIcon";
import RenameIcon from "@/assets/actionIcons/RenameIcon";
import MoveToIcon from "@/assets/actionIcons/MoveToIcon";
import TrashIcon from "@/assets/interface/actions/TrashIcon";
import { deleteTab } from "@/api/deleteData";
// import { useSelector } from "react-redux";
// import { RootState } from "@/state/store";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "react-query";
import TabModalActionContainer from "./TabModalActionContainer";
import { MouseEvent, memo, useCallback, useState } from "react";

type tabModalType = {
  tab_id: string;
};

const TabModal = ({ tab_id }: tabModalType) => {
  // const userId = useSelector((state: RootState) => state.user)
  //TODO ADD THIS
  const [selectedAction, setSelectedAction] = useState<string | undefined>(
    undefined
  );
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const { mutateAsync: deleteTabMutation } = useMutation({
    mutationFn: deleteTab,
    onSuccess: () => queryClient.invalidateQueries(["tabs"]),
  });

  const clickEvent = (e: MouseEvent<HTMLElement>) => {
    setSelectedAction(e.currentTarget.dataset.id);
    console.log(e.currentTarget.dataset.id);
  };

  return (
    <div className="tab-modal">
      <div className="tab-modal__wrapper">
        {userId && (
          <ul className="tab-modal__actions-list">
            <li className="tab-modal__action">
              <button
                className="tab-modal__action-button"
                id="add-to-favorites"
              >
                <StarIcon />
                Add to Favorites
              </button>
            </li>
            <div className="tab-modal-divider-line"></div>
            <li
              className="tab-modal__action"
              data-id="copy-link"
              onClick={clickEvent}
            >
              <button className="tab-modal__action-button">
                <CopyLinkIcon />
                Copy link
              </button>
            </li>
            <li
              className="tab-modal__action"
              data-id="duplicate"
              onClick={clickEvent}
            >
              <button className="tab-modal__action-button">
                <DuplicateIcon />
                Duplicate
              </button>
            </li>
            <li
              className="tab-modal__action"
              data-id="rename"
              onClick={clickEvent}
            >
              <button className="tab-modal__action-button">
                <RenameIcon />
                Rename
              </button>
            </li>
            <li
              className="tab-modal__action"
              data-id="move-to"
              onClick={clickEvent}
            >
              <button className="tab-modal__action-button">
                <MoveToIcon />
                Move to
              </button>
            </li>
            <li
              className="tab-modal__action"
              data-id="delete"
              onClick={() =>
                deleteTabMutation({ tab_id: tab_id, user_id: userId })
              }
            >
              <button className="tab-modal__action-button">
                <TrashIcon />
                Delete
              </button>
            </li>
          </ul>
        )}
        <TabModalActionContainer selectedAction={null} />
      </div>
    </div>
  );
};

export default TabModal;
