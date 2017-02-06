import React       from 'react';
import { connect } from 'react-redux';
import {
  openModal,
  closeModal,
  addConvo,
  fetchConvos }       from '../../actions';
import Panel       from './Panel';
import                  './menu.scss';

export class ChatMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMinibarButtonClick = this.handleMinibarButtonClick.bind(this);
  }
  componentDidMount() {
    this.props.fetchConvos();
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
          <Panel
            onMouseLeave={this.handleMouseLeave}
            active={this.state.active}
            {...this.props}
          />
        </section>
      </aside>
    );
  }
}

export const mapStateToProps = (state) => ({
  modalIsOpen: state.ui.modalIsOpen,
  user: state.user,
  convos: state.convos
});

export default connect(
  mapStateToProps,
  { openModal, closeModal, addConvo, fetchConvos }
)(ChatMenu);
