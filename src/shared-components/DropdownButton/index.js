import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'shared-components/Button';
import zIndex from 'src/styling/zIndex';
import screen from 'src/styling/screen';

const DropdownWrapper = styled.span`
  cursor: pointer;
  position: relative;
  display: inline-block;
  width: ${props => props.width};
`;

const Dropdown = styled.span`
  position: absolute;
  z-index: ${zIndex.socialPopup};
  border-radius: 6px;
  border: ${props => (props.withBorder ? '1px solid rgba(255, 255, 255, 0.2)' : 'none')};
  background-color: ${props => (props.theme.background)};
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.5);
  width: 130px;
  bottom: 0;
  right: 30px;
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
    const { disable, id: dropdownId, width, ...rest } = this.props;
    return (
      <DropdownWrapper ref={this.wrapperRef} onClick={e => this.toggleDropdown(e, dropdownId)} disable={disable} width={width}>
        <Button {...this.props} />
        <Dropdown isVisible={this.state[dropdownId]} {...rest}>
          {this.props.children}
        </Dropdown>
      </DropdownWrapper>
    );
  }
}

DropdownButton.propTypes = {
  boxHeight: PropTypes.string,
  boxWidth: PropTypes.string,
  children: PropTypes.node,
  disable: PropTypes.bool,
  id: PropTypes.string.isRequired,
  minWidthDesktop: PropTypes.string,
  minWidthMobile: PropTypes.string,
  offsetX: PropTypes.string,
  offsetY: PropTypes.string,
  withBorder: PropTypes.bool,
  width: PropTypes.string,
  icon: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.element,
    PropTypes.symbol,
  ]),
};

DropdownButton.defaultProps = {
  boxHeight: null,
  boxWidth: null,
  children: null,
  disable: false,
  icon: null,
  minWidthDesktop: null,
  minWidthMobile: null,
  offsetX: null,
  offsetY: null,
  withBorder: false,
  width: 0,
};

export default DropdownButton;
