export const API_BASE_URL = 'https://ipwho.is/';
export const WEBSOCKET_URL = 'wss://stream.binance.com:443/ws/btcusdt@aggTrade';

export const WEBSOCKET_SUBSCRIBE_MESSAGE = JSON.stringify({
  method: 'SUBSCRIBE',
  params: ['btcusdt@aggTrade'],
  id: 1,
});
