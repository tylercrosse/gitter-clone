import React       from 'react';
import { connect } from 'react-redux';
import { Link }    from 'react-router';
import {
  openCreateRoomModal,
  closeModal,
  addConvo,
  fetchConvos }    from '../../actions';
import convosSelector from '../../selectors/convosSelector';
import directConvosSelector from '../../selectors/directConvosSelector';
import Panel       from './Panel';
// import                  './chatmenu.scss';

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
    /* istanbul ignore next: ignore leaving to minibar */
    if (e.clientX < 74) return;
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
                <li className="minibar-convos">
                  <Link
                  to={'/'}
                  className="minibar-button"
                  >G</Link>
                </li>
                <li className="minibar-search">
                  <button className="minibar-button minibar-button-search" onClick={this.handleMinibarButtonClick}>
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
  modalIsOpen: state.ui.modalIsOpen.createRoom,
  user: state.user,
  convos: convosSelector(state),
  directConvos: directConvosSelector(state)
});

export default connect(
  mapStateToProps,
  { openCreateRoomModal, closeModal, addConvo, fetchConvos }
)(ChatMenu);
