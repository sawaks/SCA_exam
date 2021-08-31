const spacing = {
  none: 0,
  xs: 3,
  s: 6,
  m: 12,
  l: 24,
  xl: 48,
  xxl: 96,
};

Object.keys(spacing).forEach((key) => {
  spacing[key] = `${spacing[key]}px`;
});

export default spacing;
