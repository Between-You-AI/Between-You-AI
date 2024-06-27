import {useEffect, useRef, useState} from "react";
import {WebSocketMessage, messageTypes} from "./websocket.type";
import {QueryKey, useQueryClient} from "@tanstack/react-query";

const useWebSocket = (url: string) => {
  const queryClient = useQueryClient();
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    socket.onmessage = (message) => {
      const data = JSON.parse(message.data) as WebSocketMessage;
      handleWebSocketMessage(data);
    };

    socket.onclose = () => {
      console.log("WebSocket Client Disconnected");
    };

    return () => {
      socket.close();
    };
  }, [url]);

  const handleWebSocketMessage = (message: WebSocketMessage) => {
    switch (message.type) {
      case messageTypes.TASK:
        queryClient.setQueryData([messageTypes.TASK], (oldData: any) => {
          return [...oldData, message.data];
        });
        break;
      case messageTypes.OBJECTIVE:
        queryClient.setQueryData([messageTypes.OBJECTIVE], (oldData: any) => {
          return [...oldData, message.data];
        });
        break;
      default:
        console.warn("Unknown message type:", message.type);
    }
  };

  const sendMessage = (message: Object) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    }
  };

  return {sendMessage};
};

export default useWebSocket;
