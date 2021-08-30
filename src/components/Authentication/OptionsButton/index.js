import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex } from 'components/Grid';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';

function OptionsButton({ option1, option2, buttonWidth }) {
  return (
    <ButtonWrapper justifyContent="space-between" alignItems="center" width={1} p={spacing.s}>
      {buttonWidth === 'equal'
        ? (
          <>
            <StyledBox3>
              {option1}
            </StyledBox3>
            <StyledBox3>
              {option2}
            </StyledBox3>
          </>
        )
        : (
          <>
            <StyledBox>
              {option1}
            </StyledBox>
            <StyledBox2>
              {option2}
            </StyledBox2>
          </>
        )}

    </ButtonWrapper>
  );
}

OptionsButton.propTypes = {
  option1: PropTypes.node.isRequired,
  option2: PropTypes.node.isRequired,
  buttonWidth: PropTypes.string,
};

OptionsButton.defaultProps = {
  buttonWidth: null,
};

const ButtonWrapper = styled(Flex)`
  height: 52px;
  border-radius: 26px;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.3);
  background-color: ${props => props.theme.light};
`;

const StyledBox = styled(Box)`
  height: 40px;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.3);
  border-radius: 26px;
  margin-right: 3px;
  flex: 0 0 auto;
`;

const StyledBox2 = styled(Box)`
  width: 100%;
  height: 40px;
  border-radius: 26px;
  flex: 1 1 auto;
  margin-left: 3px;
`;

const StyledBox3 = styled(StyledBox2)`
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.3);
  :first-child{
    margin-right: 3px;
  }
`;

export default OptionsButton;
