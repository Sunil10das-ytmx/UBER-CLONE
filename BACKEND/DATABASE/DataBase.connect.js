const mongoose = require('mongoose');

const connectDatabase = async () => {
    const mongoUri = process.env.MONGODB_CONNECT;

    if (typeof mongoUri !== 'string' || mongoUri.trim() === '') {
        throw new Error(
            'Missing MONGODB_CONNECT. Add the MongoDB Atlas connection string to Render environment variables.'
        );
    }

    if (mongoUri.includes('YOUR_PASSWORD')) {
        throw new Error(
            'MONGODB_CONNECT still contains YOUR_PASSWORD. Replace it with the real Atlas database-user password.'
        );
    }

    try {
        const connecting = await mongoose.connect(mongoUri);

        console.log(
            `mongodb connected HOST: ${connecting.connection.host}`
        );
    } catch (error) {
        if (error?.code === 8000 || error?.codeName === 'AtlasError') {
            console.error(
                'MongoDB authentication failed. Verify the Atlas database username, password, and database-user permissions configured in Render.'
            );
        } else {
            console.error("MongoDB Connection Error:", error);
        }
        process.exit(1);
    }
};

module.exports = connectDatabase;