const root = {
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
      Downloads: {
        level: 1,
        type: "folder",
        files: {
          "download.txt": {
            type: "textfile",
            text: "[x] buy groceries\n[ ] walk the dog\n[x] learn react\n[ ] hit the gym",
          },
        },
      },
    },
  },
};

export { root };
