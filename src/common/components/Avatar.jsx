import React from 'react';
import { connect } from 'react-redux';
import { findOrCreateDirectMessage } from '../actions/';

export class Avatar extends React.Component {

  handleClick() {
    // ignore if not logged in;
    if (!this.props.loggedInUser.loggedIn) return;

    // ignore if loggedInUser = target

    // build props and fire action
    const creatorId = this.props.loggedInUser.id;
    const targetIds = [this.props.user.id];
    this.props.findOrCreateDirectMessage({ creatorId, targetIds });
  }
  render() {
    const { user } = this.props;
    return (
      <div onClick={(e) => this.handleClick(e)}>
        <img
        className="avatar"
        src={'http://i.pravatar.cc/30?u=' + user.name} alt={user.name}
        />
      </div>
    );
  }
}

Avatar.propTypes = {
  user: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  loggedInUser: state.user
});

export default connect(
  mapStateToProps,
  { findOrCreateDirectMessage }
)(Avatar);
