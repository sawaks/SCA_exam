import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'components/Button';
import zIndex from 'styles/helpers/zIndex';
import screen from 'styles/helpers/screen';

const DropdownWrapper = styled.span`
  cursor: pointer;
  position: relative;
  display: inline-block;
`;

const Dropdown = styled.span`
  position: absolute;
  z-index: ${zIndex.socialPopup};
  border-radius: 6px;
  border: ${props => (props.withBorder ? '1px solid rgba(255, 255, 255, 0.2)' : 'none')};
  background-color: ${props => (props.theme.background)};
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.5);
  width: ${props => (props.mobileBoxWidth ? `${props.mobileBoxWidth}` : '130px')};
  height: ${props => (props.mobileBoxHeight ? `${props.mobileBoxHeight}` : 'initial')};
  bottom: ${props => (props.mobileOffsetY ? `${props.mobileOffsetY}` : '0px')};
  right: ${props => (props.mobileOffsetX ? `${props.mobileOffsetX}` : '30px')};
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};

  ${screen.tablet} {
    width: ${props => (props.boxWidth ? `${props.boxWidth}` : '130px')};
    height: ${props => (props.boxHeight ? `${props.boxHeight}` : 'initial')};
    bottom: ${props => (props.offsetY ? `${props.offsetY}` : '0px')};
    right: ${props => (props.offsetX ? `${props.offsetX}` : '30px')};
  }
`;

class DropdownButton extends Component {
  constructor(props) {
    super(props);
    // Every dropdown needs an id to ensure multiple dropdowns on a page can be fired independently
    const dropdownId = props.id;
    this.state = { [dropdownId]: false };
    this.wrapperRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    document.addEventListener('touchstart', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.removeEventListener('touchstart', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      const { id } = this.props;
      if (this.state[id] === true) {
        this.setState({ [id]: false });
      }
    }
  }

  toggleDropdown = (e, id) => {
    if (this.props.disable) {
      return;
    }
    this.setState(prevState => ({ [id]: !prevState[id] }));
  };

  render() {
    const { disable, id: dropdownId, ...rest } = this.props;
    return (
      <DropdownWrapper ref={this.wrapperRef} onClick={e => this.toggleDropdown(e, dropdownId)} disable={disable}>
        <Button {...this.props} />
        <Dropdown isVisible={this.state[dropdownId]} {...rest}>
          {this.props.children}
        </Dropdown>
      </DropdownWrapper>
    );
  }
}

DropdownButton.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
  offsetY: PropTypes.string,
  offsetX: PropTypes.string,
  boxWidth: PropTypes.string,
  boxHeight: PropTypes.string,
  mobileBoxWidth: PropTypes.string,
  mobileBoxHeight: PropTypes.string,
  mobileOffsetX: PropTypes.string,
  mobileOffsetY: PropTypes.string,
  minWidthDesktop: PropTypes.string,
  minWidthMobile: PropTypes.string,
  maxWidthDesktop: PropTypes.string,
  withBorder: PropTypes.bool,
  disable: PropTypes.bool,
  icon: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.element,
    PropTypes.symbol,
  ]),
};

DropdownButton.defaultProps = {
  offsetY: null,
  offsetX: null,
  boxHeight: null,
  boxWidth: null,
  mobileBoxWidth: null,
  mobileBoxHeight: null,
  mobileOffsetX: null,
  mobileOffsetY: null,
  minWidthDesktop: null,
  minWidthMobile: null,
  maxWidthDesktop: null,
  withBorder: false,
  disable: false,
  icon: null,
  children: null,
};

export default DropdownButton;
