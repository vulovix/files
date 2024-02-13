import Modal from "../Modal/Modal";
import WindowControls from "../WindowControls/WindowControls";
import "./TextEdit.scss";

function TextEdit(props) {
  const { saveChangesToFile, closeTextEdit, isModalOpen, name, text } = props;

  return (
    <Modal modalIsOpen={isModalOpen}>
      <div className="text-edit">
        <header className="toolbar">
          <p className="file-name">
            <img width={14} src="/images/textfile.png" />
            &nbsp; {name}
          </p>
          <WindowControls onClickClose={closeTextEdit} />
        </header>
        <main className="text-edit-body">
          <textarea
            spellCheck="false"
            autoFocus
            onKeyDown={function (e) {
              if (
                e.key === "s" &&
                (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
              ) {
                e.preventDefault();
              }
            }}
            onChange={(e) => saveChangesToFile(e.target.value)}
            value={text}
            className="text-edit-editor"
          ></textarea>
        </main>
      </div>
    </Modal>
  );
}

export default TextEdit;
