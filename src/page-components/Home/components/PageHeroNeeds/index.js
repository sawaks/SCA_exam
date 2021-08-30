import React from 'react';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import { arrayOf, string } from 'prop-types';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import { Container, Box } from 'components/Grid';
import Animate from './components/animate';

const animationOffset = {
  imageOne: 20,
  imageTwo: 50,
  imageThree: 100,
  headlineOne: 30,
  headlineTwo: 50,
  headlineThree: 80,
  headlineFour: 30,
  heroParagraph: 50,
};

const PageHeroNeeds = ({
  description,
  backgroundImageUrl,
  images,
  copyTexts,
}) => {
  const [headline1, headline2, headline3, headline4] = copyTexts;
  const [image1, image2, image3] = images;
  return (
    <HeroWrapper data-test="page-hero-needs">
      <StyledBox>
        <BgWrap>
          <StyledImage alt="background hero needs" src={backgroundImageUrl} />
        </BgWrap>
        <HeroContainer>
          <TextContainer>
            <Animate outputRange={['0%', `-${animationOffset.headlineOne}%`]}>
              <HeroHeadlineOne as="h1" variant="xxl" offset={animationOffset.headlineOne}>
                {headline1}
              </HeroHeadlineOne>
            </Animate>
            <Animate outputRange={['0%', `-${animationOffset.headlineTwo}%`]}>
              <HeroHeadlineTwo as="h1" variant="xxl" offset={animationOffset.headlineTwo}>
                {headline2}
              </HeroHeadlineTwo>
            </Animate>
            <Animate outputRange={['0%', `-${animationOffset.headlineThree}%`]}>
              <HeroHeadlineThree as="h1" variant="xxl" offset={animationOffset.headlineThree}>
                {headline3}
              </HeroHeadlineThree>
            </Animate>
            <Animate outputRange={['0%', `-${animationOffset.headlineFour}%`]}>
              <HeroHeadlineFour as="h1" variant="xxl" offset={animationOffset.headlineFour}>
                {headline4}
              </HeroHeadlineFour>
            </Animate>
            <Animate outputRange={['0%', `-${animationOffset.heroParagraph}%`]}>
              <HeroParagraph variant="xl" mt="l" transparent offset={animationOffset.heroParagraph}>
                {description}
              </HeroParagraph>
            </Animate>
          </TextContainer>
          <ImageContainer>
            <Animate outputRange={['0%', `-${animationOffset.imageOne}%`]}>
              <ImageNeedOne src={image1} alt="first need" offset={animationOffset.imageOne} />
            </Animate>
            <Animate outputRange={['0%', `-${animationOffset.imageTwo}%`]}>
              <ImageNeedTwo src={image2} alt="second need" offset={animationOffset.imageTwo} />
            </Animate>
            <Animate outputRange={['0%', `-${animationOffset.imageThree}%`]}>
              <ImageNeedThree src={image3} alt="third need" offset={animationOffset.imageThree} />
            </Animate>
          </ImageContainer>
        </HeroContainer>
      </StyledBox>
    </HeroWrapper>
  );
};

const HeroWrapper = styled.div`
  position: relative;
  background-color: ${props => props.theme.backgroundLight};
  min-height: 650px;

  ${screen.sm} {
    min-height: 819px;
  }
`;

const StyledBox = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const BgWrap = styled.div`
  position: absolute;
  width: 100vw;
  height: 321px;
  overflow: hidden;
  z-index: 0;
   ${screen.md} {
     height: 100%;
  }
`;

const StyledImage = styled.img`
  object-fit: cover;
  object-position: center center;
  width: 100%;
  height: 100%;
  ${screen.md} {
     object-position: top center;
  }
`;

const HeroContainer = styled(Container)`
  position: relative;
  margin: ${spacing.xl} 0 ${spacing.l};
  height: 100%;
  
  ${screen.md} {
    margin: ${spacing.l};
  }
`;

const TextContainer = styled.div`
  position: relative;
  z-index: 1;

  ${screen.sm} {
    margin: ${spacing.xl} 0;
    position: absolute;
    top: 0;
    left: 0;
    height: inherit;
    width: 100%;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 256px;
  margin: ${spacing.l} 0;

  ${screen.sm} {
    margin: ${spacing.xl} 0;
    position: static;
    height: inherit;
  }
`;

const HeroParagraph = styled(Paragraph)`
  text-align: center;

  ${screen.sm} {
    text-align: left;
    max-width: 307px;
    position: absolute;
    left: 50%;
    top: ${props => 25 + props.offset}%;
  }

  ${screen.xl} {
    max-width: 457px;
    left: 42%;
  }
`;

const HeroHeadline = styled(Header)`
  font-size: 30px;
  text-align: center;
  font-family: Dunbar-tall, sans-serif;

  ${screen.sm} {
    font-size: 62px;
    text-align: left;
  }
`;

const HeroHeadlineOne = styled(HeroHeadline)`
  ${screen.sm} {
    position: absolute;
    left: 22%;
    top: ${props => 5 + props.offset}%;
  }

  ${screen.xl} {
    left: 32%;
    top: ${props => 5 + props.offset}%;
  }
`;

const HeroHeadlineTwo = styled(HeroHeadline)`
  ${screen.sm} {
    position: absolute;
    left: 1%;
    top: ${props => 25 + props.offset}%;
  }

  ${screen.xl} {
    left: 4%;
  }
`;

const HeroHeadlineThree = styled(HeroHeadline)`
  ${screen.sm} {
    position: absolute;
    right: 1%;
    top: ${props => 50 + props.offset}%;
  }

  ${screen.xl} {
    top: ${props => 50 + props.offset}%;
    right: 12%;
  }
`;

const HeroHeadlineFour = styled(HeroHeadline)`
  ${screen.sm} {
    position: absolute;
    right: 15%;
    bottom: ${props => 11 - props.offset}%;
  }

  ${screen.xl} {
    right: 27%;
  }
`;

const ImageNeed = styled.img`
  border-radius: 10px;
  object-fit: cover;
`;

const ImageNeedOne = styled(ImageNeed)`
  height: 170px;
  width: 170px;
  position: absolute;
  top: 0;
  left: 0%;

  ${screen.sm} {
    height: 358px;
    width: 358px;
    top: ${props => 28 + props.offset}%;
    left: 7%;
  }

  ${screen.lg} {
    left: 10%;
  }

  ${screen.xl} {
    left: 13%;
  }
`;

const ImageNeedTwo = styled(ImageNeed)`
  height: 118px;
  width: 118px;
  position: absolute;
  bottom: 10%;
  left: 30%;

  ${screen.sm} {
    height: 217px;
    width: 217px;
    bottom: ${props => 17 - props.offset}%;
    left: 30%;
  }

  ${screen.xl} {
    left: 34%;
  }
`;

const ImageNeedThree = styled(ImageNeed)`
  height: 118px;
  width: 118px;
  position: absolute;
  top: 20%;
  right: 0%;

  ${screen.sm} {
    height: 174px;
    width: 174px;
    top: ${props => 5 + props.offset}%;
    right: 10%;
  }

  ${screen.xl} {
    top: ${props => 5 + props.offset}%;
    right: 12%;
  }
`;

PageHeroNeeds.propTypes = {
  description: string.isRequired,
  backgroundImageUrl: string.isRequired,
  images: arrayOf(string).isRequired,
  copyTexts: arrayOf(string).isRequired,
};

export default PageHeroNeeds;
