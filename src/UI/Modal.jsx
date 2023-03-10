import React from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";

export function Modal({ onClose, children, title }) {
  return createPortal(
    <React.Fragment>
      <div
        className="modal fade show"
        tabIndex="-1"
        role="dialog"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="close"
                aria-label="Fermer"
                onClick={onClose}
              >
                <span aria-hidden="true">x</span>
              </button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </React.Fragment>,
    document.body
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};
