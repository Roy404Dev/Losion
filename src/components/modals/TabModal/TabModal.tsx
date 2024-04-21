import StarIcon from "@/assets/interface/icons/StarIcon";
import "./TabModal.scss";
import CopyLinkIcon from "@/assets/actionIcons/CopyLinkIcon";
import DuplicateIcon from "@/assets/actionIcons/DuplicateIcon";
import RenameIcon from "@/assets/actionIcons/RenameIcon";
import MoveToIcon from "@/assets/actionIcons/MoveToIcon";
import TrashIcon from "@/assets/interface/actions/TrashIcon";
import { deleteTab } from "@/api/deleteData";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "react-query";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import { tabDataType } from "@/components/primitives/TabComponent/TabComponent";
import { useDispatch } from "react-redux";
import { addModalAction } from "@/state/modalActions/modalActionsSlice";

type TabModalType = {
  data: tabDataType;
  showModalState: boolean;
  setShowModalState: Dispatch<SetStateAction<boolean>>;
};

const TabModal = ({
  data,
  showModalState,
  setShowModalState,
}: TabModalType) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { userId } = useAuth();

  const { mutateAsync: deleteTabMutation } = useMutation({
    mutationFn: deleteTab,
    onSuccess: () => queryClient.invalidateQueries(["tabs"]),
  });
  const clickEvent = (e: MouseEvent<HTMLElement>, typeEvent: string) => {
    if (e.currentTarget.dataset.id) {
      dispatch(
        addModalAction({
          actionsInitial: {
            selectedAction: e.currentTarget.dataset.id,
            selectedTabId: data.id,
          },
        })
      );
    }

    switch (typeEvent) {
      case "addToFavorite":
        setShowModalState(!showModalState);
        break;
      case "copyLink":
        setShowModalState(!showModalState);
        break;
      case "duplicate":
        setShowModalState(!showModalState);
        break;
      case "rename":
        setShowModalState(!showModalState);
        break;
      case "moveTo":
        setShowModalState(!showModalState);
        break;
      case "deleteTab":
        deleteTabMutation({ tab_id: data.id, user_id: data.user_id });
        setShowModalState(!showModalState);
        break;
      default:
        setShowModalState(!showModalState);
    }
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
              onClick={(e) => clickEvent(e, "")}
            >
              <button className="tab-modal__action-button">
                <CopyLinkIcon />
                Copy link
              </button>
            </li>
            <li
              className="tab-modal__action"
              data-id="duplicate"
              onClick={(e) => clickEvent(e, "")}
            >
              <button className="tab-modal__action-button">
                <DuplicateIcon />
                Duplicate
              </button>
            </li>
            <li
              className="tab-modal__action"
              data-id="rename"
              onClick={(e) => clickEvent(e, "")}
            >
              <button className="tab-modal__action-button">
                <RenameIcon />
                Rename
              </button>
            </li>
            <li
              className="tab-modal__action"
              data-id="move-to"
              onClick={(e) => clickEvent(e, "")}
            >
              <button className="tab-modal__action-button">
                <MoveToIcon />
                Move to
              </button>
            </li>
            <li
              className="tab-modal__action"
              data-id="delete"
              onClick={(e) => clickEvent(e, "deleteTab")}
            >
              <button className="tab-modal__action-button">
                <TrashIcon />
                Delete
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default TabModal;
