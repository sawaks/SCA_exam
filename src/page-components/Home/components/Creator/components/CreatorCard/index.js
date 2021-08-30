
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import themes from 'styles/theme';
import Image from 'components/Image';

const CreatorCard = ({ imageUrl, title, subTitle, description }) => (
  <Width>
    <StyledCard>
      {imageUrl && <Image src={imageUrl} width={258} height={258} alt={title} />}
    </StyledCard>
    <HeaderWrapper preTitle>
      <Header as="h2" variant="s" text={subTitle.toUpperCase()} linesToShow={3} mt="m" />
    </HeaderWrapper>
    <HeaderWrapper>
      <Header as="h2" variant="m" text={title} linesToShow={3} />
    </HeaderWrapper>
    <ParagraphWrapper>
      <Paragraph variant="m" text={description} linesToShow={4} mt="m" transparent />
    </ParagraphWrapper>
  </Width>
);

const Width = styled.div`
  display: block;
  padding: ${spacing.s};
  min-width: 159px;
`;

const FixedWidthCss = css`
  width: 159px;
  height: 158px;

  ${screen.sm} {
    width: 258px;
    height: 258px;
    max-width: 258px;
  }
`;

const FixedWidthOnlyCss = css`
  width: 159px;
  max-width: 159px;

  ${screen.sm} {
    width: 258px;
    max-width: 258px;
  }
`;

const StyledCard = styled.div`
  color: ${themes.dark};
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
  background-color: ${themes.backgroundLight};
  display: block;
  text-decoration: none;
  position: relative;
  transition: transform 0.3s cubic-bezier(.25, .8, .25, 1);
  overflow: hidden;
  ${FixedWidthCss};

  ${screen.sm} {
    border-radius: ${spacing.m};
    margin-top: ${spacing.l};
  }

  img {
    width: 159px;
    height: 159px;
    object-fit: cover;

    ${screen.sm} {
      width: 258px;
      height: 258px;
    }
  }
`;

export const HeaderWrapper = styled.div`

> * {
  -webkit-line-clamp: 1;
  ${screen.md} {
    -webkit-line-clamp: 1;
  }
}

 ${FixedWidthOnlyCss};
 ${props => props.preTitle && css`
    color: ${themes.milkPunch};
    margin-bottom: ${spacing.s};

    ${screen.sm} {
    margin-bottom: ${spacing.m};
    }
 `}
`;

const ParagraphWrapper = styled.div`
 ${FixedWidthOnlyCss};
 > * {
  max-height: 66px;
  -webkit-line-clamp: 4;
}
`;

CreatorCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,

};

export default CreatorCard;
