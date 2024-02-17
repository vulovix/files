export const defaultFileStructure = {
  Home: {
    type: "folder",
    level: 0,
    files: {
      Documents: {
        type: "folder",
        level: 1,
        files: {
          "document.txt": {
            type: "textfile",
            text: "[x] buy groceries\n[ ] walk the dog\n[x] learn react\n[ ] hit the gym",
          },
        },
      },
      Notes: {
        level: 1,
        type: "folder",
        files: {
          "note.txt": {
            type: "textfile",
            text: "[x] buy groceries\n[ ] walk the dog\n[x] learn react\n[ ] hit the gym",
          },
        },
      },
    },
  },
};

export const defaultQuickAccess = ["Home", "Documents"];
