import React from 'react';
import PropTypes from 'prop-types';

const GitterCloneIcon = ({ classes }) => (
  <svg
    className={classes}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="15px"
    height="22px"
    viewBox="0 0 22.43 32.04"
    fill="#ba9cc3"
  >
    <defs />
    <g>
      <rect y="4.81" width="3.2" height="24.03" />
      <rect x="6.41" y="1.6" width="3.2" height="5.61" />
      <rect x="19.22" width="3.2" height="8.81" />
      <rect x="19.22" y="24.83" width="3.2" height="7.21" />
      <rect x="6.41" y="8.81" width="3.2" height="16.02" />
      <rect x="6.41" y="26.43" width="3.2" height="5.61" />
      <rect x="12.81" y="28.03" width="3.2" height="4" />
      <rect x="12.81" y="5.61" width="3.2" height="20.82" />
      <rect x="12.81" width="3.2" height="4" />
      <rect x="19.22" y="10.41" width="3.2" height="12.81" />
    </g>
  </svg>
);

GitterCloneIcon.propTypes = {
  classes: PropTypes.string.isRequired,
};

export default GitterCloneIcon;
