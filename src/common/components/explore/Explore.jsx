import React from 'react';
import PropTypes from 'prop-types';
import { Link }    from 'react-router';
import { connect } from 'react-redux';
// import                  './explore.scss';

export const Explore = (props) => (
  <div className="explore">
    <header className="explore-header">
      <div className="explore-header-logo">Gitter-clone</div>
      <nav className="explore-header-nav" />
      <h1>Explore</h1>
    </header>
    <section className="explore-page-description">
      <h3>Take a peak at some of the conversations</h3>
    </section>
    <section className="convo-card-list-section">
      {ConvoCards(props)}
    </section>
  </div>
);

export const ConvoCards = (props) => {
  const renderConvoCard = (convo) => (
    <Link
    key={convo.id}
    className="convo-card"
    to={'/' + convo.name}
    >
      <header className="convo-card-header">
        <img className="convo-card-avatar" src={'http://i.pravatar.cc/30?u=' + convo.name} alt={convo.name} />
        <h3>{convo.name}</h3>
      </header>
      <footer className="convo-card-footer">
        <div className="convo-card-info">X{/* convo.messages.length */} msgs</div>
        <div className="convo-card-action">
          <button>view</button>
        </div>
      </footer>
    </Link>
  );

  return (
    <div className="convo-card-list">
      {Object.values(props.convos).map(renderConvoCard)}
    </div>
  );
};

Explore.propTypes = {
  convos: PropTypes.object.isRequired,
};

export const mapStateToProps = (state) => ({
  convos: state.convos
});

export default connect(mapStateToProps)(Explore);
