import React,
  { PropTypes } from 'react';
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
      name: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      name: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const input = this.state.name;
    const validInput = validateInput(input);
    if (validInput) {
      this.props.onFormSubmit(input);
      this.setState({
        name: ''
      });
      this.props.onRequestClose();
    } else {
      // invalid input, TODO notify user
      alert('Invalid Input :(');
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
          <input
          onChange={this.handleChange}
          value={this.state.name}
          placeholder="User Name"
          type="text"
          autoFocus
          autoComplete="off"
          />
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

SignInModal.PropTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default SignInModal;
