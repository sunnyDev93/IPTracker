import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../Button';
import { ButtonProps } from '../../../types/components';
import theme from '../../../styles/theme';

describe('Button Component', () => {
  const props: ButtonProps = {
    title: 'Test Button',
    onPress: jest.fn(),
  };

  it('renders correctly with default styles', () => {
    const { getByText } = render(<Button {...props} />);
    
    const buttonText = getByText('Test Button');
    expect(buttonText).toBeTruthy();
    expect(buttonText.parent.props.style).toMatchObject({
      color: "#fff",
      fontSize: theme.fonts.size.medium,
    });
  });

  it('calls onPress when pressed', () => {
    const { getByText } = render(<Button {...props} />);
    
    const button = getByText('Test Button');
    fireEvent.press(button);
    
    expect(props.onPress).toHaveBeenCalledTimes(1);
  });

  it('applies custom styles', () => {
    const customTextStyle = { color: 'yellow' };
    const { getByText } = render(<Button {...props} textStyle={customTextStyle} />);
    
    const buttonText = getByText('Test Button');
    expect(buttonText.parent.props.style).toMatchObject(customTextStyle);
    expect(buttonText.props.style).toMatchObject(customTextStyle);
  });
});
