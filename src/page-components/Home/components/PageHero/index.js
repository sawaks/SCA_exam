import React from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'components/Grid';
import screen from 'styles/helpers/media';
import DownloadBanner from './components/DownloadBanner';
import PhoneLeftImg from './components/LeftPhoneAnimate';
import PhoneRightImg from './components/RightPhoneAnimate';
import HeroText from './components/HeroTextAnimate';

const PageHero = ({ ...blockData }) => {
  const {
    name,
    description,
    images,
  } = blockData;

  return (
    <StyleWrapper justifyContent="center" alignItems="center" mt={['-50px', '-95px', '-120px']} data-test="page-hero">
      <BgOne width={[0.5]} pt={['50px', '95px', '120px']} />
      <BgTwo width={[0.5]} pt={['50px', '95px', '120px']} />
      <PhoneWrapper justifyContent="center" alignItems="center" flexWrap="wrap">
        <Flex width={[0.5]} justifyContent="flex-end" alignItems="center">
          <PhoneLeftImg imgSrc={images[0]} />
        </Flex>
        <Flex width={[0.5]} justifyContent="flex-start" alignItems="center">
          <PhoneRightImg imgSrc={images[1]} />
        </Flex>
      </PhoneWrapper>
      <StyledGradient />
      <StyleHeroText justifyContent="center" alignItems="center">
        <HeroText name={name} />
      </StyleHeroText>
      <DownloadBanner description={description} />
    </StyleWrapper>
  );
};

const StyleWrapper = styled(Flex)`
  position:relative;
  height: 92vh;
  height: calc(var(--vh, 1vh) * 92);
  max-height: 662px;

  ${screen.sm} {
    max-height: 938px;
  }

  ${screen.md} {
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
  }
`;
const BgOne = styled(Flex)`
  background: ${props => props.theme.backgroundLight};
  height: 120%;
`;

const BgTwo = styled(Flex)`
  background: ${props => props.theme.background};
  height: 120%;
`;

const PhoneWrapper = styled(Flex)`
  position: absolute;
  bottom: 0px;

  ${screen.md} {
    top: 110px;
  }
`;

const StyledGradient = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height:450px;
  background-image: linear-gradient(to bottom, rgba(32, 31, 32, 0), #201f20);

  ${screen.md} {
    background-image: linear-gradient(to bottom, rgba(32, 31, 32, 0), #201f20 99%);
  }
`;

const StyleHeroText = styled(Flex)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    h1 {
      font-size: 50px;
      text-align: center;
    }
    
    ${screen.md} {
      h1 {
        font-size: 90px;
      }
    }
`;

export default PageHero;
