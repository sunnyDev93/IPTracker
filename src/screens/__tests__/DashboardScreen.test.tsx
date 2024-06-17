import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import DashboardScreen from '../DashboardScreen';
import { fetchLocationData } from '../../services/api';
import { IMAGES } from '../../constants/images';
import { SelectedImageProvider, useSelectedImage } from '../../context/SelectedImageContext';
import { LocationData } from '../../types/locationData';

jest.mock('../../services/api');
jest.mock('../../context/SelectedImageContext', () => {
  const actualModule = jest.requireActual('../../context/SelectedImageContext');
  return {
    ...actualModule,
    useSelectedImage: jest.fn(),
  };
});

const mockFetchLocationData = fetchLocationData as jest.MockedFunction<typeof fetchLocationData>;
const mockUseSelectedImage = useSelectedImage as jest.MockedFunction<typeof useSelectedImage>;

describe('DashboardScreen', () => {
  const mockNavigation: any = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    mockUseSelectedImage.mockReturnValue({
      selectedImage: null,
      setSelectedImage: jest.fn(),
    });
    mockFetchLocationData.mockClear();
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <SelectedImageProvider>
        <NavigationContainer>
          <DashboardScreen navigation={mockNavigation} />
        </NavigationContainer>
      </SelectedImageProvider>
    );

    expect(getByText('IP Tracker')).toBeTruthy();
    expect(getByPlaceholderText('Search for any IP address')).toBeTruthy();
  });

  it('fetches and displays location data on IP submit', async () => {
    const locationData: LocationData = {
        ip: '192.168.0.1',
        city: 'New York',
        timezone: { utc: '-04:00' },
        postal: '10001',
        country_code: 'US',
        connection: { isp: 'My ISP' },
        isp: '',
        utc: ''
    };

    mockFetchLocationData.mockResolvedValue(locationData);

    const { getByPlaceholderText, getByText } = render(
      <SelectedImageProvider>
        <NavigationContainer>
          <DashboardScreen navigation={mockNavigation} />
        </NavigationContainer>
      </SelectedImageProvider>
    );

    const input = getByPlaceholderText('Search for any IP address');
    fireEvent.changeText(input, '192.168.0.1');
    fireEvent.press(getByText('>'));

    await waitFor(() => expect(mockFetchLocationData).toHaveBeenCalledWith('192.168.0.1'));
    await waitFor(() => expect(getByText('New York, US, 10001')).toBeTruthy());
    await waitFor(() => expect(getByText('UTC -04:00')).toBeTruthy());
    await waitFor(() => expect(getByText('My ISP')).toBeTruthy());
  });
});
