import { useState } from "react";
import Modal from "../Modal/Modal";
import DialogButton from "../DialogButton/DialogButton";
import "./NewFileDialog.scss";

function NewFileDialog(props) {
  const { modalIsOpen, closeModal, fileType, onClickCancel } = props;

  const [fileNameInput, setFileNameInput] = useState("");

  function onClickSave() {
    if (!fileNameInput.trim()) {
      return;
    }
    props.onClickSave(fileNameInput.trim());
    setFileNameInput("");
  }

  return (
    <Modal modalIsOpen={modalIsOpen} closeModal={closeModal}>
      <div className="new-file-dialog">
        <header className="toolbar">
          Create New {fileType === "folder" ? "Folder" : "File"}
        </header>
        <main className="dialog-body">
          <label className="file-name-label">
            {fileType === "folder" ? "Folder" : "File"} Name:
          </label>
          <input
            autoFocus
            value={fileNameInput}
            type="text"
            className="file-name-input"
            onKeyDown={(e) => {
              if (e.key === "Enter") onClickSave();
            }}
            onChange={(e) => setFileNameInput(e.target.value)}
          ></input>
          <div className="dialog-buttons">
            <DialogButton
              onClickButton={onClickCancel}
              className="cancel"
              title="Cancel"
            />
            <DialogButton
              onClickButton={() => onClickSave()}
              className="save"
              title="Save"
            />
          </div>
        </main>
      </div>
    </Modal>
  );
}

export default NewFileDialog;
