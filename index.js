import express from 'express';
import BookingRoutes from './Routes/Hallbooking.js';

const app = express();

app.use("/",BookingRoutes)



const PORT = process.env.PORT || 3000;



app.get('/', async (req, res) => {
    res.send("Welcome to Room Bookings");
});



app.listen(PORT, () => console.log(`App listening at port ${PORT}`));