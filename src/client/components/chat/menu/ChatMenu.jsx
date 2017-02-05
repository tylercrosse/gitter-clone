import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import { openModal,
  closeModal,
  addConvo }                from '../../../actions';
import CreateRoomModal      from './CreateRoomModal';
import                           './menu.scss';

export class ChatMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMinibarButtonClick = this.handleMinibarButtonClick.bind(this);
  }
  toggleActive() {
    this.setState((prevState) => ({
      active: !prevState.active
    }));
  }
  handleMouseLeave(e) {
    if (e.clientX < 74) return; // ignore leaving to minibar
    this.toggleActive();
  }
  handleMinibarButtonClick() {
    this.toggleActive();
  }
  render() {
    const active = this.state.active ? 'active' : '';
    return (
      <aside className="chat-menu">
        <section className="chat-menu-container">
          <nav className="minibar">
            <div className="minibar-inner">
              <ul>
                <li className="minibar-convos">G</li>
                <li className="minibar-search">
                  <button className="minibar-button" onClick={this.handleMinibarButtonClick}>
                    Q
                  </button>
                </li>
              </ul>
            </div>
          </nav>
          <section
            // className="chat-menu-panel active"
            className={'chat-menu-panel ' + active}
            onMouseLeave={this.handleMouseLeave}
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
                    onClick={this.props.openModal}
                    className="create-rooom-button"
                  >
                    Add a room
                  </button>
                  <CreateRoomModal
                    user={this.props.user}
                    modalIsOpen={this.props.modalIsOpen}
                    onRequestClose={this.props.closeModal}
                    onFormSubmit={this.props.addConvo}
                  />
                </div>
              </footer>
              <div className="panel-content scroller">
                <section className="primary-collection">
                  {/* links to Conversations */}
                </section>
              </div>
            </div>
          </section>
        </section>
      </aside>
    );
  }
}

ChatMenu.propTypes = {
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  addConvo: PropTypes.func.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

export const mapStateToProps = (state) => ({
  modalIsOpen: state.ui.modalIsOpen,
  user: state.user
});

export default connect(
  mapStateToProps,
  { openModal, closeModal, addConvo }
)(ChatMenu);
