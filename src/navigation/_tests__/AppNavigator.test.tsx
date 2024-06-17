import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';
import AppNavigator from '../AppNavigator';
import { SelectedImageProvider, useSelectedImage } from '../../context/SelectedImageContext';

jest.mock('../../screens/DashboardScreen', () => {
  const { Text } = require('react-native');
  return () => <Text>Dashboard Screen</Text>;
});

jest.mock('../../screens/ProfileScreen', () => {
  const { Text } = require('react-native');
  return () => <Text>Profile Screen</Text>;
});

jest.mock('../../screens/MarketDataScreen', () => {
  const { Text } = require('react-native');
  return () => <Text>Market Data Screen</Text>;
});

jest.mock('../../context/SelectedImageContext', () => {
  const actualModule = jest.requireActual('../../context/SelectedImageContext');
  return {
    ...actualModule,
    useSelectedImage: jest.fn(),
  };
});

const mockUseSelectedImage = useSelectedImage as jest.MockedFunction<typeof useSelectedImage>;

describe('AppNavigator', () => {
  beforeEach(() => {
    mockUseSelectedImage.mockClear();
  });

  it('renders dashboard and market data tabs', () => {
    mockUseSelectedImage.mockReturnValue({ selectedImage: null, setSelectedImage: jest.fn() });

    const { getAllByText } = render(
      <SelectedImageProvider>
        <AppNavigator />
      </SelectedImageProvider>
    );

    expect(getAllByText('Dashboard')).toBeTruthy();
    expect(getAllByText('Market Data')).toBeTruthy();
  });
});
