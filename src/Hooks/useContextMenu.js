import { useState } from "react";

function useContextMenu(elm) {
  const [isOpen, setIsOpen] = useState(false);
  const [element, setElement] = useState();
  const [position, setPosition] = useState({
    x: null,
    y: null,
  });

  function close() {
    setIsOpen(false);
  }

  function open(e) {
    if (e.target.getAttribute("name") === elm) {
      setIsOpen(true);
      setElement(e.target);
      setPosition({ x: e.pageX, y: e.pageY });
    }
  }
  return { isOpen, position, close, open, element };
}

export default useContextMenu;
