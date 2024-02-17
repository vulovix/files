import { useState, useEffect } from "react";
import { getStorage } from "../utils/storage";

function useHistoryStack() {
  const [backwardHistory, setBackwardHistory] = useState([]);
  const [forwardHistory, setForwardHistory] = useState([]);

  useEffect(() => {
    setBackwardHistory([getStorage().fileStructure]);
  }, []);

  const navigateBackward = () => {
    setForwardHistory((forwardHistory) => [...forwardHistory, currentFolder()]);
    setBackwardHistory((backwardHistory) =>
      backwardHistory.slice(0, backwardHistory.length - 1)
    );
    console.log("navigateBackward");
  };

  const navigateForward = () => {
    setBackwardHistory((backwardHistory) => [
      ...backwardHistory,
      forwardHistory[forwardHistory.length - 1],
    ]);
    setForwardHistory((forwardHistory) =>
      forwardHistory.slice(0, forwardHistory.length - 1)
    );
  };

  const navigateToFolder = (name) => {
    setBackwardHistory((backwardHistory) => {
      return [...backwardHistory, currentFolder()[name].files];
    });
    setForwardHistory([]);
  };

  const navigateToFavorite = (folderName) => {
    const root = backwardHistory[0];
    const homeDirectory = root["Home"];
    const folder =
      folderName === "Home" ? homeDirectory : homeDirectory.files[folderName];
    setBackwardHistory((backwardHistory) => [...backwardHistory, folder.files]);
    setForwardHistory([]);
  };

  const updateCurrentFolder = (updatedFolder) => {
    setBackwardHistory((backwardHistory) => [
      ...backwardHistory.slice(0, backwardHistory.length - 1),
      updatedFolder,
    ]);
  };

  const currentFolder = () => {
    return backwardHistory[backwardHistory.length - 1];
  };

  const root = () => {
    return backwardHistory[0];
  };

  return {
    backwardHistory,
    forwardHistory,
    currentFolder,
    root,
    navigateBackward,
    navigateForward,
    navigateToFolder,
    navigateToFavorite,
    updateCurrentFolder,
  };
}

export default useHistoryStack;
