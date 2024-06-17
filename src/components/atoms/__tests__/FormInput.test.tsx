import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FormInput from '../FormInput';
import { FormInputProps } from '../../../types/components';
import theme from '../../../styles/theme';

describe('FormInput Component', () => {
  const props: FormInputProps = {
    value: 'Initial Value',
    onChangeText: jest.fn(),
    placeholder: 'Enter text',
  };

  it('renders correctly with default styles', () => {
    const { getByPlaceholderText } = render(<FormInput {...props} />);
    
    const input = getByPlaceholderText('Enter text');
    expect(input).toBeTruthy();
    expect(input.props.value).toBe('Initial Value');
    expect(input.props.style).toMatchObject({
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      fontSize: theme.fonts.size.medium,
    });
  });

  it('calls onChangeText when text changes', () => {
    const { getByPlaceholderText } = render(<FormInput {...props} />);
    
    const input = getByPlaceholderText('Enter text');
    fireEvent.changeText(input, 'New Value');
    
    expect(props.onChangeText).toHaveBeenCalledWith('New Value');
  });

  it('applies custom styles', () => {
    const customStyle = { borderColor: 'blue', borderWidth: 2 };
    const { getByPlaceholderText } = render(<FormInput {...props} style={customStyle} />);
    
    const input = getByPlaceholderText('Enter text');
    expect(input.props.style).toMatchObject(customStyle);
  });
});
