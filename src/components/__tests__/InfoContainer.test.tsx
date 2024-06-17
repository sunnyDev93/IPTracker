import React from 'react';
import { render } from '@testing-library/react-native';
import InfoContainer from '../InfoContainer';
import { LocationData } from '../../types/locationData';
import theme from '../../styles/theme';

describe('InfoContainer Component', () => {
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

  it('renders correctly with given location data', () => {
    const { getByText } = render(<InfoContainer locationData={locationData} />);

    expect(getByText('IP Address')).toBeTruthy();
    expect(getByText('192.168.0.1')).toBeTruthy();
    expect(getByText('Location')).toBeTruthy();
    expect(getByText('New York, US, 10001')).toBeTruthy();
    expect(getByText('Timezone')).toBeTruthy();
    expect(getByText('UTC -04:00')).toBeTruthy();
    expect(getByText('ISP')).toBeTruthy();
    expect(getByText('My ISP')).toBeTruthy();
  });

  it('applies correct styles to labels and values', () => {
    const { getByText } = render(<InfoContainer locationData={locationData} />);

    const label = getByText('IP Address');
    const value = getByText('192.168.0.1');

    expect(label.props.style).toMatchObject({
      color: theme.colors.white,
      fontWeight: 'bold',
      fontSize: theme.fonts.size.medium,
      textAlign: 'center',
      marginBottom: 10,
    });

    expect(value.props.style).toMatchObject({
      color: theme.colors.text,
      fontSize: theme.fonts.size.small
    });
  });
});
