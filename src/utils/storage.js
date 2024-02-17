import { defaultQuickAccess, defaultFileStructure } from "../root";

export const StorageKeys = {
  quickAccess: "quickAccess",
  fileStructure: "fileStructure",
};
export function getStorage() {
  const defaultStorage = {
    quickAccess: defaultQuickAccess,
    fileStructure: defaultFileStructure,
  };
  const storage = localStorage.getItem("xOS_Files");
  if (!storage) {
    return defaultStorage;
  }

  return JSON.parse(storage) || defaultStorage;
}

export function setStorage(key, value) {
  if (!key || !StorageKeys[key] || !value) {
    return;
  }
  const storage = getStorage();
  storage[key] = value;
  localStorage.setItem("xOS_Files", JSON.stringify(storage));
}
