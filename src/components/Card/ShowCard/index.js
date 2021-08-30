
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import themes from 'styles/theme';
import Image from 'components/Image';

export default function ShowCard({ imageUrl, title, subTitle, as, href, count, countShowLimit, noMaxWidth, colour, index, dataTest, ...rest }) {
  return (
    <Width>
      <StyledCard {...rest} noMaxWidth={noMaxWidth} colour={colour}>
        <>
          {imageUrl && <Image src={imageUrl} alt={title} />}
        </>
      </StyledCard>
      <HeaderWrapper noMaxWidth={noMaxWidth}>
        <Header as="h2" variant="s" text={title} linesToShow={1} mt="m" data-test={`${dataTest}-${index}`} />
      </HeaderWrapper>
      <ParagraphWrapper noMaxWidth={noMaxWidth}>
        <Paragraph variant="m" text={subTitle} linesToShow={3} mt="m" transparent />
      </ParagraphWrapper>
    </Width>
  );
}

const Width = styled.div`
  display: block;
  padding: ${spacing.s};
  min-width: 159px;
`;

const FixedWidthCss = css`
  width: 159px;
  height: 158px;

  ${screen.md} {
    width: 258px;
    height: 258px;
    max-width: 258px;
  }
`;

const FixedWidthOnlyCss = css`
  width: 159px;
  max-width: 159px;
  ${screen.md} {
    width: 258px;
    max-width: 258px;
  }
`;

const NoMaxWidthCss = css`
  height: 100%;
  width: 100%;
  min-width: 159px;
`;

const StyledCard = styled.div`
  color: ${themes.dark};
  border-radius: 8px;
  display: block;
  text-decoration: none;
  position: relative;
  transition: transform 0.3s cubic-bezier(.25, .8, .25, 1);
  overflow: hidden;
  ${props => (props.noMaxWidth ? NoMaxWidthCss : FixedWidthCss)};

  ${screen.md} {
    border-radius: 12px;
  }

  &:hover {
    cursor: pointer;
  }

  img {
    object-fit: contain;
    width: 100%;
    background-color: ${props => props.colour};
    border-radius: 8px;
  }
`;

const HeaderWrapper = styled.div`
 ${props => (props.noMaxWidth ? NoMaxWidthCss : FixedWidthOnlyCss)};
 > * {
  -webkit-line-clamp: 1;
  ${screen.md} {
    -webkit-line-clamp: 1;
  }
}
`;

const ParagraphWrapper = styled.div`
 ${props => (props.noMaxWidth ? NoMaxWidthCss : FixedWidthOnlyCss)};
 > * {
  max-height: 66px;
  -webkit-line-clamp: 3;
}
`;

ShowCard.propTypes = {
  as: PropTypes.string,
  colour: PropTypes.string,
  count: PropTypes.number,
  countShowLimit: PropTypes.number,
  dataTest: PropTypes.string,
  href: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  index: PropTypes.number,
  noMaxWidth: PropTypes.bool,
  subTitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

ShowCard.defaultProps = {
  as: 'div',
  colour: '',
  count: null,
  countShowLimit: 9,
  dataTest: '',
  href: null,
  index: null,
  noMaxWidth: false,
  subTitle: null,
};
