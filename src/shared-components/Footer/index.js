import Button from 'shared-components/Button';
import React from 'react';
import Section from 'shared-components/Layout/Section';
import screen from 'src/styling/screen';
import styled from 'styled-components';
import { Flex } from 'shared-components/Grid';
import Twitter from 'shared-components/Icons/Twitter';
import Instagram from 'shared-components/Icons/Instagram';
import Facebook from 'shared-components/Icons/Facebook';

const StyledSection = styled(Section)`
  padding-top: 12px;
  padding-bottom: 48px;

  ${screen.tablet} {
    padding-bottom: 24px;
  }
`;

const StyledLink = styled.span`
  a {
    min-width: 0;
    padding: 0 12px;
    white-space: nowrap;
  }
`;

const SocialIconWrapper = styled.span`
  cursor: pointer;
  a {
    min-width: 0;
    padding: 12px;
    white-space: nowrap;
    border: none;
    height: auto;
    opacity: .5;
  }
  & a:hover{
      opacity: 1;
    }

  & svg {
    width: 24px;
    height: 24px;

  }
  ${screen.tablet}{
    a {
      min-width: 0;
      padding: 36px 24px 0 24px;
      white-space: nowrap;
    }
  }
`;

function Footer() {
  const termsLink = process.env.NEXT_PUBLIC_TERMS_OF_SERVICE_URL;
  const privacyLink = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL;

  return (
    <StyledSection top>
      <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
        <StyledLink>
          <Button as="a" text="Terms and Conditions" variant="quaternary" link={{ href: termsLink, passHref: true }} target="_blank" rel="noopener noreferrer" />
        </StyledLink>
        <StyledLink>
          <Button as="a" text="Privacy Policy" variant="quaternary" link={{ href: privacyLink, passHref: true }} target="_blank" rel="noopener noreferrer" />
        </StyledLink>
        <StyledLink>
          <Button
            as="a"
            text="Contact"
            variant="quaternary"
            link={{
              href: 'https://www.southerncrossaustereo.com.au/listnr',
              passHref: true,
            }}
          />
        </StyledLink>
        <StyledLink>
          <Button
            as="a"
            text="FAQ"
            variant="quaternary"
            link={{
              href: 'https://www.southerncrossaustereo.com.au/listnr',
              passHref: true,
            }}
          />
        </StyledLink>
        <StyledLink>
          <Button
            as="a"
            text="Advertise"
            variant="quaternary"
            link={{
              href: 'https://www.southerncrossaustereo.com.au/listnr',
              passHref: true,
            }}
            target="_blank"
            rel="noopener noreferrer"
          />
        </StyledLink>
      </Flex>
      <Flex justifyContent="center" alignItems="center">
        <SocialIconWrapper>
          <Button
            as="a"
            variant="tertiary"
            link={{ href: 'https://www.instagram.com/listnrau/', passHref: true }}
            icon={<Instagram />}
            target="_blank"
            rel="noopener noreferrer"
          />
        </SocialIconWrapper>
        <SocialIconWrapper>
          <Button
            as="a"
            variant="tertiary"
            link={{ href: 'https://twitter.com/listnrau', passHref: true }}
            icon={<Twitter />}
            target="_blank"
            rel="noopener noreferrer"
          />
        </SocialIconWrapper>
        <SocialIconWrapper>
          <Button
            as="a"
            variant="tertiary"
            link={{ href: 'https://www.facebook.com/LiSTNRau/', passHref: true }}
            icon={<Facebook />}
            target="_blank"
            rel="noopener noreferrer"
          />
        </SocialIconWrapper>
      </Flex>
    </StyledSection>
  );
}

export default Footer;
