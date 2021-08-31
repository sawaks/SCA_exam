import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import screen from 'styles/helpers/screen';
import { Flex } from 'components/Grid';
import Header from 'components/Typography/Header';
import Image from 'components/Image';

function CategoryCard({ heading, ...props }) {
  return (
    <>
      <StyledCard {...props}>
        <CategoryImage src={props.image} alt={heading} />
        <TextWrapper alignItems="flex-end" height="100%">
          <Header as="h3" variant="s" text={heading} />
        </TextWrapper>
      </StyledCard>
    </>
  );
}
const StyledCard = styled.div`
  background-color: ${props => props.bg};
  background-size: cover;
  border-radius: 8px;
  display: block;
  text-decoration: none;
  transition: transform 0.3s cubic-bezier(.25, .8, .25, 1);
  height: 70px;
  width: 159px;
  overflow:hidden;
  position: relative;

  ${screen.tablet} {
    border-radius: 12px;
    height: 136px;
    width: 258px;
  }

  &:hover {
    cursor: pointer;
  }
`;

const CategoryImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const TextWrapper = styled(Flex)`
  position: absolute;
  top: 0;
  padding: 8px;

  ${screen.tablet} {
    padding: 12px;
  }
`;

CategoryCard.propTypes = {
  heading: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default CategoryCard;
