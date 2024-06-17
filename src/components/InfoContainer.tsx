import React from 'react';
import { View, StyleSheet } from 'react-native';
import TextLabel from './atoms/TextLabel';
import theme from '../styles/theme';
import { LocationData } from '../types/locationData';

interface InfoContainerProps {
  locationData: LocationData
}

const InfoContainer: React.FC<InfoContainerProps> = ({ locationData }) => {
    const {ip, city, timezone, postal, country_code, connection} = locationData
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextLabel text="IP Address" style={styles.label} />
        <TextLabel text={ip} style={styles.value} />
      </View>
      <View style={styles.row}>
        <TextLabel text="Location" style={styles.label} />
        <TextLabel text={`${city}, ${country_code}, ${postal}`} style={styles.value} />
      </View>
      <View style={styles.row}>
        <TextLabel text="Timezone" style={styles.label} />
        <TextLabel text={`UTC ${timezone.utc}`} style={styles.value} />
      </View>
      <View style={styles.row}>
        <TextLabel text="ISP" style={styles.label} />
        <TextLabel text={connection.isp} style={styles.value} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 30,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  row: {
    marginBottom: 10,
  },
  label: {
    color: theme.colors.white,
    fontWeight: 'bold',
    fontSize: theme.fonts.size.medium,
    textAlign: "center",
    marginBottom: 10
  },
  value: {
    color: theme.colors.text,
    fontSize: theme.fonts.size.small,
  },
});

export default InfoContainer;
