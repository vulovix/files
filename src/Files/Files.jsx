import { useState } from "react";
import { useDoubleClick, useContextMenu } from "../Hooks/hooks";
import File from "../File/File";
import ContextMenu from "../ContextMenu/ContextMenu";
import ItemContextMenu from "../ItemContextMenu/ItemContextMenu";
import "./Files.scss";

function Files(props) {
  const [activeFile, setActiveFile] = useState("");
  const [isFileDoubleClick, registerFileClick] = useDoubleClick(300);
  const contextMenu = useContextMenu("files");
  const itemContextMenu = useContextMenu("item");

  const { files, navigateToFolder, openTextEdit } = props;

  function onClickFile(e, name) {
    e.preventDefault();
    setActiveFile(name);
    contextMenu.close();

    const type = files[name].type;
    if (isFileDoubleClick()) {
      type === "folder" ? navigateToFolder(name) : openTextEdit(name);
      setActiveFile("");
    }

    registerFileClick();
  }

  function onClickScreen(e) {
    e.preventDefault();
    if (e.target.id === "files") {
      setActiveFile("");
      contextMenu.close();
      itemContextMenu.close();
    }
  }

  function handleItemRemove() {
    props.removeFromQuickAccess(itemContextMenu.element.id);
    const c = props.currentFolder;
    delete c[itemContextMenu.element.id];
    props.refreshFiles(c);
    itemContextMenu.close();
  }

  function handleAddToQuickAccess() {
    props.addToQuickAccess(itemContextMenu.element.id);
    itemContextMenu.close();
  }

  function handleRemoveFromQuickAccess() {
    props.removeFromQuickAccess(itemContextMenu.element.id);
    itemContextMenu.close();
  }

  function openNewFileDialog(type) {
    contextMenu.close();
    props.openNewFileDialog(type);
  }

  return (
    <main
      id="files"
      name="files"
      onClick={(e) => onClickScreen(e)}
      onContextMenu={(e) => contextMenu.open(e)}
    >
      {contextMenu.isOpen && (
        <ContextMenu
          xPos={contextMenu.position.x}
          yPos={contextMenu.position.y}
          openNewFileDialog={(type) => openNewFileDialog(type)}
        />
      )}
      {itemContextMenu.isOpen && (
        <ItemContextMenu
          onRemove={handleItemRemove}
          xPos={itemContextMenu.position.x}
          yPos={itemContextMenu.position.y}
          onOpen={() => {
            const name = itemContextMenu.element.id;
            setActiveFile(name);
            itemContextMenu.close();
            const type = files[name].type;
            // setActiveFile("");
            if (type === "folder") {
              navigateToFolder(name);
            } else {
              openTextEdit(name);
            }
            registerFileClick();
          }}
          allowRemove={itemContextMenu.element.id !== "Home"}
          allowQuickAccess={
            files[itemContextMenu.element.id].type === "folder" &&
            files[itemContextMenu.element.id].level === 1
          }
          onQuickAccessAdd={() => handleAddToQuickAccess()}
          onQuickAccessRemove={() => handleRemoveFromQuickAccess()}
          isInQuickAccess={props.quickAccess.includes(
            itemContextMenu.element.id
          )}
        />
      )}
      {files && Object.keys(files).length ? (
        Object.keys(files).map((fileName) => (
          <File
            key={fileName}
            name={fileName}
            type={files[fileName].type}
            isActive={fileName === activeFile}
            onClickFile={(e) => onClickFile(e, fileName)}
            onContextMenu={(e) => itemContextMenu.open(e)}
          />
        ))
      ) : (
        <div
          style={{
            width: "100%",
            textWrap: "nowrap",
            color: "var(--color-text-lighter)",
          }}
        ></div>
      )}
    </main>
  );
}

export default Files;
