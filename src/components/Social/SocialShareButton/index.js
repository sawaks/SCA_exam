import Button from 'components/Button';
import DropdownButton from 'components/DropdownButton';
import SocialIcon from 'components/Icons/share-icon.svg';
// eslint-disable-next-line import/no-extraneous-dependencies
import { oneOf, string } from 'prop-types';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';
import toast from 'utilities/helpers/toast';

const FACEBOOK_APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;

const options = [
  {
    title: 'Share By Facebook',
    name: 'Facebook',
    key: 'facebook',
    width: '600',
    height: '600',
  },
  {
    title: 'Share By Twitter',
    name: 'Twitter',
    key: 'twitter',
    width: '600',
    height: '250',
  },
  {
    title: 'Copy Link',
    name: 'Copy Link',
    key: 'email',
    width: '',
    height: '',
  },
];

const StyledButton = styled.div`
  button {
    border: none;
    border-radius: 0px;
    background: transparent;
  }
`;

function SocialShareButton({
  showName,
  episodeTitle,
  location,
  btnType,
  shareItem,
}) {
  const { device: { browser } } = useSelector(state => state, shallowEqual);
  const experience = browser && browser.mobile ? 'mobile' : 'desktop';

  const getSocialUrl = (socialType) => {
    const bodyMessage = shareItem === 'station' ? `Listen to '${showName || episodeTitle}' live on LiSTNR.` : `I found this awesome podcast '${showName || episodeTitle}' on LiSTNR. Give it a listen:`;
    const url = window.location.href;
    switch (socialType) {
      case 'facebook':
        return `https://www.facebook.com/dialog/share?app_id=${FACEBOOK_APP_ID}&display=popup&quote=${bodyMessage}&href=${url}`;
      case 'twitter':
        return `https://twitter.com/intent/tweet?text=${bodyMessage}&url=${url}`;
      default:
        return null;
    }
  };

  const PopupCenterDual = (w, h) => {
    // Fixes dual-screen position for Most browsers
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : '1280';
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : '-336';
    const clientWidth = document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : '1800';
    const width = window.innerWidth ? window.innerWidth : clientWidth;
    const clientHeight = document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : '960';
    const height = window.innerHeight ? window.innerHeight : clientHeight;

    const left = width / 2 - w / 2 + dualScreenLeft;
    const top = height / 2 - h / 2 + dualScreenTop;
    return window.open(
      '',
      'popupWindow',
      `scrollbars=yes, resizable=yes, width=${w}, height=${h}, top=${top}, left=${left}`
    );
  };

  const togglePopup = async (e, socialType, width, height) => {
    e.preventDefault();
    const windowReference = PopupCenterDual(width, height);
    const socialUrl = getSocialUrl(socialType);
    windowReference.location.href = socialUrl;

    const title = showName || episodeTitle;
    if (shareItem) {
      window.scaGtmDataLayer.push({
        event: 'onKruxChanged',
        [`shared_${shareItem}`]: title,
        kxsegment: window.Krux ? window.Krux.segments : null,
      });
      window.Krux('ns:sca', 'page:load', null, { pageView: false });
    }
  };

  const copyCurrentUrl = async (e) => {
    e.preventDefault();
    let el;

    function createTextArea() {
      el = document.createElement('input');
      el.setAttribute('readonly', false);
      el.setAttribute('contenteditable', true);
      el.value = window.location.href;
      document.body.appendChild(el);
    }

    function selectText() {
      el.select();
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      el.setSelectionRange(0, el.value.length);
    }

    function copyTo() {
      document.execCommand('copy');
      document.body.removeChild(el);
    }

    createTextArea();
    selectText();
    copyTo();
    toast('Copied !');
  };

  const titleText = episodeTitle ? 'Share episode' : 'Share show';

  return (
    <DropdownButton
      variant={btnType}
      text=""
      mobileText=""
      icon={<SocialIcon />}
      id={`${location}-${experience}-social-link`}
      minWidthDesktop="40px"
      minWidthMobile="40px"
      offsetX="-55px"
      boxWidth="150px"
      mobileBoxWidth="120px"
      mobileOffsetY="-122px"
      mobileOffsetX="18px"
      setIconRight
      title={titleText}
    >
      {options.map(item => (
        <StyledButton key={item.key}>
          <Button
            as="button"
            variant="secondary"
            title={item.title}
            text={item.name}
            minWidthDesktop="150px"
            key={item.key}
            onClick={
                item.key !== 'email'
                  ? (e) => {
                    togglePopup(e, item.key, item.width, item.height);
                    e.stopPropagation();
                  }
                  : (e) => {
                    copyCurrentUrl(e);
                    e.stopPropagation();
                  }
              }
          />
        </StyledButton>
      ))}
    </DropdownButton>
  );
}

SocialShareButton.propTypes = {
  location: string,
  showName: string,
  episodeTitle: string,
  btnType: oneOf(['primary', 'secondary', 'secondary', 'tertiary']),
  shareItem: string.isRequired,
};

SocialShareButton.defaultProps = {
  showName: '',
  episodeTitle: '',
  btnType: 'secondary',
  location: '',
};

export default SocialShareButton;

