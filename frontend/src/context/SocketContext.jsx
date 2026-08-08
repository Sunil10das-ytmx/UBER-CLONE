import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL || 'http://localhost:4000'}`);

const SocketProvider = ({ children }) => {
    useEffect(() => {
        // Basic connection topic with server
        socket.on('connect', () => {});
        socket.on('disconnect', () => {});
    }, []);

    // const sendMessage = (eventName, message) => {
    //     socket.emit(eventName, message);
    // };

    // const receiveMessage = (eventName, callback) => {
    //     socket.on(eventName, callback);
    // };

    return (
        <SocketContext.Provider value={{ socket}}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
