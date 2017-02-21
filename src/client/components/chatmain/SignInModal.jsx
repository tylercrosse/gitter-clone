import React,
  { PropTypes } from 'react';
import Modal    from 'react-modal';

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
    // TODO input validation
    this.props.onFormSubmit(this.state.name);
    this.setState({
      name: ''
    });
    this.props.onRequestClose();
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
            placeholder="Converation Name"
            type="text"
            autoFocus
            autoComplete="off"
            />
            <button type="submit">Send</button>
          </form>
        </section>
        <footer className="modal-footer" />
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
