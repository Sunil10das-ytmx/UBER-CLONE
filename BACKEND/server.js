const http = require('http');
const app = require('./app');

let port = parseInt(process.env.PORT, 10) || 3000;
const MAX_PORT_TRIES = 10;

function startServer(currentPort, attemptsLeft) {
    const server = http.createServer(app);

    server.on('error', (err) => {
        if (err && err.code === 'EADDRINUSE') {
            console.error(`Port ${currentPort} is in use.`);
            if (attemptsLeft > 0) {
                const nextPort = currentPort + 1;
                console.log(`Trying port ${nextPort}... (${attemptsLeft - 1} attempts left)`);
                // small delay before retrying
                setTimeout(() => startServer(nextPort, attemptsLeft - 1), 200);
                return;
            }
            console.error('No available ports found. Exiting.');
            process.exit(1);
        } else {
            console.error('Server error:', err);
            process.exit(1);
        }
    });

    server.listen(currentPort, () => {
        port = currentPort;
        console.log(`Server is running on port ${currentPort}`);
    });
}

startServer(port, MAX_PORT_TRIES);
