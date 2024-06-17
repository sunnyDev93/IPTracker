import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { FormInputProps } from '../../types/components';
import theme from '../../styles/theme';

const FormInput: React.FC<FormInputProps> = ({ value, onChangeText, placeholder, style }) => (
  <TextInput
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    style={style || styles.input}
  />
);

const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
    fontSize: theme.fonts.size.medium,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: theme.fonts.size.medium,
  },
});

export default FormInput;
