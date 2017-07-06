import React from 'react';
import PropTypes from 'prop-types';
import Modal    from 'react-modal';

/**
 * Checks if input is valid:
 * - only alphanumeric characters plus single spaces & dashes
 * @param  {Object} input
 * @return {Boolean}      if input is valid or not
 */
export const validateInput = (input) => (
  input && /(^\w+[-]?\w*)[ ]?(\w*[-]?\w+$)/g.test(input)
);

export class SignInModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      validInput: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const input = e.target.value;
    const validInput = validateInput(input);
    if (!this.state.validInput && validInput) {
      // if valid input, change input & remove invalid message if any
      this.setState({
        name: input,
        validInput: true
      });
    } else {
      // change input but don't show invalid message until submitted
      this.setState({
        name: input
      });
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    const input = this.state.name;
    const validInput = validateInput(input);
    if (validInput) {
      // submit w/ valid input
      this.props.onFormSubmit(input);
      this.setState({
        name: '',
        validInput: true
      });
      this.props.onRequestClose();
    } else {
      // trigger invalid message on submit
      this.setState({
        validInput: false
      });
    }
  }
  render() {
    return (
      <Modal
      contentLabel="Create Room Modal"
      isOpen={this.props.modalIsOpen}
      onRequestClose={this.props.onRequestClose}
      className="modal-content create-room-modal"
      overlayClassName="modal-overlay"
      >
        <header className="modal-header">
          <h1 className="modal-title">Sign In</h1>
          <button
          className="modal-close"
          onClick={this.props.onRequestClose}
          >
            x
          </button>
        </header>
        <section className="modal-body">
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleChange}
              value={this.state.name}
              placeholder="User Name"
              type="text"
              autoFocus
              autoComplete="off"
            />
          </form>
          {!this.state.validInput &&
            <div className="validation-error">Invalid input! Please try Again.</div>}
        </section>
        <footer className="modal-footer">
          <button
          className="modal-footer-btn"
          onClick={this.handleSubmit}
          >
            Sign in
          </button>
        </footer>
      </Modal>
    );
  }
}

SignInModal.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default SignInModal;
