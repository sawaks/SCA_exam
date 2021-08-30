import React from 'react';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * ResponsiveImage takes an array of objects containg url and pixelWidth (from the API) and returns an img with srcset tags.
 * This allows the browser to make the call on what image to use, based on window width and pixel density.
 * Defaults src to the smallest provided (determined by pixelWidth).
 * See propTypes below.
 */
const ResponsiveImage = ({ src, ...rest }) => {
  const isArr = Array.isArray(src);
  let srcSetStr = null;
  let computedSrc = '';

  if (isArr) {
    srcSetStr = '';
    const sortedArr = sortBy(src, ['pixelWidth']);
    computedSrc = get(sortedArr[0], 'url');

    sortedArr.map((srcItem, i) => {
      const url = get(srcItem, 'url');
      const pixelWidth = get(srcItem, 'pixelWidth');

      let string;
      if (url && pixelWidth) {
        string = `${url} ${pixelWidth}w`;
        if (i < sortedArr.length - 1) {
          string += ', ';
        }
        srcSetStr += string;
      } else {
        return false;
      }

      return string;
    });
  }

  return <Img src={isArr ? computedSrc : src} srcSet={srcSetStr} {...rest} />;
};

const Img = styled.img`
  width: 100%;
  display: block;
`;

ResponsiveImage.propTypes = {
  src: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      pixelWidth: PropTypes.number,
    }),
  ).isRequired,
};

export default ResponsiveImage;
