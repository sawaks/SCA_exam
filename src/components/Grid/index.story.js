import React from 'react';
import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { Container, Row, Column } from 'components/Grid';

storiesOf('Grid', module)
  .addWithJSX('Container',
    withNotes(`
      This is the main layout container, it maxs out at 1140px
    `)(() => (
      <Container>
        Container
      </Container>
    ))
  )
  .addWithJSX('Row',
    withNotes(`
      This is the main layout container, it maxs out at 1140px
    `)(() => (
      <Row>
        Row
      </Row>
    ))
  )
  .addWithJSX('Column',
    withNotes(`
      This is the main layout container, it maxs out at 1140px
    `)(() => (
      <Column>
        Column
      </Column>
    ))
  )
  .addWithJSX('Usage',
    withNotes(`
      The Container, Row and Column components used together provide us with a flex based grid system.
      Based on: https://github.com/rebassjs/grid
    `)(() => (
      <Container>
        <Row>
          <Column>
            Column 1
          </Column>
          <Column>
            Column 2
          </Column>
          <Column>
            Column 3
          </Column>
          <Column>
            Column 4
          </Column>
        </Row>
        <Row>
          <Column>
            Column 5
          </Column>
          <Column>
            Column 6
          </Column>
          <Column>
            Column 7
          </Column>
        </Row>
      </Container>
    ))
  );

