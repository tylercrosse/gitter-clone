import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../actions/';
import                 './welcome.scss';

export class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      username: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    // TODO better input validation
    if (!this.state.username.trim()) {
      return;
    }
    const { dispatch } = this.props;
    dispatch(signIn(this.state.username));
    this.setState({
      username: ''
    });
  }
  render() {
    return (
      <div className="welcome">
        <h1>Welcome!</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            placeholder="Enter username"
            value={this.state.username}
          />
          <button type="submit">
              Submit
            </button>
        </form>
      </div>
    );
  }
}

export default connect()(Welcome);
