type tabModalActionContainerType = {
  selectedAction: string | null;
};

const TabModalActionContainer = ({
  selectedAction,
}: tabModalActionContainerType) => {
  return <div>{selectedAction}</div>;
};

export default TabModalActionContainer;
