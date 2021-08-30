import get from 'lodash/get';
import { NextButton, PreviousButton } from 'page-components/Browse/components/HomePageHero/HeroButtons';
import PropTypes from 'prop-types';
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import screen from 'styles/helpers/media';
import Slider from 'react-slick';
import styled from 'styled-components';
import { Flex, Box } from 'components/Grid';
import spacing from 'styles/helpers/spacing';
import routes from 'common/named-routes';
import { decrypt } from 'utilities/helpers/audioObsfucator';
import { displayCollectionModal } from 'store/actions/userInteractions';
import Header from '../../../../components/Typography/Header';
import Paragraph from '../../../../components/Typography/Paragraph';
import Tag from '../../../../components/Typography/Tag';
import PlayPreviewButton from '../../../../components/Trailer/components/PlayPreviewButton';

const HomePageHero = ({ heroContents }) => {
  const slider = useRef();
  const heroImage = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  const settingsSlider = {
    variableWidth: true,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    speed: 500,
    nextArrow: <NextButton sliderRef={slider} />,
    prevArrow: <PreviousButton sliderRef={slider} />,
    responsive: [
      {
        breakpoint: 832,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1060,
        slidesToScroll: 1,
        slidesToShow: 2,
      },
    ],
  };

  const imageloaded = () => {
    setLoaded(true);
  };

  useEffect(() => {
    if (heroImage.current && heroImage.current.complete) {
      imageloaded();
    }
  }, []);

  return (
    <Box mb={spacing.l} data-test="hero-show">
      <Slider {...settingsSlider} ref={(sliderRef) => { (slider.current = sliderRef); }}>
        {heroContents.map((items) => {
          const clickHandler = () => {
            if (items.type === 'Playlist') {
              dispatch(displayCollectionModal());
            } else {
              router.push(`${routes.external.podcasts}/${items.slug}`);
            }
          };
          return (
            <div key={items.slug}>
              <StyledWrapper bgColor={items.colourPrimary} mx={spacing.s} loaded={loaded}>
                <Box onClick={clickHandler}>
                  <img onLoad={imageloaded} src={get(items.images, 'bannerLarge.url', null)} alt={items.name} ref={heroImage} />
                </Box>
                <StyledGradient />
                <StyledInfo p={spacing.m}>
                  <Flex flexDirection={['column', 'row', 'row']} justifyContent={['flex-start', 'space-between', 'space-between']} alignItems={['flex-start', 'flex-end', 'flex-end']} px={spacing.s}>
                    <Flex flexDirection="column" justifyContent="flex-start" alignItems="flex-start" mr={spacing.l}>
                      <Box mb={spacing.s}>
                        <Header as="h1" variant="l">{items.name}</Header>
                      </Box>
                      <Paragraph variant="m" mb="m" linesToShow={3} transparent>{items.description}</Paragraph>
                      <Flex>
                        {items.playlistCategories.map(tag => <Tag key={tag} text={`#${tag}`} mr="m" transparent />)}
                      </Flex>
                    </Flex>
                    <Box mt={spacing.m}>
                      {get(items, 'trailerEpisode.audioUrl') && (
                      <PlayPreviewButton audioUrl={decrypt(get(items, 'trailerEpisode.audioUrl'))} maxWidthDesktop="194px" minWidthDesktop="180px" maxWidthMobile="171px" />
                      )}
                    </Box>
                  </Flex>
                </StyledInfo>
              </StyledWrapper>
            </div>
          );
        }
        )}
      </Slider>
    </Box>
  );
};

const StyledWrapper = styled(Flex)`
  display: inline-block;
  position: relative;
  width: calc(100vw - 44px);
  max-width: 355px;
  height: 340px;
  cursor: pointer;
  border-radius: 16px;
  transition: opacity 0.5s;
  opacity: ${props => (props.loaded ? 1 : 0)};
  img {
     border-radius: 16px;
     background-color: ${props => props.theme.background};
     width: 100%;
     height: 100%;
     overflow: hidden;
     object-fit: contain;
     object-position: 0 0; 
  }
  ${screen.md} {
    max-width: unset;
    width: 663px;
    height: 418px;
    img {
      object-position: center top; 
      background: none;
    }
  }
`;

const StyledInfo = styled(Box)`
  position: absolute;
  bottom: 0;
  width: 100%;
   ${screen.md} {
    bottom: 20px;
  }
`;

const StyledGradient = styled(Box)`
  z-index: 0;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 210px;
  border-radius: 0 0 16px 16px;
  background: linear-gradient(0deg, rgba(17,16,17,1) 0%, rgba(17,16,17,0.85) 70%, rgba(17,16,17,0.5) 85%, rgba(17,16,17, 0) 100%);


  ${screen.md} {
    background-image: linear-gradient(to bottom, rgba(32, 31, 32, 0), #111011 100%);
    bottom: -4px;
    height: 40%;
  }
`;

HomePageHero.propTypes = {
  heroContents: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    slug: PropTypes.string,
    heroImageUrl: PropTypes.string,
    heroImageMobileUrl: PropTypes.string,
    backgroundColor: PropTypes.string,
    description: PropTypes.string,
    trailerEpisode: PropTypes.shape({
      audioUrl: PropTypes.string,
    }),
    tags: PropTypes.arrayOf(PropTypes.string),
  })),
};

HomePageHero.defaultProps = {
  heroContents: [],
};

export default HomePageHero;
