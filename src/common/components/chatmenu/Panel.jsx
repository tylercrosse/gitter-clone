import React, { PropTypes } from 'react';
import Conversations from './Conversations';
import DirectMessages from './DirectMessages';

const Panel = (props) => {
  const active = props.active ? 'active' : '';
  let inner;
  if (props.inner === 'Conversations') {
    inner = <Conversations {...props} />;
  } else if (props.inner === 'DirectMessages') {
    inner = <DirectMessages {...props} />;
  }
  return (
    <section
      onMouseLeave={props.onMouseLeave}
      // className="chat-menu-panel active"
      className={'chat-menu-panel ' + active}
    >
      <div className="brand-container">Gitter Clone</div>
      <header className="panel-header">
        <div className="panel-header-convos">
          <h2>{props.title}</h2>
        </div>
      </header>
      {inner}
    </section>
  );
};

Panel.propTypes = {
  inner: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onMouseLeave: PropTypes.func.isRequired
};

export default Panel;
