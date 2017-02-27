import React,
  { PropTypes } from 'react';
import Modal    from 'react-modal';

export class CreateRoomModal extends React.Component {
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
    this.props.onFormSubmit({
      name: this.state.name,
      username: this.props.user.username
    });
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
          <h1 className="modal-title">Create a room</h1>
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
          placeholder="Room name"
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
            Create
          </button>
        </footer>
      </Modal>
    );
  }
}

CreateRoomModal.PropTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default CreateRoomModal;

