const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        const connecting = await mongoose.connect(process.env.MONGODB_CONNECT);

        console.log(
            `mongodb connected HOST: ${connecting.connection.host}`
        );
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }
};

module.exports = connectDatabase;