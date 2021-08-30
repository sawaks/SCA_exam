import React from 'react';
import { string, arrayOf } from 'prop-types';
import Tag from '../Tag';

const TagBlocks = ({ tags }) => (
  (tags && tags.length > 0) ? (
    tags.map(tag => (
      <Tag key={tag} text={tag} variant="grey" />
    ))
  ) : null
);

TagBlocks.propTypes = {
  tags: arrayOf(string),
};

TagBlocks.defaultProps = {
  tags: [],
};

export default TagBlocks;
