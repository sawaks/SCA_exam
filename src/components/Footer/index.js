import namedRoutes from 'common/named-routes';
import Button from 'components/Button';
import addToDataLayer from 'utilities/helpers/dataLayer';
import { Flex } from 'components/Grid';
import Section from 'components/Section';
import React from 'react';
import styled from 'styled-components';
import screen from 'styles/helpers/media';

import Facebook from './assets/Facebook.svg';
import Instagram from './assets/Instagram.svg';
import Twitter from './assets/Twitter.svg';
import YouTube from './assets/you-tube.svg';

const StyledSection = styled(Section)`
  padding-top: 12px;
  padding-bottom: 48px;

  ${screen.md} {
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
  ${screen.md}{
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
              href: namedRoutes.external.contactUs,
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
              href: namedRoutes.external.faq,
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
            link={{ href: 'https://www.youtube.com/channel/UCzy5XU9J0gCop46j-dCWggQ', passHref: true }}
            icon={<YouTube />}
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
