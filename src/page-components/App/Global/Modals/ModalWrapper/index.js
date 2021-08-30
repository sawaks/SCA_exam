import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import zIndex from 'styles/helpers/zIndex';
import BodyScrollLock from './components/BodyScrollLock';

const customStyles = {
  overlay: {
    zIndex: zIndex.modal,
  },
};

class ModalWrapper extends PureComponent {
  constructor(props) {
    super(props);
    ReactModal.setAppElement('#__next');
  }

  render() {
    const { isOpen, handleClose, children } = this.props;
    return (
      <ReactModal
        isOpen={isOpen}
        className="signup-portal"
        overlayClassName={{
          base: 'portal-overlay',
          afterOpen: 'portal-overlay-after-open',
          beforeClose: 'portal-overlay-before-close',
        }}
        closeTimeoutMS={1000}
        onRequestClose={handleClose}
        style={customStyles}
      >
        <BodyScrollLock>
          {children}
        </BodyScrollLock>
      </ReactModal>
    );
  }
}

ModalWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
};

ModalWrapper.defaultProps = {
  isOpen: false,
};

export default ModalWrapper;
