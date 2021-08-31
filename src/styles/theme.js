export default {
  name: 'LiSTNR (Web)',
  // Base colors
  // These should match the "Colour use" section of the Design System
  primary: '#ff595a',
  primaryActive: '#dd3636',
  dark: '#201f20',
  light: '#ffffff',
  milkPunch: '#fff3d3',
  black: '#000000',
  lightslategray: '#79787a',
  background: '#201f20',
  backgroundLight: '#414042',
  backgroundLight2: '#403f41',
  backgroundPale: '#495a63',
  formError: '#f67504',
  formSuccess: '#7faaed',
  // Implementation variables
  // NOTE: These should only be used for common design elements between
  // different components. If they are particular to a component, they should be
  // defined there.
  // If you are unsure if you should be adding anything here, you shouldn't.
  primaryText: 'rgba(255, 255, 255, 1)',
  secondaryText: 'rgba(255, 255, 255, 0.7)',
  secondaryBorder: 'rgba(255, 255, 255, 0.16)',
  // gradient
  backgroundGradient: 'linear-gradient(to bottom, rgba(32, 31, 32, 0), #201f20 99%)',
  bodyFontSize: '12px',
  bodyFontFamily: 'Inter, sans-serif',
  headingFontFamily: 'dunbar-tall, sans-serif',
  whiteColor: '#ffffff',
  blackColor: '#000000',
  // Reserved for rebass/grid
  // https://github.com/rebassjs/grid#theming
  breakpoints: ['40em', '52em', '64em', '76em'], // if any are added, make sure to update ./screen.js
  space: [0, 3, 6, 12, 24, 48, 96, 192, 384],
};
