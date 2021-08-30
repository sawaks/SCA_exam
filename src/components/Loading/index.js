import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import styled, { keyframes } from 'styled-components';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 4em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const trackAnimation = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(200%);
  }
`;

const LoaderTrack = styled.div`
  height: 6px;
  width: 80%;
  overflow: hidden;

  &::before {
    content: '';
    width: 50%;
    height: 6px;
    background-color: ${({ theme }) => theme.primary};
    display: block;
    animation-name: ${trackAnimation};
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-duration: 1.75s;
    animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
    will-change: transform;
  }
`;

export const Loader = ({ text = null }) => (
  <LoaderContainer>
    <span style={{ marginBottom: '12px' }}>{text || 'Loading...'}</span>
    <LoaderTrack />
  </LoaderContainer>
);

const Loading = (props) => {
  const { loading, render, text } = props;
  return (
    <Transition in={!loading} timeout={duration}>
      {state => (
        loading
          ? <Loader text={text} />
          : (
            <div style={{ ...defaultStyle, ...transitionStyles[state], willChange: 'opacity' }} key="trans">
              {render()}
            </div>
          )
      )}
    </Transition>
  );
};

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
  render: PropTypes.func,
  text: PropTypes.string,
};

Loading.defaultProps = {
  render: null,
  text: null,
};

Loader.propTypes = {
  text: PropTypes.string,
};

Loader.defaultProps = {
  text: null,
};

export default Loading;
