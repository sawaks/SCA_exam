import React from 'react';
// import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import PropTypes from 'prop-types';

/**
 * BodyScrollLock
 * @description Prevents scrolling of body on IOS devices when modal is open.
 */
class BodyScrollLock extends React.Component {
  targetRef = React.createRef();

  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  // componentDidMount() {
  //   disableBodyScroll(this.targetRef.current);
  // }

  // componentWillUnmount() {
  //   clearAllBodyScrollLocks();
  // }

  render() {
    return (
      <div ref={this.targetRef}>
        {this.props.children}
      </div>
    );
  }
}
export default BodyScrollLock;
