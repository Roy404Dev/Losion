type propType = {
  additionalClassName: string;
};

const ChevronRight = ({ additionalClassName }: propType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="512"
      height="512"
      x="0"
      y="0"
      viewBox="0 0 512 512"
      fontStyle="enable-background:new 0 0 512 512"
      xmlSpace="preserve"
      className={`chevronRight ${additionalClassName}`}
    >
      <g>
        <path
          d="M121.373 457.373 322.745 256 121.373 54.627a32 32 0 0 1 45.254-45.254l224 224a32 32 0 0 1 0 45.254l-224 224a32 32 0 0 1-45.254-45.254z"
          fill="#000000"
          opacity="1"
          data-original="#000000"
          className="chevronRight"
        ></path>
      </g>
    </svg>
  );
};

export default ChevronRight;
