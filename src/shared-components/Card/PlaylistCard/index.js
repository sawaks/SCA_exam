import Header from 'shared-components/Typography/Header';
import Paragraph from 'shared-components/Typography/Paragraph';
import get from 'lodash/get';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import screen from 'src/styling/screen';
import spacing from 'src/styling/spacing';
import { displayCollectionModal } from 'store/actions/userInteractions';
import Image from 'shared-components/Image';

function PlaylistCard({ playlist }) {
  const title = get(playlist, 'name', '');
  const description = get(playlist, 'description', '');
  const image = get(playlist, 'images.squareLarge.url', '');
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(displayCollectionModal());
  };

  return (
    <StyledCard onClick={clickHandler}>
      <PlayListGradient />
      <PlaylistImage
        src={image}
        alt={title}
      />
      <TextWrapper>
        <Playlist>Collection</Playlist>
        <Header as="h3" variant="l" text={title} linesToShow={1} mt="m" mb="m" />
        <Paragraph variant="m" text={description} transparent linesToShow={2} mb="m" />
      </TextWrapper>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  position: relative;
  border-radius: 8px;
  display: block;
  max-width: 330px;
  overflow: hidden;
  margin: 0 ${spacing.s};

  ${screen.tablet} {
    border-radius: 14px;
    min-width: 438px;
  }
  &:hover {
    cursor: pointer;
  }
`;

const TextWrapper = styled.div`
  padding: ${spacing.m};
  position: absolute;
  bottom: 0px;
  left: 0px;
  z-index: 10;
`;

const Playlist = styled.div`
  text-transform: uppercase;
  display: inline;
  background-color: #453d42;
  padding: 1px 3px;
  margin: ${spacing.m} 0;
  font-size: 8px;
  border-radius: 3px;
  border-collapse: separate; 
  
  ${screen.tablet} {
    font-size: 10px;
  }
`;

const PlayListGradient = styled.div`
  position: absolute;
  left: 0%;
  top: 0%;
  right: 0%;
  bottom: 0%;
  background-image: linear-gradient(to bottom, hsla(0, 0.00%, 0.00%, 0.00) 60%, hsla(0, 0.00%, 0.00%, 1));
`;

const PlaylistImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

PlaylistCard.propTypes = {
  playlist: PropTypes.shape({
    name: PropTypes.string,
    slug: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
};

PlaylistCard.defaultProps = {
  playlist: {
    name: '',
    slug: '',
    title: '',
    description: '',
    images: {
      url: '',
    },
  },
};

export default PlaylistCard;
