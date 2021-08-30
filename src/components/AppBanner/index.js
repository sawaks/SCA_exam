import { Box, Flex } from '@rebass/grid';
import AppIcons from 'components/AppIcons';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import getBrowser from 'utilities/helpers/browser';

function AppBanner({ title, description, backgroundImageUrl }) {
  const isMobile = getBrowser() === 'Mobile';
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  const variants = {
    visible: {
      y: isMobile ? -50 : -100,
    },
    hidden: {
      y: 0,
    },
  };

  return (
    <>
      <Block flexDirection={['column', 'row', 'row']} ref={ref} data-test="app-banner">
        <AppsBackground background="/images/arcs.svg" />
        <Center>
          <AppsContent flexDirection="column" justifyContent="center" py={spacing.l} px={[spacing.l, spacing.l, spacing.xl]}>
            <Header as="h1" variant="xl" text={title} mb="l" />
            <Paragraph variant="l" transparent text={description} />
            <Flex mt={[spacing.l, spacing.l, spacing.l]}>
              <AppIcons />
            </Flex>
          </AppsContent>
          <PhoneArtWrapper width={[1]}>
            <motion.div
              animate={inView ? 'visible' : 'hidden'}
              variants={variants}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              ref={ref}
            >
              <PhoneArt background={backgroundImageUrl} />
            </motion.div>
          </PhoneArtWrapper>
        </Center>
        <PhonesBG width={[1, 0.5, 0.5]} />
      </Block>
    </>
  );
}

const Center = styled.div`
  position: absolute;
  width: 100%;
  max-width: 1364px;
  left: 0;
  right: 0;
  margin: 0 auto;
  
  ${screen.sm} {
    height: 424px;
  }
`;

const AppsContent = styled(Flex)`
  position: absolute;
  left: 0;
  
  ${screen.sm} {
    height: 100%;
    width: 50%;
  }
`;

const PhonesBG = styled(Box)`
  height: 424px;
`;

const AppsBackground = styled.div`
  background: ${props => `url(${props.background})`} no-repeat center right;
  height: 700px;

  ${screen.sm} {
    background-size: cover;
    height: 424px;
    width: 50%;
  }
`;

const PhoneArtWrapper = styled(Box)`
  position: absolute;
  overflow: hidden;
  top: 228px;
  
  ${screen.sm} {
    left: 50%;
    height: 100%;
    top: 0;
  }
`;

const PhoneArt = styled.div`
  background: ${props => `url(${props.background})`} no-repeat;
  background-size: cover;
  background-position-x: -142px;
  background-position-y: -40px;
  height: 382px;

  ${screen.sm} {
    height: 824px;
    background-position-x: -260px;
    background-position-y: -10px;
    background-size: initial;
  }

  ${screen.md} {
    height: 824px;
    background-position-x: -170px;
    background-position-y: -20px;
    background-size: initial;
  }
`;

const Block = styled(Flex)`
  position: relative;
  max-height: 366px;
  background: #fff3d3;
  overflow: hidden;

  ${screen.sm} {
    max-height: 424px;
  }
`;

AppBanner.propTypes = {
  backgroundImageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default AppBanner;
