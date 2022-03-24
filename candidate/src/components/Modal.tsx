import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { CSSProperties } from "react";
import ReactDOM from "react-dom";
import "../styles/components/Modal.scss";

interface ModaProps {
  open: boolean;
  onClose: () => void;
}

const portalDiv = document.getElementById("portal")!;

const Modal: React.FC<ModaProps> = ({ onClose, open, children }) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div id="overlay-style"></div>
      <div id="modal-style">
        <Button className="closing-icon" onClick={onClose} color="primary">
          <CloseIcon fontSize="large" />
        </Button>
        {children}
      </div>
    </>,
    portalDiv
  );
};

export default Modal;
