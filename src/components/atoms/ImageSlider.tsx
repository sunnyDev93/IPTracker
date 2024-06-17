import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ImageType } from '../../types/image';
import theme from '../../styles/theme';

interface ImageSliderProps {
  images: ImageType[];
  onImagePress: (image: ImageType) => void;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, onImagePress }) => {
  const { width } = Dimensions.get('window');
  const itemWidth = width * 0.5;
  const itemSpacing = (width - itemWidth) / 2;

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width}
        height={200}
        autoPlay={true}
        data={images}
        scrollAnimationDuration={1000}
        pagingEnabled
        snapEnabled
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: itemSpacing,
          parallaxAdjacentItemScale: 0.75,
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => onImagePress(item)}
          >
            <Image source={item.uri} style={styles.image} testID={`image-${index}`} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: '100%',
    resizeMode: 'cover',
    borderRadius: theme.dimensions.borderRadius,
    marginRight: 10,
  },
});

export default ImageSlider;
