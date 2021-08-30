import React from 'react';
import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import Tag from 'components/Tag';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import screen from 'styles/helpers/media';

const Div = styled.div`
  display: flex;
  width: 258px;
  overflow-x: hidden;
  position: relative;
`;

const Edge = styled(Flex)`
  position: absolute;
  z-index: 1;
  height: 100%;
  width: 18px;
  top: 0;
  background: linear-gradient(to right, rgba(241, 241, 241, 0), #eee);
  right: 0;
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: opacity 0.3s ease;
  justify-content: ${props => ((props.direction === 'right') ? 'flex-end' : 'flex-start')};
  pointer-events: ${props => (props.visible ? 'initial' : 'none')};
  
  ${screen.md} {
    display: flex;
  }
`;

/**
 * @description: Storybook is a component explorer in development environment to examine the UI of a component.
 * It allows to browse a component library, view the different states of each component,
 * and interactively develop and test components.
 */
storiesOf('Tag', module)
// This chip will return medium or default background colored chip as the variant is 'medium'
  .addWithJSX('Red',
    withNotes('Red tag')(() => (
      <Tag
        text="E"
        variant="red"
      />
    )),
  )
  .addWithJSX('Blue',
    withNotes('Blue tag')(() => (
      <Tag
        text="New"
        variant="blue"
      />
    )),
  )
  .addWithJSX('White',
    withNotes('White tag')(() => (
      <Div>
        <Tag
          text="ENTREPRENEUR fdd"
          variant="white"
        />
        <Tag
          text="BUSINESS"
          variant="white"
        />
        <Tag
          text="ENTREPRENEUR"
          variant="white"
        />
        <Edge direction="right" visible />
      </Div>
    )),
  );
