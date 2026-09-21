import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

// Allow BOTH transports:
//   - 'websocket'  → fast, preferred on WiFi/stable connections
//   - 'polling'    → fallback for mobile carriers (Jio/Airtel/Vi) that block
//                    raw WebSocket upgrades on their proxy infrastructure
const socket = io(`${import.meta.env.VITE_BASE_URL || 'http://localhost:4000'}`, {
    transports: ['websocket', 'polling'],
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

        // ── Keepalive ──────────────────────────────────────────────────────────
        // Mobile browsers (Chrome/Safari on Android/iOS) freeze JavaScript when
        // the screen dims or the user briefly switches apps. This kills the
        // socket connection. We send a lightweight ping every 20 s so the
        // browser keeps the connection alive as long as the tab is open.
        const keepAlive = setInterval(() => {
            if (socket.connected) {
                socket.emit('ping'); // server ignores unknown events — this is safe
            }
        }, 20000);
        // ──────────────────────────────────────────────────────────────────────

        return () => {
            clearInterval(keepAlive);
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
