export function easeInQuart(x) {
  return x * x * x * x;
}
export function easeOutQuart(x) {
  const expo = (1 - x) ** 4;
  return 1 - expo;
}

export default {
  easeInQuart,
  easeOutQuart,
};
