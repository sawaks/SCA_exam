import React from 'react';
import { string, oneOf } from 'prop-types';
import spacing from 'styles/helpers/spacing';
import styled from 'styled-components';
import screen from 'styles/helpers/media';

const TagWrapper = styled.div`
  color: ${props => (props.variant !== 'white' ? props.theme.secondaryText : props.theme.primaryText)};
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 1.2px;
  margin: 3px ${spacing.s} 3px 0;
  text-transform: uppercase;

  ${screen.md} {
    font-size: 12px;
    margin-right: 12px;
  }
`;

/**
 * @description: This function returns a 'Tag'. It is a span with text prepended with '#' and two variants of text color opacity - 1 and 0.7.
 * @param {*} { text, variant }: text - any text for the title of the chip, variant - text color opacity - [white, grey (0.7)].
 * @returns Tag component
 */
function Tag({ text, variant, ...rest }) {
  return (
    <TagWrapper variant={variant} {...rest}>
      #
      {text}
    </TagWrapper>
  );
}

Tag.propTypes = {
  text: string.isRequired,
  variant: oneOf(['grey', 'white']),
};

Tag.defaultProps = {
  variant: 'grey',
};

export default Tag;
