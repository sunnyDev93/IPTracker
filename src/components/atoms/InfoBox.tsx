import React from 'react';
import { View, StyleSheet } from 'react-native';
import TextLabel from './TextLabel';

interface InfoBoxProps {
  label: string;
  value: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({ label, value }) => (
  <View style={styles.container}>
    <TextLabel text={`${label}:`} style={styles.label} />
    <TextLabel text={value} style={styles.value} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  label: {
    fontWeight: "bold",
    marginRight: 5,
  },
  value: {
    flexShrink: 1,
  },
});

export default InfoBox;
