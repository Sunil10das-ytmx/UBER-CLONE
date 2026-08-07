const socketIo = require('socket.io');
const userModel = require('./MODELS/user.model');
const captainModel = require('./MODELS/captain.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            const { userId, userType } = data;

            console.log(`user ${userId} joined as ${userType}`)

            if (userType === 'user') {
                socket.join(`user_${userId}`);
                await userModel.findByIdAndUpdate(userId, { socketID: socket.id });
            } else if (userType === 'captain') {
                socket.join('captains');
                socket.join(`captain_${userId}`);
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });

        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if (!location || (!location.ltd && !location.lat) || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd || location.lat,
                    lng: location.lng
                }
            });
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {
    console.log(`Sending message to socket ${socketId}:`, messageObject);
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
};

module.exports = {
    initializeSocket,
    sendMessageToSocketId
};
