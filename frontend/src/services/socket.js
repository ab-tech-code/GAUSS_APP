// src/services/socket.js
import { io } from "socket.io-client";

let socket = null;

export function connectSocket(vendorId) {
  if (!vendorId) return;

  const backendUrl = process.env.REACT_APP_API_URL;

  socket = io(backendUrl, {
    transports: ["websocket"],
    query: { vendorId },
  });

  socket.on("connect", () => {
    console.log("✅ WebSocket connected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("❌ WebSocket disconnected");
  });

  return socket;
}

export function listenToOrderUpdates(callback) {
  if (!socket) return;

  socket.on("order_update", (data) => {
    console.log("📦 Incoming Order Update:", data);
    callback(data);
  });
}

export function listenToNewOrder(callback) {
  if (!socket) return;

  socket.on("new_order", (data) => {
    console.log("🆕 New Order:", data);
    callback(data);
  });
}

export function disconnectSocket() {
  if (socket) socket.disconnect();
}
