import ContextMenuButton from "../ContextMenuButton/ContextMenuButton";
import "./ItemContextMenu.scss";

function ItemContextMenu({
  xPos,
  yPos,
  onOpen,
  onRemove,
  allowRemove,
  isInQuickAccess,
  onQuickAccessAdd,
  allowQuickAccess,
  onQuickAccessRemove,
}) {
  return (
    <div
      className="item-context-menu"
      style={{ top: `${yPos}px`, left: `${xPos}px` }}
    >
      <ContextMenuButton name="Open" openNewFileDialog={() => onOpen()} />

      {allowQuickAccess ? (
        <>
          {!isInQuickAccess ? (
            <ContextMenuButton
              name="Add to Quick Access"
              openNewFileDialog={() => onQuickAccessAdd()}
            />
          ) : (
            <ContextMenuButton
              name="Remove From Quick Access"
              openNewFileDialog={() => onQuickAccessRemove()}
            />
          )}
        </>
      ) : (
        <></>
      )}
      {allowRemove ? (
        <ContextMenuButton name="Delete" openNewFileDialog={() => onRemove()} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default ItemContextMenu;
