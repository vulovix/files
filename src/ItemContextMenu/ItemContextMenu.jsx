import ContextMenuButton from "../ContextMenuButton/ContextMenuButton";
import "./ItemContextMenu.scss";

function ItemContextMenu({ xPos, yPos, openNewFileDialog, onRemove }) {
  return (
    <div
      className="item-context-menu"
      style={{ top: `${yPos}px`, left: `${xPos}px` }}
    >
      {/* <ContextMenuButton name="Rename" openNewFileDialog={() => onRemove()} /> */}
      <ContextMenuButton
        name="Delete"
        openNewFileDialog={() => onRemove()}
        // openNewFileDialog={() => openNewFileDialog("textfile")}
      />
    </div>
  );
}

export default ItemContextMenu;
