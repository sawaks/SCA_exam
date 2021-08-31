// use em in breakpoints to work properly cross-browser and support users
// changing their browsers font-size: https://zellwk.com/blog/media-query-units/

const breakpoints = ['40em', '52em', '64em', '76em'];

const screen = {
  mobile: `@media screen and (min-width: ${breakpoints[0]})`,
  tablet: `@media screen and (min-width: ${breakpoints[1]})`,
  laptop: `@media screen and (min-width: ${breakpoints[2]})`,
  desktop: `@media screen and (min-width: ${breakpoints[3]})`,
};

export default screen;
