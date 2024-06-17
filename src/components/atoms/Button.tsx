import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ButtonProps } from '../../types/components';
import theme from '../../styles/theme';

const Button: React.FC<ButtonProps> = ({ title, onPress, style , textStyle}) => (
  <TouchableOpacity style={style || styles.button} onPress={onPress}>
    <Text style={textStyle || styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: theme.fonts.size.medium,
  },
});

export default Button;
