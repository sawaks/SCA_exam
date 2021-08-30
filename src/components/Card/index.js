import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import spacing from 'styles/helpers/spacing';

function Card({ children, ...props }) {
  return (
    <StyledCard {...props}>
      {children}
    </StyledCard>
  );
}

/**
 * Use this content block <Card.FluidContent /> along with the 'fluid' prop on the Card
 * to produce a square card that mantains it's height and width responsively.
 * @see <StationCard /> and <CardS02 /> on the stations listing page for an example
 */
export const FluidContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const StyledCard = styled.div`
  margin:  ${props => (props.noMargins ? 0 : spacing.s)};
  border: ${props => (props.noBorder ? 'none' : `solid 1px ${props.theme.secondaryBorder}`)};
  border-radius: 4px;
  display: ${props => (props.displayBlock ? 'block' : 'inline-block')};
  appearance: none;
  background-color: ${props => (props.noBackgroundColor ? 'none' : props.theme.background)};
  color: ${props => props.theme.light};
  padding: 0;
  text-align: left;
  text-decoration: none;
  position: relative;
  width: ${props => (props.cardWidth ? props.cardWidth : 'auto')};

  &:hover {
    cursor: pointer;
  }

  ${props => props.fluid && css`
    position: relative;

    &:after {
      content: '';
      display: block;
      padding-bottom: 100%;
    }
  `}
`;

export const LargeCardWrapper = styled(StyledCard).attrs(() => ({
  as: 'div',
}))`
  background-color: ${props => props.theme.background};
  padding: ${spacing.l};
  display: block;
`;

Card.propTypes = {
  children: PropTypes.node.isRequired,
  displayBlock: PropTypes.bool,
  noBorder: PropTypes.bool,
  noBackgroundColor: PropTypes.bool,
  cardWidth: PropTypes.string,
  noMargins: PropTypes.bool,
};

Card.defaultProps = {
  displayBlock: false,
  noBorder: false,
  noBackgroundColor: false,
  cardWidth: null,
  noMargins: false,
};

export default Card;
