import React from 'react';
import PropTypes from 'prop-types';
import SliderWithoutSection from './SliderWithoutSection';

function Slider(props) {
  return (
    <SliderWithoutSection {...props}>
      {props.children}
    </SliderWithoutSection>
  );
}

Slider.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  /* The same shape as next/Link. It doesn't render anything if it is not provided */
  viewAll: PropTypes.shape({
    href: PropTypes.string.isRequired,
    className: PropTypes.string,
  }),
  viewAllGtm: PropTypes.func,
};

Slider.defaultProps = {
  title: null,
  viewAll: null,
  viewAllGtm: null,
};

export default Slider;
