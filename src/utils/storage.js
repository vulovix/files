import { defaultQuickAccess, defaultFileStructure } from "../root";

const MAIN_STORAGE_KEY = "xOS_Files";

export const StorageKeys = {
  quickAccess: "quickAccess",
  fileStructure: "fileStructure",
};
export function getStorage() {
  const defaultStorage = {
    quickAccess: defaultQuickAccess,
    fileStructure: defaultFileStructure,
  };
  const storage = localStorage.getItem(MAIN_STORAGE_KEY);
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
  localStorage.setItem(MAIN_STORAGE_KEY, JSON.stringify(storage));
}
