import React from 'react';
import CreateRoomModal from './CreateRoomModal';
import            './menu.scss';

export class ChatMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMinibarButtonClick = this.handleMinibarButtonClick.bind(this);
    this.handleAddRoomClick = this.handleAddRoomClick.bind(this);
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
  handleAddRoomClick() {
    console.log('💬 add a room clicked');
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
                    onClick={this.handleAddRoomClick}
                    className="create-rooom-button"
                  >
                    Add a room
                  </button>
                  <CreateRoomModal modalIsOpen={false} />
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

export default ChatMenu;
