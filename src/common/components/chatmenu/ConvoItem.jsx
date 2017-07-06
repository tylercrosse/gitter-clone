import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const ConvoItem = ({ name, title }) => (
  <div className="convo-item">
    <Link className="convo-item-container" to={'/' + name}>
      <img className="convo-item-avatar" src={'http://i.pravatar.cc/22?u=' + name} alt={name} />
      <h2 className="convo-item-title">{title}</h2>
    </Link>
  </div>
);

ConvoItem.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ConvoItem;
