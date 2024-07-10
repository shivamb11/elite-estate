import { ClipLoader } from "react-spinners";

type SpinnerProps = {
  parentContainerClassName?: string;
  cssOverride?: React.CSSProperties;
};

function Spinner({ parentContainerClassName, cssOverride }: SpinnerProps) {
  return (
    <div className={parentContainerClassName}>
      <ClipLoader
        color={"#eab308"}
        cssOverride={cssOverride}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Spinner;
