import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Typography/Header';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import { Flex } from 'components/Grid';
import Link from 'next/link';
import CallToAction from 'components/Typography/CallToAction';

function Heading({ title, viewAll, viewAllGtm }) {
  const { href, as = '', ...props } = viewAll || {};
  return (
    <HeadingWrapper alignItems="baseline" justifyContent="space-between">
      <Header as="h2" variant="m" text={title} linesToShow={1} />
      {
        viewAll && (
          <Link href={as}>
            <StyledLink {...props} onClick={viewAllGtm}>
              <CTAWrapper>
                <CallToAction text="VIEW ALL" />
              </CTAWrapper>
            </StyledLink>
          </Link>
        )
      }
    </HeadingWrapper>
  );
}

const StyledLink = styled.a`
  white-space: pre;
  appearance: none; /* stylelint-disable-line */
  text-decoration: none;
  padding: 0;
  border: 0;
  margin: 0;
  background: transparent;
  color: ${props => props.theme.LEGACY_secondary};
  display: flex;
  align-items: center;

  &:visited {
    color: ${props => props.theme.LEGACY_secondary};
  }
`;

const HeadingWrapper = styled(Flex)`
  margin: 0 ${spacing.s} ${spacing.m} 0;
`;

const CTAWrapper = styled.span`
  color: ${props => props.theme.light};
  cursor: pointer;
`;

Heading.propTypes = {
  title: PropTypes.string,
  /* The same shape as next/Link. It doesn't render anything if it is not provided */
  viewAll: PropTypes.shape({
    href: PropTypes.string.isRequired,
    className: PropTypes.string,
  }),
  viewAllGtm: PropTypes.func,
};

Heading.defaultProps = {
  title: null,
  viewAll: null,
  viewAllGtm: null,
};

export default Heading;
