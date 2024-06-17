import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import MarketDataScreen from '../MarketDataScreen';
import { WEBSOCKET_URL } from '../../constants/api';
import { connectWebSocket } from '../../services/connectWebSocket';

jest.mock('../../services/connectWebSocket', () => ({
  connectWebSocket: jest.fn(),
}));

jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  rn.Dimensions.get = () => ({ width: 400, height: 800 });
  return rn;
});

jest.mock('react-native-chart-kit', () => ({
  LineChart: () => null,
}));

describe('MarketDataScreen', () => {
  const mockWebSocket = {
    close: jest.fn(),
  };

  const mockMessage = {
    e: 'aggTrade',
    p: '50000.00',
  };

  beforeEach(() => {
    (connectWebSocket as jest.Mock).mockImplementation((url, onMessage) => {
      setTimeout(() => onMessage(mockMessage), 100);
      return mockWebSocket;
    });
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<MarketDataScreen />);
    expect(getByTestId("market-data")).toBeTruthy();
  });

  it('updates price and price data on WebSocket message', async () => {
    const { getByText } = render(<MarketDataScreen />);

    await waitFor(() => expect(getByText('btcusdt: 50000')).toBeTruthy());
  });

  it('closes WebSocket connection on unmount', () => {
    const { unmount } = render(<MarketDataScreen />);
    unmount();
    expect(mockWebSocket.close).toHaveBeenCalled();
  });
});
