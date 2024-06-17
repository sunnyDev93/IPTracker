import React from 'react';
import { render } from '@testing-library/react-native';
import ProfileScreen from '../ProfileScreen';
import { ProfileScreenRouteProp } from '../../types/navigation';
import InfoContainer from '../../components/InfoContainer';

jest.mock('../../components/InfoContainer', () => {
  const { Text } = require('react-native');
  return ({ locationData }) => <Text>Location: {locationData.city}</Text>;
});

describe('ProfileScreen', () => {
  const route: ProfileScreenRouteProp = {
    key: 'ProfileScreen',
    name: 'Profile',
    params: {
      locationData: {
        ip: '192.168.0.1',
        city: 'New York',
        timezone: { utc: '-04:00' },
        postal: '10001',
        country_code: 'US',
        connection: { isp: 'My ISP' },
      },
      image: { uri: 'https://example.com/image.jpg' },
    },
  };

  it('renders correctly with given route params', () => {
    const { getByText, getByTestId } = render(<ProfileScreen route={route} />);

    const image = getByTestId('profile-image');
    expect(image).toBeTruthy();
    expect(getByText('Location: New York')).toBeTruthy();
  });
});
