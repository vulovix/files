import { useState } from "react";
import { useFormInput, useHistoryStack } from "../Hooks/hooks";
import MenuBar from "../MenuBar/MenuBar";
import SideBar from "../Sidebar/Sidebar";
import Files from "../Files/Files";
import StatusBar from "../StatusBar/StatusBar";
import NewFileDialog from "../NewFileDialog/NewFileDialog";
import TextEdit from "../TextEdit/TextEdit";

import "./App.scss";

function App() {
  const searchInput = useFormInput("");
  const historyStack = useHistoryStack();

  const [newFileDialogOpen, setNewFileDialogOpen] = useState(false);
  const [newFileDialogType, setNewFileDialogType] = useState("folder");
  const [textEditOpen, setTextEditOpen] = useState(false);
  const [textEditFileName, setTextEditFileName] = useState("");
  const [textEditFileText, setTextEditFileText] = useState("");
  const defaultQuickAccess = ["Home", "Documents", "Downloads"];
  const [quickAccess, setQuickAccess] = useState(
    localStorage.getItem("xOS_Files_QuickAccess")
      ? JSON.parse(localStorage.getItem("xOS_Files_QuickAccess")) ||
          defaultQuickAccess
      : defaultQuickAccess
  );

  function openTextEdit(name) {
    const currentFolder = historyStack.currentFolder();

    const files = searchInput.value
      ? getSearchedFiles(currentFolder)
      : currentFolder;

    setTextEditOpen(true);
    setTextEditFileName(name);
    setTextEditFileText(files[name].text);
  }

  function closeTextEdit() {
    setTextEditOpen(false);
  }

  function saveChangesToFile(text) {
    setTextEditFileText(text);

    const files = searchInput.value
      ? getSearchedFiles(currentFolder)
      : historyStack.currentFolder();

    files[textEditFileName].text = text;
    localStorage.setItem("xOS_Files", JSON.stringify(historyStack.root()));
  }

  function createNewFile(name) {
    const currentFolder = historyStack.currentFolder();
    const sibilingLevel = Object.values(currentFolder)[0]?.level;

    console.log(sibilingLevel);

    if (newFileDialogType === "folder") {
      currentFolder[name] = {
        type: "folder",
        files: {},
        level: sibilingLevel,
      };
    } else {
      currentFolder[name] = {
        type: "textfile",
        text: "",
      };
    }

    historyStack.updateCurrentFolder(currentFolder);
    setNewFileDialogOpen(false);
    localStorage.setItem("xOS_Files", JSON.stringify(historyStack.root()));
  }

  function refreshFiles(newFiles) {
    historyStack.updateCurrentFolder(newFiles);
    localStorage.setItem("xOS_Files", JSON.stringify(historyStack.root()));
  }

  function getSearchedFiles(folder) {
    let files = {};
    for (const fileName in folder) {
      if (
        folder[fileName].type === "textfile" &&
        fileName.toLowerCase().includes(searchInput.value.toLowerCase())
      ) {
        files[fileName] = folder[fileName];
      } else {
        files = { ...files, ...getSearchedFiles(folder[fileName].files) };
      }
    }
    return files;
  }

  function openNewFileDialog(type) {
    if (!searchInput.value) {
      setNewFileDialogOpen(true);
      setNewFileDialogType(type);
    }
  }

  const currentFolder = historyStack.currentFolder();
  const files = searchInput.value
    ? getSearchedFiles(currentFolder)
    : currentFolder;

  const filesNames = Object.keys(files || {});

  const filesCount = filesNames.length;
  const textfilesCount = filesNames.filter(
    (fileName) => files[fileName].type === "textfile"
  ).length;

  const handleAddToQuickAccess = (name) => {
    setQuickAccess((s) => {
      localStorage.setItem(
        "xOS_Files_QuickAccess",
        JSON.stringify([...s, name])
      );
      return [...s, name];
    });
  };

  const handleRemoveFromQuickAccess = (name) => {
    setQuickAccess((s) => {
      const newQuickAccess = s.filter((folder) => folder !== name);
      localStorage.setItem(
        "xOS_Files_QuickAccess",
        JSON.stringify(newQuickAccess)
      );
      return newQuickAccess;
    });
  };

  return (
    <div id="window">
      <TextEdit
        text={textEditFileText}
        name={textEditFileName}
        isModalOpen={textEditOpen}
        closeTextEdit={() => closeTextEdit()}
        saveChangesToFile={(name) => saveChangesToFile(name)}
      />
      <NewFileDialog
        fileType={newFileDialogType}
        modalIsOpen={newFileDialogOpen}
        onClickSave={(name) => createNewFile(name)}
        onClickCancel={() => setNewFileDialogOpen(false)}
      />
      <div id="finder">
        <MenuBar
          searchInput={searchInput.value}
          onSearchInputChange={(e) => searchInput.onChange(e)}
          navigateForward={() => historyStack.navigateForward()}
          navigateBackward={() => historyStack.navigateBackward()}
          disableBackButton={historyStack.backwardHistory.length <= 1}
          disableForwardButton={historyStack.forwardHistory.length === 0}
        />
        <SideBar
          favorites={quickAccess}
          navigateToFavorite={(folderName) =>
            historyStack.navigateToFavorite(folderName)
          }
        />
        <Files
          files={files}
          quickAccess={quickAccess}
          refreshFiles={refreshFiles}
          openTextEdit={(name) => openTextEdit(name)}
          currentFolder={historyStack.currentFolder()}
          openNewFileDialog={(type) => openNewFileDialog(type)}
          addToQuickAccess={(name) => handleAddToQuickAccess(name)}
          removeFromQuickAccess={(name) => handleRemoveFromQuickAccess(name)}
          navigateToFolder={(name) => historyStack.navigateToFolder(name)}
        />
        <StatusBar filesCount={filesCount} textFilesCount={textfilesCount} />
      </div>
    </div>
  );
}

export default App;
