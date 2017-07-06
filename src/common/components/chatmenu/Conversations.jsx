import React from 'react';
import PropTypes from 'prop-types';
import CreateRoomModal from '../modals/CreateRoomModal';
import ConvoItem from './ConvoItem';

const Conversations = (props) => (
  <div className="panel-inner">
    <footer className="panel-footer">
      <div className="panel-footer-convos">
        <button
          onClick={props.openCreateRoomModal}
          className="create-rooom-button"
        >
          Add a room
        </button>
        <CreateRoomModal
          user={props.user}
          modalIsOpen={props.modalIsOpen}
          onRequestClose={props.closeModal}
          onFormSubmit={props.createConvo}
        />
      </div>
    </footer>
    <div className="panel-content scroller">
      <section className="primary-collection">
        {props.convos && Object.values(props.convos).map((convo) =>
          <ConvoItem
            key={convo.id}
            title={convo.name}
            {...convo}
          />
        )}
      </section>
    </div>
  </div>
);

Conversations.propTypes = {
  openCreateRoomModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  createConvo: PropTypes.func.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  convos: PropTypes.array.isRequired,
};

export default Conversations;
