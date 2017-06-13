import React, { PropTypes } from 'react';
import CreateRoomModal      from '../modals/CreateRoomModal';
import ConvoItem            from './ConvoItem';

const Panel = (props) => {
  const active = props.active ? 'active' : '';
  return (
    <section
      onMouseLeave={props.onMouseLeave}
      // className="chat-menu-panel active"
      className={'chat-menu-panel ' + active}
    >
      <div className="brand-container">Gitter Clone</div>
      <header className="panel-header">
        <div className="panel-header-convos">
          <h2>All Conversations</h2>
        </div>
      </header>
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
              onFormSubmit={props.addConvo}
            />
          </div>
        </footer>
        <div className="panel-content scroller">
          <section className="primary-collection">
            {props.convos && Object.values(props.convos).map((convo) =>
              <ConvoItem
                key={convo.id}
                {...convo}
              />
            )}
          </section>
        </div>
      </div>
    </section>
  );
};

Panel.propTypes = {
  onMouseLeave: PropTypes.func.isRequired,
  openCreateRoomModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  addConvo: PropTypes.func.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

export default Panel;
