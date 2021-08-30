// See https://github.com/rebassjs/grid
//     https://github.com/rebassjs/grid#extending-components
import { Box, Flex } from '@rebass/grid';
import React from 'react';

const SPACING = 2;

const Container = props => (
  <Box
    {...props}
    px={[10, 12, 12]}
    style={{
      maxWidth: '1364px',
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}
  />
);
const Content = props => (
  <Box
    {...props}
    mx="auto"
    style={{
      maxWidth: '1000px',
      width: '100%',
    }}
  />
);

const Row = React.forwardRef((props, ref) => (
  <Flex
    {...props}
    mx={-SPACING}
    ref={ref}
  />
));

const Column = props => (
  <Box
    {...props}
    px={SPACING}
    flex="1 1 auto"
  />
);

export { Container, Content, Row, Column, Box, Flex };
