import Paragraph from 'components/Typography/Paragraph';
import { string } from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';

import screen from '../../styling/screen';
import spacing from '../../styling/spacing';

const StyledBlock = styled.div`
  margin-top: ${spacing.l};
  text-align: center;
  color: ${props => props.theme.secondaryText};

  ${screen.tablet} {
    margin-top: ${spacing.xl};
    text-align: left;
    max-width: 394px;
  }
`;

const StyledButton = styled(Paragraph)`
  border-bottom: 1px solid ${props => props.theme.light};
  color: ${props => props.theme.light};
  cursor: pointer;
  display: inline;
`;

const CHAR_LIMIT = 240;

const DescriptionBlock = ({ podcastDescription }) => {
  const [isMore, setMore] = useState(false);
  const shortDescription = podcastDescription.substring(0, CHAR_LIMIT);

  const getRenderedItems = () => {
    if (isMore) {
      return (
        /* eslint-disable-next-line */
        <div>
          {podcastDescription.split('\n').map(item => (
            <Paragraph
              key={item}
              variant="l"
              dangerouslySetInnerHTML={{ __html: item }}
            />
          ))}
        </div>
      );
    }

    return (
      /* eslint-disable-next-line */
      <Paragraph
        variant="l"
        dangerouslySetInnerHTML={{ __html: shortDescription }}
        style={{ display: 'inline' }}
      />
    );
  };

  const toggle = () => {
    setMore(!isMore);
  };

  return (
    <StyledBlock variant="l">
      {getRenderedItems()}
      {podcastDescription.length > CHAR_LIMIT && (
        <StyledButton onClick={toggle}>{isMore ? 'Less' : 'More'}</StyledButton>
      )}
    </StyledBlock>
  );
};

DescriptionBlock.propTypes = {
  podcastDescription: string.isRequired,
};

export default DescriptionBlock;
