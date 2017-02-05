import React,
  { PropTypes } from 'react';
import Modal    from 'react-modal';

export const CreateRoomModal = (props) => {
  return (
    <Modal
      contentLabel="Create Room Modal"
      isOpen={props.modalIsOpen}
      onRequestClose={props.onRequestClose}
      className="modal-content create-room-modal"
      overlayClassName="modal-overlay"
    >
      <header className="modal-header">
        <h1 className="modal-title">Hello modal!</h1>
        <button
          className="modal-close"
          onClick={props.onRequestClose}
        >
          x
        </button>
      </header>
      <section className="modal-body">
        Body
      </section>
      <footer className="modal-footer">
        Footer
      </footer>
    </Modal>
  );
};

CreateRoomModal.PropTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default CreateRoomModal;

