import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {
  openCreateRoomModal,
  closeModal,
  openConvosPanel,
  openDirectMessagesPanel,
  closePanel,
} from '../../reducers/ui';
import { createConvo,
fetchConvos } from '../../reducers/convos';
import convosSelector from '../../selectors/convosSelector';
import directConvosSelector from '../../selectors/directConvosSelector';
import GitterCloneIcon from '../svgs/GitterCloneIcon';
import ConvosIcon from '../svgs/ConvosIcon';
import DirectIcon from '../svgs/DirectIcon';
import Panel from './Panel';

export class ChatMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }
  componentDidMount() {
    this.props.fetchConvos();
  }
  handleMouseLeave(e) {
    /* istanbul ignore next: ignore leaving to minibar */
    if (e.clientX < 74 || this.props.modalIsOpen) return;
    this.props.closePanel();
  }
  render() {
    return (
      <aside className="chat-menu">
        <section className="chat-menu-container">
          <nav className="minibar">
            <div className="minibar-inner">
              <ul>
                <li className="minibar-convos">
                  <Link to={'/'} className="minibar-button">
                    <GitterCloneIcon classes="minibar-icon icon-gitter-clone" />
                  </Link>
                </li>
                <li className="minibar-all">
                  <button
                    className="minibar-button minibar-button-search"
                    onClick={this.props.openConvosPanel}
                  >
                    <ConvosIcon classes="minibar-icon icon-convo" />
                  </button>
                </li>
                {this.props.user.loggedIn &&
                  <li className="minibar-direct">
                    <button
                      className="minibar-button minibar-button-search"
                      onClick={this.props.openDirectMessagesPanel}
                    >
                      <DirectIcon classes="minibar-icon icon-direct" />
                    </button>
                  </li>}
              </ul>
            </div>
          </nav>
          <Panel
            onMouseLeave={this.handleMouseLeave}
            active={this.props.panel.open}
            title={this.props.panel.title}
            inner={this.props.panel.inner}
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
  panel: state.ui.panel,
  convos: convosSelector(state),
  directConvos: directConvosSelector(state),
});

export default connect(mapStateToProps, {
  openCreateRoomModal,
  closeModal,
  createConvo,
  fetchConvos,
  openConvosPanel,
  openDirectMessagesPanel,
  closePanel
})(ChatMenu);
