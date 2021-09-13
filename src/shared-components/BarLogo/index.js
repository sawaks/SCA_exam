import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import routes from 'routes';
import Logo from 'shared-components/Icons/ListnrLogo';
import { Desktop, Mobile } from 'shared-components/Screen';
import spacing from 'src/styling/spacing';
import screen from 'src/styling/screen';

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

  ${screen.tablet} {
    margin: ${spacing.s} ${spacing.m} ${spacing.s} 0;
  }

  ${screen.desktop} {
    height: 31px;
    width: 185px;
  }
`;

const LogoContainer = styled.a`
  display: flex;
  align-items: center;
`;

const BarLogo = () => (
  <Link href={`${routes.root}`}>
    <LogoContainer title="Listnr logo">
      <Mobile>
        <StyledLogo />
      </Mobile>
      <Desktop><StyledLogo /></Desktop>
    </LogoContainer>
  </Link>
);

export default BarLogo;
