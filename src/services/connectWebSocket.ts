import { WEBSOCKET_SUBSCRIBE_MESSAGE } from "../constants/api";

export const connectWebSocket = (url: string, onMessage: (message: any) => void) => {
    const ws = new WebSocket(url);
    
    ws.onopen = () => {
      console.log('WebSocket connection opened');
      ws.send(WEBSOCKET_SUBSCRIBE_MESSAGE);
    };
  
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      onMessage(message);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error', error);
    };
    

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
    return ws;
  };
  