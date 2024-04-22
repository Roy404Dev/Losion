import ChevronDown from "@/assets/interface/ChevronDown";
import HorizontalElipsis from "@/assets/interface/HorizontalElipsis";
import SearchIcon from "@/assets/interface/SearchIcon";
import LightningIcon from "@/assets/interface/template/LightningIcon";
import "./CollectionActions.scss";
const CollectionActions = () => {
  //TODO create hook
  
  return (
    <ol className="losion-action-list">
      <li className="losion-collection-action">
        <button className="losion-collection-action-button" aria-label="filter">
          Filter
        </button>
      </li>
      <li className="losion-collection-action">
        <button className="losion-collection-action-button" aria-label="filter">
          Sort
        </button>
      </li>
      <li className="losion-collection-action">
        <button
          className="losion-collection-action-button"
          aria-label="lightning"
        >
          <LightningIcon />
        </button>
      </li>
      <li className="losion-collection-action">
        <button className="losion-collection-action-button" aria-label="search">
          <SearchIcon />
        </button>
      </li>
      <li className="losion-collection-action">
        <button className="losion-collection-action-button">
          <HorizontalElipsis />
        </button>
      </li>
      <li className="losion-collection-action">
        <button className="losion-collection-action-button action-new-button">
          New
          <ChevronDown />
        </button>
      </li>
    </ol>
  );
};

export default CollectionActions;
