import { formatPrice, trimTrailingZeros } from '../helpers';

describe('formatPrice', () => {
  it('should format a number as a price string', () => {
    expect(formatPrice(1234.56)).toBe('$1234.56');
    expect(formatPrice(0)).toBe('$0.00');
    expect(formatPrice(1.234)).toBe('$1.23');
    expect(formatPrice(1.236)).toBe('$1.24');
  });
});

describe('trimTrailingZeros', () => {
  it('should remove trailing zeros from a string representation of a number', () => {
    expect(trimTrailingZeros('1234.5600')).toBe('1234.56');
    expect(trimTrailingZeros('1234.5000')).toBe('1234.5');
    expect(trimTrailingZeros('1234.0000')).toBe('1234');
    expect(trimTrailingZeros('0.0000')).toBe('0');
  });

  it('should handle numbers without trailing zeros correctly', () => {
    expect(trimTrailingZeros('1234.56')).toBe('1234.56');
    expect(trimTrailingZeros('1234')).toBe('1234');
  });

  it('should handle edge cases', () => {
    expect(trimTrailingZeros('0.1')).toBe('0.1');
    expect(trimTrailingZeros('0.10')).toBe('0.1');
    expect(trimTrailingZeros('0')).toBe('0');
  });
});
