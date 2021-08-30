import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import Slider from 'components/Slider';
import Header from 'components/Typography/Header';
import themes from 'styles/theme';
import spacing from 'styles/helpers/spacing';
import { Flex } from 'components/Grid';
import CreatorCard from './components/CreatorCard';

const Creator = ({ title, subTitle, contentItems }) => {
  const showArrowsCheck = contentItems.length > 5;
  return (
    <SectionWrapper flexDirection="column" justifyContent="center" data-test="creator-carousel">
      <SectionTopBorder />
      <HeaderWrapper>
        <Header as="h2" variant="m" text={subTitle} mt="m" />
      </HeaderWrapper>
      <Header as="h2" variant="display" text={title} mt="m" />

      <Slider noDivider showArrows={showArrowsCheck}>
        {contentItems.map(item => (
          <CreatorCard
            key={item.title}
            title={item.title}
            subTitle={item.subTitle}
            description={item.description}
            imageUrl={item.imageUrl}
          />
        )
        )}
      </Slider>
    </SectionWrapper>
  );
};

const SectionWrapper = styled(Flex)`
  min-height: 481px;
  margin: 0 auto;
  max-width: 1364px;
  padding: 24px 12px;

  ${screen.sm} {
    min-height: 940px;
  }
`;

const SectionTopBorder = styled.div`
  display: block;
  width: 70px;
  height: 3px;
  margin-top: ${spacing.l};
  border-radius: 6px;
  background-color: ${themes.milkPunch};
  border: 3px solid ${themes.milkPunch};
    
  ${screen.sm} {
    height: 6px;
    margin-top: ${spacing.xl};
  }
`;

const HeaderWrapper = styled.div`
  color: ${props => props.theme.milkPunch};
`;

Creator.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  contentItems: PropTypes.arrayOf(PropTypes.shape),
};

Creator.defaultProps = {
  title: '',
  subTitle: '',
  contentItems: [],
};

export default Creator;
