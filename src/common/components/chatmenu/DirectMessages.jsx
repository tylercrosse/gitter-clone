import React, { PropTypes } from 'react';
import CreateRoomModal from '../modals/CreateRoomModal';
import ConvoItem from './ConvoItem';

const DirectMessages = (props) => {
  let directConvos;
  if (props.directConvos) {
    directConvos = Object.values(props.directConvos).map((convo) => {
      const namesArr = convo.users
        .map((user) => user.name)
        .filter((name) => name !== props.user.name);
      let title;
      if (namesArr.length === 1) title = namesArr[0];
      else if (namesArr.length <= 3) title = namesArr.join(', ');
      else if (namesArr.length > 3) {
        title = namesArr.slice(0, 3).join(', ') + ', ...';
      } else {
        // FIXME better error handling
        console.error('❌ name is messed up');
      }
      return <ConvoItem key={convo.id} title={title} {...convo} />;
    });
  }
  return (
    <div className="panel-inner">
      <footer className="panel-footer">
        <div className="panel-footer-convos">
          <button
            onClick={props.openCreateRoomModal}
            className="create-rooom-button"
          >
            Add a direct message
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
          {directConvos}
        </section>
      </div>
    </div>
  );
};

DirectMessages.propTypes = {
  openCreateRoomModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  createConvo: PropTypes.func.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  directConvos: PropTypes.array.isRequired
};

export default DirectMessages;
