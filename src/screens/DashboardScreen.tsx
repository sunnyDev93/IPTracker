import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import FormInput from '../components/atoms/FormInput';
import Button from '../components/atoms/Button';
import ImageSlider from '../components/atoms/ImageSlider';
import theme from '../styles/theme';
import { DashboardScreenNavigationProp } from '../types/navigation';
import { ImageType } from '../types/image';
import { LocationData } from '../types/locationData';
import { fetchLocationData } from '../services/api';
import { IMAGES } from '../constants/images';
import InfoContainer from '../components/InfoContainer';
import TextLabel from '../components/atoms/TextLabel';
import { useSelectedImage } from '../context/SelectedImageContext';

interface DashboardScreenProps {
  navigation: DashboardScreenNavigationProp;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const [ip, setIP] = useState('');
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const { selectedImage, setSelectedImage } = useSelectedImage();

  const images: ImageType[] = [
    { uri: IMAGES.image1 },
    { uri: IMAGES.image2 },
    { uri: IMAGES.image1 },
    { uri: IMAGES.image2 },
  ];
  
  useEffect(() => {
    const fetchInitialLocationData = async () => {
      const data = await fetchLocationData();
      setLocationData(data);
    };
    fetchInitialLocationData();
  }, []);

  const handleIPSubmit = async () => {
    const data = await fetchLocationData(ip);
    setLocationData(data);
  };

  const handleImagePress = (image: ImageType) => {
    setSelectedImage(image);
    if (locationData && image) {
      navigation.navigate('Profile', { locationData, image });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <TextLabel style={styles.headerText} text='IP Tracker' />
        <View style={styles.searchContainer}>
          <FormInput
            value={ip}
            onChangeText={setIP}
            placeholder="Search for any IP address"
            style={styles.formInput}
          />
          <Button title=">" onPress={handleIPSubmit} style={styles.searchButton} textStyle={styles.searchButtonText} />
        </View>
      </View>
      {locationData && (
        <InfoContainer
          locationData={locationData}
        />
      )}
      <ImageSlider images={images} onImagePress={handleImagePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  searchWrapper: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: 20,
  },
  headerText: {
    fontSize: theme.fonts.size.large,
    fontWeight: theme.fonts.weight.bold,
    textAlign: 'center',
    color: theme.colors.white,
    marginVertical: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.dimensions.borderRadius,
    marginBottom: 20,
    width: '70%',
    height: theme.dimensions.inputHeight,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  formInput: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.dimensions.borderRadius,
    borderBottomLeftRadius: theme.dimensions.borderRadius,
    height: '100%',
  },
  searchButton: {
    backgroundColor: theme.colors.black,
    borderTopRightRadius: theme.dimensions.borderRadius,
    borderBottomRightRadius: theme.dimensions.borderRadius,
    paddingHorizontal: 15,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: theme.colors.text,
    fontSize: theme.fonts.size.medium,
  },
});

export default DashboardScreen;
