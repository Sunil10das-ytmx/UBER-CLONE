import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

// Force WebSocket-only transport.
// This prevents Render from routing the HTTP polling handshake to a different
// server instance than the one that holds the persistent WebSocket connection.
const socket = io(`${import.meta.env.VITE_BASE_URL || 'http://localhost:4000'}`, {
    transports: ['websocket'],   // skip long-polling entirely
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
});

const SocketProvider = ({ children }) => {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('[Socket] connected:', socket.id);

            // After any reconnect, re-emit 'join' so the server puts this
            // socket back into the correct room (user_xxx or captains).
            // We read the stored identity from localStorage so this works
            // even after a page refresh / mobile background kill.
            const userId   = localStorage.getItem('userId');
            const userType = localStorage.getItem('userType'); // 'user' or 'captain'
            if (userId && userType) {
                socket.emit('join', { userId, userType });
            }
        });

        socket.on('disconnect', (reason) => {
            console.warn('[Socket] disconnected:', reason);
        });

        socket.on('connect_error', (err) => {
            console.error('[Socket] connection error:', err.message);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('connect_error');
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
