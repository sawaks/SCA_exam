import routes from 'common/named-routes';
import OpenPlayerIcon from 'components/Icons/minimise-player.svg';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { playerOverlayUpdateVisible } from 'store/actions/player-overlay';
import styled from 'styled-components';
import rgba from 'styles/helpers/rgba';
import gtm from 'utilities/GTM/gtmTags';
import addToDataLayer from 'utilities/helpers/dataLayer';

const IconContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  width: 39px;
  height: 39px;
  background: ${props => rgba(props.theme.dark, 0.5)};
  border-radius: 100%;
  outline: none;
  
  & svg {
    cursor: pointer;
    width: 18px;
  }
`;

const MinimizePlayer = React.memo(({ page, analyticsData }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const hidePlayer = () => {
    addToDataLayer({
      event: gtm.playerMinimiseButtonClick,
      ...analyticsData,
    });

    if (page) {
      router.push({
        pathname: routes.internal.root,
        query: {},
      });
    }
    dispatch(playerOverlayUpdateVisible(false));
  };

  return (
    <IconContainer onClick={hidePlayer} onKeyPress={hidePlayer} title="Minimize player">
      <OpenPlayerIcon />
    </IconContainer>
  );
});

MinimizePlayer.propTypes = {
  page: PropTypes.bool,
  analyticsData: PropTypes.shape({
    showName: PropTypes.string,
    showCategory: PropTypes.string,
    season: PropTypes.number,
    episodeNumber: PropTypes.number,
    contentType: PropTypes.string,
    streamingUrl: PropTypes.string,
  }),
};

MinimizePlayer.defaultProps = {
  page: false,
  analyticsData: null,
};

export default MinimizePlayer;
