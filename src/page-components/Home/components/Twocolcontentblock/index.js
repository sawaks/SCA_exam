import React from 'react';
import { Flex, Box } from 'reflexbox';
import styled, { css } from 'styled-components';
import screen from 'styles/helpers/media';

import CTAAnimated from './components/CTAAnimated';
import DownloadLogosAnimated from './components/DownloadLogosAnimated';
import HeaderAnimated from './components/HeaderAnimated';
import ImageAnimated from './components/ImageAnimated';
import SectionsAnimated from './components/SectionsAnimated';

const Twocolcontentblock = ({ ...blockData }) => {
  const {
    title,
    subTitle,
    backgroundImageUrl,
    cta,
    contentItems,
    showAppDownloadButtons,
    componentName,
  } = blockData;

  const correctionL = componentName === 'twoColCopyRight' ? [3, 22, 48] : [3, 3, 3, 48];
  const correctionR = componentName === 'twoColCopyLeft' ? [3, 3, 0, 0] : [3, 48];

  return (
    <FullWrap componentName={componentName}>
      <ComponentWrapper
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        componentName={componentName}
        data-test={componentName}
      >
        <ContentWrapper
          flexWrap="wrap"
          justifyContent="space-around"
          alignItems="center"
        >
          {componentName && componentName === 'twoColCopyRight' && ImageAnimated(backgroundImageUrl, componentName, title)}
          <SectionWrapper mt={[25, 50]} pr={correctionR} pl={correctionL} mb={[25, 50]} componentName={componentName}>
            {HeaderAnimated(title, subTitle)}
            {contentItems && SectionsAnimated(contentItems)}
            {cta && CTAAnimated(cta)}
            {showAppDownloadButtons && DownloadLogosAnimated()}
          </SectionWrapper>
          {componentName && componentName === 'twoColCopyLeft' && ImageAnimated(backgroundImageUrl, componentName, title)}
        </ContentWrapper>
      </ComponentWrapper>
    </FullWrap>
  );
};

const bgLeft = css`
  background: linear-gradient(90deg, rgba(65,64,66,1) 58%, rgba(32,32,32,1) 58%, rgba(32,32,32,1) 100%);
`;
const bgRight = css`
  background: linear-gradient(90deg, rgba(32,32,32,1) 0%, rgba(32,32,32,1) 42%, rgba(65,64,66,1) 42%);
`;

const FullWrap = styled.div`
  ${screen.md} {
    ${props => (props.componentName === 'twoColCopyRight' ? bgRight : bgLeft)}; 
  }
`;

const ComponentWrapper = styled(Flex)`
  background: ${props => (props.componentName === 'twoColCopyRight' ? `url('/images/arcs.svg') no-repeat 45vw bottom ${props.theme.backgroundLight}}` : props.theme.backgroundLight)};
  background-size: 1340px;
  ${screen.md} {
    background: ${props => (props.componentName === 'twoColCopyRight' ? 'url(\'/images/arcs.svg\') no-repeat 45vw bottom transparent' : 'transparent')};
  } 
`;

const ContentWrapper = styled(Flex)`
  max-width: 1364px;
`;

const SectionWrapper = styled(Box)`
  width: 100%;
  overflow: hidden;
  ${screen.sm} {
    ${props => (props.componentName === 'twoColCopyRight' ? 'width: calc(50% - 16px)' : 'width: calc(50% - 100px)')};
    overflow: visible;
  }
  ${screen.md} {
    ${props => (props.componentName === 'twoColCopyRight' ? 'width: calc(50% - 8px)' : '')};
  }
  ${screen.lg} {
    ${props => (props.componentName === 'twoColCopyRight' ? 'width: calc(50% - 100px)' : '')};
  }
`;

Twocolcontentblock.displayName = 'Twocolcontentblock';

export default Twocolcontentblock;
