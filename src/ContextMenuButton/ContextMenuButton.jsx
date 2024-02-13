import "./ContextMenuButton.scss";

function ContextMenuButton({ name, openNewFileDialog }) {
  return (
    <>
      <button
        onClick={() => openNewFileDialog()}
        className={`context-menu-button ${name}`}
      >
        {name}
      </button>
    </>
  );
}

export default ContextMenuButton;
