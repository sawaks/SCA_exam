import { withNotes } from '@storybook/addon-notes';
import { storiesOf } from '@storybook/react';
import Button from 'components/Button';
import DropdownButton from 'components/DropdownButton';
import SocialIcon from 'components/Icons/share-social.svg';
import React from 'react';

storiesOf('DropdownButton', module)
  .addWithJSX('Social links',
    withNotes('This is dropdown button with social links')(() => (
      <DropdownButton
        text="Follow Us"
        variant="mono"
        icon={<SocialIcon />}
        id="socialLink"
        minWidthDesktop="0"
        boxWidth="240px"
      >
        <Button
          as="a"
          link={{ as: '/login', href: { pathname: '/login' } }}
          text="Facebook"
          variant="mono"
          minWidthDesktop="0"
        />
        <Button
          as="a"
          link={{ as: '/login', href: { pathname: '/login' } }}
          text="Twitter"
          variant="mono"
          minWidthDesktop="0"
        />
        <Button
          as="a"
          link={{ as: '/login', href: { pathname: '/login' } }}
          text="Instagram"
          variant="mono"
          minWidthDesktop="0"
        />
      </DropdownButton>
    ))
  ).addWithJSX('Custom positioning',
    withNotes('This is dropdown button with social links')(() => (
      <DropdownButton
        text="Follow Us"
        variant="mono"
        icon={SocialIcon}
        id="socialLink"
        minWidthMobile="initial"
        minWidthDesktop="initial"
        offsetY="190px"
        offsetX="210px"
        boxWidth="540px"
      >
        <Button
          as="a"
          link={{ as: '/login', href: { pathname: '/login' } }}
          text="Facebook"
          variant="mono"
          minWidthDesktop="0"
        />
        <Button
          as="a"
          link={{ as: '/login', href: { pathname: '/login' } }}
          text="Twitter"
          variant="mono"
          minWidthDesktop="0"
        />
        <Button
          as="a"
          link={{ as: '/login', href: { pathname: '/login' } }}
          text="Instagram"
          variant="mono"
          minWidthDesktop="0"
        />
      </DropdownButton>
    ))
  );
