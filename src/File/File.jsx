import "./File.scss";

function File({ name, type, isActive, onClickFile, ...props }) {
  return (
    <div
      name={name}
      className={`${isActive ? "active" : ""} file`}
      onClick={(e) => onClickFile(e, name)}
    >
      <div className="icon-wrapper">
        <div
          id={name}
          name="item"
          className={`${type} icon`}
          onContextMenu={(e) => {
            props.onContextMenu(e);
            e.stopPropagation();
            e.preventDefault();
          }}
        ></div>
      </div>
      <p className="name">{name}</p>
    </div>
  );
}

export default File;
