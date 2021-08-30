import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import zIndex from 'styles/helpers/zIndex';
import { connect } from 'react-redux';
import { playerOverlayScrolled } from 'store/actions/userInteractions';
import SmartBanner from './components/SmartBanner';

const Overlay = styled.div`
  display: block;
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  will-change: transform;
  transition: transform 400ms ease;
  z-index: ${zIndex.playerOverlay};
  
  ${screen.md} {
    z-index: ${zIndex.playerOverlayDesktop};
  }
`;

const BackgroundFade = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  display: block;
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  will-change: opacity;
  transition: opacity 400ms ease;
  z-index: ${zIndex.playerOverlay};

  ${screen.md} {
    z-index: ${zIndex.playerOverlayDesktop};
  }
`;

/**
 * SlideUpOverlay
 * @description A helper function to add a component that slides up from the bottom of the page.
 */
class SlideUpOverlay extends React.Component {
  constructor(props) {
    super(props);

    this.overlay = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { browser, visible } = this.props;

    // We need this because iOS does work properly with scrolling on modals. The screens freezes once it reaches the bottom.
    // So if it's an iOS device we add listeners to the touch events.
    // If the user reaches the bottom we stop the scrolling.
    if (!prevProps.visible && visible && browser?.os?.includes('OS')) {
      const content = this.overlay.current;

      content.addEventListener('touchstart', this.handleTouchStart);
      content.addEventListener('touchmove', this.handleTouchMove);
    }
  }

  componentWillUnmount() {
    const content = this.overlay.current;

    if (content) {
      content.removeEventListener('touchstart', this.handleTouchStart);
      content.removeEventListener('touchmove', this.handleTouchMove);
    }
  }

  handleTouchStart = (event) => {
    this.slideBeginY = event.touches[0].pageY;

    const content = this.overlay.current;
    const { clientHeight, scrollTop, scrollHeight } = content;
    // if the user hasn't reached the bottom yet, let him scroll.
    this.allowDown = clientHeight + scrollTop + 100 < scrollHeight;
  };

  handleTouchMove = (event) => {
    const down = (event.touches[0].pageY < this.slideBeginY);
    this.slideBeginY = event.touches[0].pageY;

    if (down) {
      if (this.allowDown) {
        event.stopPropagation();
      } else {
        event.preventDefault();
      }
    }
  };

  onOverlayInteracted = () => {
    const { onOverlayScrolled, overlayScrolled } = this.props;
    if (!overlayScrolled) {
      onOverlayScrolled();
    }
  };

  render() {
    const { children, visible } = this.props;
    return (
      <>
        <CSSTransition
          in={visible}
          timeout={400}
          unmountOnExit
          classNames="overlay-bg"
        >
          <BackgroundFade />
        </CSSTransition>
        <CSSTransition
          in={visible}
          timeout={400}
          unmountOnExit
          classNames="overlay"
        >
          <Overlay ref={this.overlay} onScroll={this.onOverlayInteracted} onClick={this.onOverlayInteracted}>
            <SmartBanner />
            <div>
              {children}
            </div>
          </Overlay>
        </CSSTransition>
      </>
    );
  }
}

SlideUpOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
  browser: PropTypes.shape({
    os: PropTypes.string,
  }).isRequired,
  onOverlayScrolled: PropTypes.func,
  overlayScrolled: PropTypes.bool,
};

SlideUpOverlay.defaultProps = {
  onOverlayScrolled: () => {},
  overlayScrolled: false,
};

const mapDispatchToProps = {
  onOverlayScrolled: playerOverlayScrolled,
};

function mapStateToProps({ device: { browser }, userInteractions }) {
  return {
    browser,
    overlayScrolled: userInteractions.playerOverlayAScrolled,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideUpOverlay);
