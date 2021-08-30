import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ObserverContainer = styled.div`
  height: 100%;
  width: 100%;
`;

/**
 * Component that will detect when the section is visible in the viewport
 */
export default class Observer extends React.Component {
  static propTypes = {
    onVisible: PropTypes.func.isRequired, // callback to call when loading is visible
    children: PropTypes.node.isRequired,
    offset: PropTypes.string,
  };

  static defaultProps = {
    offset: '0px',
  };

  constructor(prop) {
    super(prop);
    this.container = React.createRef();
  }

  componentDidMount() {
    // this.rootElem = document.querySelector(`${this.props.root}`);
    if (!this.container.current) {
      return;
    }

    // threshold
    // Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback
    // should be executed. If you only want to detect when visibility passes the 50% mark, you can use a value of 0.5. If you want the callback
    // to run every time visibility passes another 25%, you would specify the array [0, 0.25, 0.5, 0.75, 1].
    // The default is 0 (meaning as soon as even one pixel is visible, the callback will be run).
    // A value of 1.0 means that the threshold isn't considered passed until every pixel is visible.
    // We can expand the rectangle’s dimensions by setting a positive root margin, and shrink it by setting a negative root margin.
    this.observer = new IntersectionObserver(this.interSectionCallback, { threshold: 0, rootMargin: this.props.offset });

    // The frequency in which the polyfill polls for intersection changes
    this.observer.POLL_INTERVAL = 100;
    this.observer.observe(this.container.current);
  }

  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  interSectionCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.props.onVisible();
        this.observer.disconnect();
      }
    });
  };

  render() {
    return (
      <ObserverContainer ref={this.container}>
        {this.props.children}
      </ObserverContainer>
    );
  }
}
