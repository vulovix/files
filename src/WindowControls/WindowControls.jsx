import "./WindowControls.scss";

function WindowControls({
  onClickClose /*, onClickMinimize, onClickMaximize */,
}) {
  return (
    <div className="window-controls">
      <button
        onClick={() => onClickClose && onClickClose()}
        className="window-control close-window"
      >
        <img width={14} src="/images/close.png" />
      </button>
      {/* <button
        onClick={() => onClickMinimize && onClickMinimize()}
        className="window-control minimize-window"
      >
        <IconContext.Provider value={{ className: "window-control-icon" }}>
          <GrFormSubtract />
        </IconContext.Provider>
      </button>
      <button
        onClick={() => onClickMaximize && onClickMaximize()}
        className="window-control maximize-window"
      >
        <IconContext.Provider value={{ className: "window-control-icon" }}>
          <CgExpand />
        </IconContext.Provider>
      </button> */}
    </div>
  );
}

export default WindowControls;
