import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import ArrowLeft from './assets/arrow-left.svg';

const Button = styled.button`
  display: inline-flex;
  cursor: pointer;
  text-align: center;
  position: absolute;
  top: 10px;
  left: 5px;
  border: 0;
  outline: 0;
  background: none;

  @media (min-width: 768px) {
    display: none;
  }
`;
const Arrow = styled(ArrowLeft)`
  height: 11px;
  width: 15px;
  fill: ${props => props.theme.primary};
  margin-right: 5px;
  transform: rotate(180deg);
`;

export class BackButton extends Component {
  handleClick = () => {
    this.props.router.push({
      pathname: '/listen/stations',
      query: { stationCode: this.props.stationCode },
    }, `/stations/${this.props.stationCode}`);
  }

  render() {
    return (
      <Button onClick={this.handleClick}>
        <Arrow />
      </Button>
    );
  }
}

BackButton.propTypes = {
  router: PropTypes.shape({
    back: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  stationCode: PropTypes.string.isRequired,
};

function mapStateToProps({ nowLive }) {
  return { stationCode: nowLive.stationCode };
}

export default withRouter(connect(mapStateToProps)(BackButton));
