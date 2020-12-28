import socketio, { Server } from 'socket.io';
import http from 'http';
import calculateDistance from '../utils/calculateDistance';

import { Coordinate } from '../interfaces/Coordinate';
import { Connection } from '../interfaces/Connection';

const connections: Connection[] = [];

let io: Server;

const WebSocketConfig = (server: http.Server) => {
   io = socketio(server);

   io.on('connection', socket => {
      const { latitude, longitude } = socket.handshake.query;

      connections.push({
         id: socket.id,
         coordinates: {
            latitude: Number(latitude),
            longitude: Number(longitude),
         }
      })
   });
};

const FindConnections = (coordinates: Coordinate) => {
   return connections?.filter(connection => {
      return calculateDistance(coordinates, connection.coordinates) < 10;
   })
};

const ToClient = (to: Connection[], message: string, data: any) => {


   to.forEach((connection: Connection) => {
      io.to(connection.id).emit(message, { data, connection_id: connection.id });
   })
};

export {
   WebSocketConfig,
   FindConnections,
   ToClient
};