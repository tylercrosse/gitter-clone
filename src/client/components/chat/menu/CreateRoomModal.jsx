import React from 'react';
import Modal from 'react-modal';

export const CreateRoomModal = (props) => {
  return (
    <Modal
      contentLabel="Create Room Modal"
      isOpen={props.modalIsOpen}
      className="modal-content create-room-modal"
      overlayClassName="modal-overlay"
    >
      <header className="modal-header">
        <h1 className="modal-title">Hello modal!</h1>
        <span className="modal-close">x</span>
      </header>
      <section className="modal-body">
        Body
      </section>
      <footer className="modal-footer">
        Footer
      </footer>
    </Modal>
  );
}

export default CreateRoomModal;
