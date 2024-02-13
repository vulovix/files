const root = {
  Home: {
    type: "folder",
    files: {
      Documents: {
        type: "folder",
        files: {
          "document.txt": {
            type: "textfile",
            text: "[x] buy groceries\n[ ] walk the dog\n[x] learn react\n[ ] hit the gym",
          },
        },
      },
      Downloads: {
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
