import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import theme from '../styles/theme';
import { ProfileScreenRouteProp } from '../types/navigation';
import InfoContainer from '../components/InfoContainer';

type ProfileScreenProps = {
  route: ProfileScreenRouteProp;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ route }) => {
  const locationData = route.params?.locationData;
  const image = route.params?.image;
  
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={image.uri} style={styles.image} testID="profile-image" />
      </View>
      <InfoContainer locationData={locationData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 30,
    marginBottom: 20,
    
  },
  text: {
    fontSize: theme.fonts.size.medium,
    color: theme.colors.text,
    marginBottom: 10,
  },
  image: {
    borderRadius: theme.dimensions.borderRadius,
    width: "100%",
    height: 150,
  },
});

export default ProfileScreen;
