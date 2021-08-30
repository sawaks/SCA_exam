import React from 'react';
import PropTypes from 'prop-types';

const TabContent = ({ isActive, children }) => <div>{isActive ? children : null}</div>;

TabContent.propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  for: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

TabContent.defaultProps = {
  isActive: false,
};

export default TabContent;
