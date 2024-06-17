export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

export const trimTrailingZeros = (input: string): string => {
  const num = parseFloat(input);

  return num.toString().replace(/(\.\d*?[1-9])0+|\.0*$/, '$1');
}
