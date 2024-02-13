import { useState } from "react";
import {
  useDoubleClick,
  useContextMenu,
  useHistoryStack,
} from "../Hooks/hooks";
import File from "../File/File";
import ContextMenu from "../ContextMenu/ContextMenu";
import ItemContextMenu from "../ItemContextMenu/ItemContextMenu";
import "./Files.scss";

function Files(props) {
  const [activeFile, setActiveFile] = useState("");
  const [isFileDoubleClick, registerFileClick] = useDoubleClick(300);
  const contextMenu = useContextMenu("files");
  const itemContextMenu = useContextMenu("item");
  const historyStack = useHistoryStack();

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
    const currentFolder = historyStack.currentFolder();
    delete currentFolder[itemContextMenu.element.id];
    historyStack.updateCurrentFolder(currentFolder);
    localStorage.setItem("xOS_Files", JSON.stringify(historyStack.root()));
    itemContextMenu.close();
    props.refreshFiles(currentFolder);
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
          xPos={itemContextMenu.position.x}
          yPos={itemContextMenu.position.y}
          onRemove={handleItemRemove}
          openNewFileDialog={(type) => openNewFileDialog(type)}
        />
      )}
      {files && Object.keys(files).length ? (
        Object.keys(files).map((fileName) => (
          <File
            isActive={fileName === activeFile}
            onClickFile={(e) => onClickFile(e, fileName)}
            onContextMenu={(e) => itemContextMenu.open(e)}
            key={fileName}
            name={fileName}
            type={files[fileName].type}
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
