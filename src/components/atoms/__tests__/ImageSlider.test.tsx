import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ImageSlider from '../ImageSlider';
import { ImageType } from '../../../types/image';

jest.mock('react-native-reanimated-carousel', () => {
  return ({ renderItem, data }: any) => {
    const { View } = require('react-native');
    return (
      <View testID="carousel-mock">
        {data.map((item: any, index: number) => (
          <View key={index} testID={`carousel-item-${index}`}>
            {renderItem({ item, index })}
          </View>
        ))}
      </View>
    );
  };
});

describe('ImageSlider Component', () => {
  const images: ImageType[] = [
    { uri: { uri: 'https://example.com/image1.jpg' } },
    { uri: { uri: 'https://example.com/image2.jpg' } },
  ];

  const onImagePress = jest.fn();

  it('renders correctly with given images', () => {
    const { getAllByTestId } = render(<ImageSlider images={images} onImagePress={onImagePress} />);

    const imageComponents = getAllByTestId(/^image-/);
    expect(imageComponents.length).toBe(images.length);
  });

  it('handles image press event', () => {
    const { getAllByTestId } = render(<ImageSlider images={images} onImagePress={onImagePress} />);

    const imageComponents = getAllByTestId(/^image-/);
    fireEvent.press(imageComponents[0]);

    expect(onImagePress).toHaveBeenCalledWith(images[0]);
  });
});
