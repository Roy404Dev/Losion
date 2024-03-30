import StarIcon from "@/assets/interface/icons/StarIcon";
import "./TabModal.scss";
import CopyLinkIcon from "@/assets/actionIcons/CopyLinkIcon";
import DuplicateIcon from "@/assets/actionIcons/DuplicateIcon";
import RenameIcon from "@/assets/actionIcons/RenameIcon";
import MoveToIcon from "@/assets/actionIcons/MoveToIcon";
import TrashIcon from "@/assets/interface/actions/TrashIcon";
const TabModal = () => {
  return (
    <div className="tab-modal">
      <div className="tab-modal__wrapper">
        <ul className="tab-modal__actions-list">
          <li className="tab-modal__action">
            <button className="tab-modal__action-button">
              <StarIcon />
              Add to Favorites
            </button>
          </li>
          <li className="tab-modal__action">
            <button className="tab-modal__action-button"><CopyLinkIcon />Copy link</button>
          </li>
          <li className="tab-modal__action">
            <button className="tab-modal__action-button"><DuplicateIcon />Duplicate</button>
          </li>
          <li className="tab-modal__action">
            <button className="tab-modal__action-button"><RenameIcon />Rename</button>
          </li>
          <li className="tab-modal__action">
            <button className="tab-modal__action-button"><MoveToIcon />Move to</button>
          </li>
          <li className="tab-modal__action">
            <button className="tab-modal__action-button"><TrashIcon />Delete</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TabModal;
