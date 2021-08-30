import routes from 'common/named-routes';
import { Box } from 'components/Grid';
import Header from 'components/Typography/Header';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import screen from 'styles/helpers/media';

import ChevronSVG from './assets/chevron.svg';

const Chevron = styled(ChevronSVG)`
  margin: 0 0.5em;
  path {
    fill: ${props => props.theme.primary};
  }
`;

const Ul = styled.ul`
  padding: 0;
  align-items: center;
  flex-wrap: wrap;
  display: none;
  margin-bottom: 0;

  ${screen.md} {
    display: flex;
  }
`;
// Need header component to contain text width
const StyledHeader = styled(Box)`
  h5{
    font-size: 12px;
    text-transform: uppercase;
    line-height: normal;
  }
`;

const Breadcrumbs = ({ name }) => (
  <Ul>
    <Link href={routes.external.browse} passHref>
      <a property="item">
        <StyledHeader>
          <Header variant="s" as="h5" text="Browse" transparent />
        </StyledHeader>
        <meta property="position" content="1" />
      </a>
    </Link>
    <Chevron />
    <StyledHeader>
      <Header variant="s" as="h5" text={name} linesToShow={1} />
    </StyledHeader>
    <meta property="position" content="2" />
  </Ul>
);

Breadcrumbs.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Breadcrumbs;
