import React from 'react';
import { Text } from 'react-native';

interface TextLabelProps {
  text: string;
  style?: object;
}

const TextLabel: React.FC<TextLabelProps> = ({ text, style }) => (
  <Text style={style}>{text}</Text>
);


export default TextLabel;
