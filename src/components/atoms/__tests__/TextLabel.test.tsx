import React from 'react';
import { render } from '@testing-library/react-native';
import TextLabel from '../TextLabel';

describe('TextLabel Component', () => {
  it('renders correctly with given text', () => {
    const { getByText } = render(<TextLabel text="Hello World" />);

    expect(getByText('Hello World')).toBeTruthy();
  });

  it('applies custom styles correctly', () => {
    const customStyle = { color: 'red', fontSize: 20 };
    const { getByText } = render(<TextLabel text="Styled Text" style={customStyle} />);

    const textElement = getByText('Styled Text');
    expect(textElement.props.style).toMatchObject(customStyle);
  });
});
