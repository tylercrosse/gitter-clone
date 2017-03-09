import React       from 'react';
import { connect } from 'react-redux';
import {
  signIn,
  openSignInModal,
  closeModal }     from '../../actions/';
import SignInModal from '../SignInModal.jsx';
import                  './welcome.scss';
import reactLogoSrc        from '../../assets/img/react.svg';
import reduxLogoSrc        from '../../assets/img/redux.svg';
import jestLogoSrc         from '../../assets/img/jest.svg';
import webpackLogoSrc      from '../../assets/img/webpack.svg';
import expressLogoSrc      from '../../assets/img/express.svg';
import mongodbLogoSrc      from '../../assets/img/mongodb.svg';
import semaphorLogoSrc     from '../../assets/img/semaphor.svg';
import digitaloceanLogoSrc from '../../assets/img/digitalocean.svg';

export const Welcome = (props) => (
  <div className="welcome">
    <header className="intro-panel">
      <nav className="site-nav">
        <div className="wrap">
          <button
          className="sign-in-btn"
          onClick={props.openSignInModal}
          >
            Sign in to start talking
          </button>
        </div>
      </nav>
      <div className="wrap">
        <h1>Welcome to Gitter Clone</h1>
        <p>This is app was built as portfolio piece representing a subset of the features of Troupe Technology&apos;s wonderful chat app, Gitter.</p>
        <div className="intro-panel-button-block">
          <a
          className="intro-panel-button button-caribbean"
          href="https://gitter.im/"
          target="_blank"
          rel="noreferrer noopener">Go to real Gitter.im</a>
          <a
          className="intro-panel-button button-subdued"
          href="/explore">Explore the clone</a>
        </div>
        <ul className="mini-features-list">
          <li>
            <h2>Built in React</h2>
            <span>Full stack chat app with React powered views.</span>
          </li>
          <li>
            <h2>Redux</h2>
            <span>The app state is controlled by Redux.</span>
          </li>
          <li>
            <h2>Markdown Support</h2>
            <span>Messages support bursts and git flavoured markdown.</span>
          </li>
        </ul>
      </div>
    </header>
    <section className="tech-panel">
      <h1>Check out the real Gitter.im</h1>
      <p>This is just a fan application. For the real Gitter messaging applcation go to
        <a
        href="https://gitter.im/"
        target="_blank"
        rel="noreferrer noopener"> gitter.im</a>.</p>
      <div className="wrap">
        <ul className="tech-icons">
          <li>
            <img className="react-logo"src={reactLogoSrc} alt="react logo" />
            <figcaption>React</figcaption>
          </li>
          <li>
            <img className="redux-logo"src={reduxLogoSrc} alt="redux logo" />
            <figcaption>Redux</figcaption>
          </li>
          <li>
            <img className="webpack-logo"src={webpackLogoSrc} alt="webpack logo" />
            <figcaption>Webpack</figcaption>
          </li>
          <li>
            <img className="express-logo"src={expressLogoSrc} alt="express logo" />
            <figcaption>Express</figcaption>
          </li>
          <li>
            <img className="mongodb-logo"src={mongodbLogoSrc} alt="mongodb logo" />
            <figcaption>MongoDB</figcaption>
          </li>
          <li>
            <img className="jest-logo"src={jestLogoSrc} alt="jest logo" />
            <figcaption>Jest</figcaption>
          </li>
          <li>
            <img className="semaphor-logo"src={semaphorLogoSrc} alt="semaphor logo" />
            <figcaption>SemaphorCI</figcaption>
          </li>
          <li>
            <img className="digitalocean-logo"src={digitaloceanLogoSrc} alt="digitalocean logo" />
            <figcaption>Digital Ocean</figcaption>
          </li>
        </ul>
      </div>
    </section>
    <footer className="bottom-panel">
      Built with <span className="heart">&lt;3</span> by
      <a
      href="http://tylercrosse.com/"
      target="_blank"
      rel="noreferrer noopener">Tyler Crosse</a>
      <div className="links">
        <a
        href="https://github.com/tylercrosse/gitter-clone"
        target="_blank"
        rel="noreferrer noopener">Github</a>
        <a
        href="https://www.linkedin.com/in/tylercrosse"
        target="_blank"
        rel="noreferrer noopener">LinkedIn</a>
      </div>
    </footer>
    <SignInModal
    user={props.user}
    modalIsOpen={props.modalIsOpen.signIn}
    onRequestClose={props.closeModal}
    onFormSubmit={props.signIn}
    />
  </div>
);

export const mapStateToProps = (state) => ({
  modalIsOpen: state.ui.modalIsOpen
});

export default connect(
  mapStateToProps,
  { signIn, openSignInModal, closeModal }
)(Welcome);
