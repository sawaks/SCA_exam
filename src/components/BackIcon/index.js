import React from 'react';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import screen from '../../styles/helpers/media';
import BackIcon from '../Icons/arrow-back.svg';

const StyledIcon = styled(Flex)`
  border-radius: 100%;
  width: 40px;
  height: 40px;
  background-color: ${props => props.theme.backgroundLight};

  ${screen.md} {
    width: 44px;
    height: 44px;
  }
`;

const MoreIconDropdown = () => {
  const { referrerPage } = useSelector(state => state.userInteractions);
  const router = useRouter();
  const onClickhandler = () => {
    router.push(referrerPage || '/');
  };
  return (
    <>
      <StyledIcon justifyContent="center" alignItems="center" onClick={onClickhandler}>
        <BackIcon />
      </StyledIcon>
    </>
  );
};

export default MoreIconDropdown;
