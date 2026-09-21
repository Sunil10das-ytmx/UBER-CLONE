const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });
const cors= require('cors');

const express = require('express');
const app = express();
const connectDatabase = require('./DATABASE/DataBase.connect.js')
const userRoutes=require('./ROUTES/user.routes.js')
const captainRoutes = require('./ROUTES/captain.route.js')
const cookieParser = require('cookie-parser')
const mapRoutes = require('./ROUTES/maps.route.js')
const rideRoutes = require('./ROUTES/ride.route.js');
connectDatabase();

// Strip trailing slashes so "https://example.com/" and "https://example.com" both match
const allowedOrigins = [
    process.env.FRONTEND_ORIGINS,
    'http://localhost:5173',
    'http://localhost:3000',
].filter(Boolean).map(o => o.replace(/\/$/, ''));

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g., Postman, curl, mobile apps)
        if (!origin) return callback(null, true);
        // Normalise incoming origin too (browsers never send trailing slash, but just in case)
        const normalisedOrigin = origin.replace(/\/$/, '');
        if (allowedOrigins.includes(normalisedOrigin)) return callback(null, true);
        callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.send('hello world');
})

app.use('/users',userRoutes);
app.use('/captains',captainRoutes)
app.use('/maps',mapRoutes)
app.use('/rides',rideRoutes)
module.exports = app;