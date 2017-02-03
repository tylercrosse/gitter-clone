import React from 'react';
import            './menu.scss';

export class ChatMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }
  toggleActive() {
    this.setState((prevState) => ({
      active: !prevState.active
    }));
  }
  handleClick() {
    this.toggleActive();
  }
  handleMouseLeave(e) {
    if (e.clientX < 74) return; // ignore leaving to minibar
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
                  <button className="minibar-button" onClick={this.handleClick}>
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
                  <a className="create-rooom-button">Add a room</a>
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
