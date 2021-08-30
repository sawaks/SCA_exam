import React from 'react';
import Observer from 'components/Observer';

// High order component that tells when the Wrapped component is in the viewport
function withObserver(WrappedComponent) {
  return class extends React.Component {
    state = {
      visible: false,
    };

    /**
     * handleVisible
     * @description When an image enters the page render it.
     * Simple lazy loading implementation with Observer
     */
    handleVisible = () => {
      this.setState({ visible: true });
    };

    render() {
      return (
        <Observer onVisible={this.handleVisible}>
          <WrappedComponent visible={this.state.visible} {...this.props} />
        </Observer>
      );
    }
  };
}

export default withObserver;
