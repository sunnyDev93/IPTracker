import { fetchLocationData } from '../api';
import apiClient from '../apiClient';
import { LocationData } from '../../types/locationData';

jest.mock('../apiClient');

const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('fetchLocationData', () => {
  const mockLocationData: LocationData = {
      ip: '192.168.0.1',
      city: 'New York',
      timezone: { utc: '-04:00' },
      postal: '10001',
      country_code: 'US',
      connection: { isp: 'My ISP' },
      isp: '',
      utc: ''
  };

  beforeEach(() => {
    mockApiClient.get.mockClear();
  });

  it('fetches location data without an IP', async () => {
    mockApiClient.get.mockResolvedValue({ data: mockLocationData });

    const data = await fetchLocationData();

    expect(mockApiClient.get).toHaveBeenCalledWith('');
    expect(data).toEqual(mockLocationData);
  });

  it('fetches location data with an IP', async () => {
    const ip = '8.8.8.8';
    mockApiClient.get.mockResolvedValue({ data: mockLocationData });

    const data = await fetchLocationData(ip);

    expect(mockApiClient.get).toHaveBeenCalledWith(ip);
    expect(data).toEqual(mockLocationData);
  });
});
