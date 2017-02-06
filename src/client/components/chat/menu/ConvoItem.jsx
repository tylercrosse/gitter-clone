import React from 'react';
import { Link } from 'react-router';

const ConvoItem = (props) => (
  <div>
    <Link to={'/' + props.name}>{props.name}</Link>
  </div>
);

ConvoItem.propTypes = {
  // : React.PropTypes.
};

export default ConvoItem;
