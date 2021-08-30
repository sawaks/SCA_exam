import Button from 'components/Button';
import DropdownButton from 'components/DropdownButton';
import MoreOptionsIcon from 'components/Icons/more-horizontal.svg';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import gtm from 'utilities/GTM/gtmTags';
import page from 'utilities/GTM/pageTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import routes from '../../common/named-routes';

const MoreOptionsWrapper = styled.div`
  display: ${props => (props.visible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 0 2px;
  height: 27px;
  width: 27px;

  svg {
    fill: ${props => props.theme.whiteColor};
    opacity: ${props => (props.disable ? 0.3 : 0.6)};
  }
`;

function MoreOptions({ text, showText, showSlug, onClick, visible, disable, dropdownId, isShowPage, isEpisodePage, isFeed, isTrendingEpisodes, isActive }) {
  return (
    <MoreOptionsWrapper visible={visible} disable={disable}>
      <DropdownButton
        id={dropdownId}
        offsetY="-7px"
        offsetX="23px"
        boxWidth="198px"
        mobileOffsetY="-7px"
        mobileOffsetX="23px"
        mobileBoxWidth="198px"
        minWidthDesktop="none"
        minWidthMobile="none"
        disable={disable}
        variant="icon"
        withBorder
        onClick={() => addToDataLayer({
          event: (isShowPage && gtm.podcastThreeDots) || (isTrendingEpisodes && gtm.onBrowsePageTrendingEpiosdesThreeDots),
          pageType: (isShowPage && page.showPage) || (isTrendingEpisodes && page.browsePage),
        })}
        icon={<MoreOptionsIcon />}
      >
        { !isActive && (
          <Button
            as="button"
            text={text}
            variant="mono"
            minWidthDesktop="0"
            onClick={() => onClick()}
          />
        )}
        {!isShowPage && !isEpisodePage && !isFeed && (
        <Button
          text={showText}
          variant="mono"
          minWidthDesktop="0"
          as="a"
          link={{ href: `${routes.external.podcasts}/${showSlug}` }}
        />
        )}
      </DropdownButton>
    </MoreOptionsWrapper>
  );
}

MoreOptions.propTypes = {
  text: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  disable: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  dropdownId: PropTypes.string.isRequired,
  showText: PropTypes.string,
  showSlug: PropTypes.string,
  isShowPage: PropTypes.bool,
  isActive: PropTypes.bool,
  isFeed: PropTypes.bool,
  isTrendingEpisodes: PropTypes.bool,
  isEpisodePage: PropTypes.bool,
};

MoreOptions.defaultProps = {
  disable: null,
  showText: '',
  showSlug: '',
  isShowPage: false,
  isActive: false,
  isFeed: false,
  isTrendingEpisodes: false,
  isEpisodePage: false,
};

export default MoreOptions;
