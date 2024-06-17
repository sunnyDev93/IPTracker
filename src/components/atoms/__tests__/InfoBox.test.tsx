import React from 'react';
import { render } from '@testing-library/react-native';
import InfoBox from '../InfoBox';

describe('InfoBox Component', () => {
  it('renders correctly with given label and value', () => {
    const { getByText } = render(<InfoBox label="Name" value="John Doe" />);

    expect(getByText('Name:')).toBeTruthy();
    expect(getByText('John Doe')).toBeTruthy();
  });

  it('applies correct styles to label and value', () => {
    const { getByText } = render(<InfoBox label="Name" value="John Doe" />);

    const label = getByText('Name:');
    const value = getByText('John Doe');

    expect(label.props.style).toMatchObject({
      fontWeight: 'bold',
      marginRight: 5,
    });
    expect(value.props.style).toMatchObject({
      flexShrink: 1,
    });
  });
});
