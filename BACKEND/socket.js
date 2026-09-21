const socketIo = require('socket.io');
const userModel = require('./MODELS/user.model');
const captainModel = require('./MODELS/captain.model');
const rideModel = require('./MODELS/ride.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: true,
            credentials: true,
            methods: ['GET', 'POST']
        },
        transports: ['websocket', 'polling'],
        pingTimeout: 25000,
        pingInterval: 10000,
    });

    io.on('connection', (socket) => {
        socket.on('join', async (data) => {
            const { userId, userType } = data;

            if (userType === 'user') {
                socket.join(`user_${userId}`);
                await userModel.findByIdAndUpdate(userId, { socketID: socket.id });

            } else if (userType === 'captain') {
                socket.join('captains');
                socket.join(`captain_${userId}`);
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });

                // ─── KEY FIX ───────────────────────────────────────────────────
                // When a captain (re)connects, immediately send them any ride
                // that is still 'pending'. This handles the common mobile case
                // where the phone screen turned off during the broadcast, the
                // socket was dropped, and the captain missed the notification.
                try {
                    const pendingRide = await rideModel
                        .findOne({ status: 'pending' })
                        .populate('user');

                    if (pendingRide) {
                        const rideData = pendingRide.toObject();
                        rideData.otp = '';   // never expose OTP at this stage
                        socket.emit('new-ride', rideData);
                        console.log(`[Socket] Sent pending ride ${pendingRide._id} to rejoining captain ${userId}`);
                    }
                } catch (err) {
                    console.error('[Socket] Error fetching pending ride for captain:', err.message);
                }
                // ──────────────────────────────────────────────────────────────
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

        socket.on('reject-ride', ({ userId, rideId }) => {
            if (!userId) return;
            io.to(`user_${userId}`).emit('ride-rejected', { rideId });
        });

        socket.on('ride-paid', ({ captainId, rideId }) => {
            if (!captainId || !rideId) return;
            io.to(`captain_${captainId}`).emit('ride-paid', { rideId });
        });

        socket.on('disconnect', () => {});
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    }
};

module.exports = {
    initializeSocket,
    sendMessageToSocketId
};
