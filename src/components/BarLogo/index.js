import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import nameRoutes from 'common/named-routes';
import Logo from 'components/Icons/listnr-logo.svg';
import { Desktop, Mobile } from 'components/Screen';
import spacing from 'styles/helpers/spacing';
import screen from 'styles/helpers/media';

const StyledLogo = styled(Logo)`
  cursor: pointer;
  height: 31px;
  width: 40px;
  margin-right: ${spacing.m};
  & .st0 {
    fill: #0095d7;
  }
  & .st1 {
    fill: #dcecf9;
  }

  ${screen.md} {
    margin: ${spacing.s} ${spacing.m} ${spacing.s} 0;
  }

  ${screen.xl} {
    height: 31px;
    width: 185px;
  }
`;

const LogoContainer = styled.a`
  display: flex;
  align-items: center;
`;

const BarLogo = () => (
  <Link href={`${nameRoutes.external.root}`}>
    <LogoContainer title="Listnr logo">
      <Mobile>
        <StyledLogo />
      </Mobile>
      <Desktop><StyledLogo /></Desktop>
    </LogoContainer>
  </Link>
);

export default BarLogo;
