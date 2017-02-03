import React from 'react';

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
  handleMouseLeave() {
    this.toggleActive();
  }
  render() {
    const active = this.state.active ? 'active' : '';
    return (
      <aside
        className="chat-menu"
        onMouseLeave={this.handleMouseLeave}
      >
        <section className="chat-menu-container">
          <nav className="minibar">
            <div className="minibar-inner">
              <ul>
                <li className="minibar-convos">G</li>
                <li className="minibar-search">
                  <button onClick={this.handleClick}>
                    Q
                  </button>
                </li>
              </ul>
            </div>
          </nav>
          <section className={'chat-menu-panel ' + active}>
            <div className="brand-container">Gitter Clone</div>
            <header className="panel-header">
              <div className="panel-header-convos">
                <h2>All Conversations</h2>
              </div>
            </header>
            <div className="panel-inner">
              {/* links to Conversations */}
            </div>
          </section>
        </section>
      </aside>
    );
  }
}

export default ChatMenu;
