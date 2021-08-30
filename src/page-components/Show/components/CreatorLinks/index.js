import namedRoutes from 'common/named-routes';
import Paragraph from 'components//Typography/Paragraph';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import screen from '../../../../styles/helpers/media';
import spacing from '../../../../styles/helpers/spacing';

const StyledLink = styled.div`
  padding-top: ${spacing.m};
  font-weight: bold;

  ${screen.md} {
    padding-top: ${spacing.l};
  }

  a {
    font-size: 12px;
    line-height: ${spacing.l};
    min-width: 0;
    text-transform: uppercase;
    white-space: nowrap;
    text-align: left;
    padding-left: 0;
    cursor: pointer;
    color: ${props => props.theme.primary};

    &:disabled {
      opacity: 0.4;
    }
    ${screen.md} {
      font-size: 14px;
    }
}
`;

const CreatorLinks = ({ creators }) => creators.map(creator => (
  <StyledLink key={creator.slug}>
    <Paragraph text={creator.name} variant="l" />
    <Link href={`${namedRoutes.external.creator}/${creator.slug}`}>
      <a>More by this creator</a>
    </Link>
  </StyledLink>
));

CreatorLinks.propTypes = {
  creators: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    slug: PropTypes.string,
  })),
};

CreatorLinks.defaultProps = {
  creators: [],
};

export default CreatorLinks;
