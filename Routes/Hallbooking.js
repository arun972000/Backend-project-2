import express, { json } from 'express';
import { v4 } from 'uuid';

const BookingRoutes = express.Router();

var rooms = [];
var bookings = [];


BookingRoutes.use(json())


BookingRoutes.get("/rooms", (req, res) => {      //View rooms
    res.send(rooms)
})   


BookingRoutes.post('/createRoom', (req, res) => {    // Create rooms
    const newRoom = { ...req.body, id: v4(), bookstatus: false };
    rooms.push(newRoom);
    res.send('Room Created');
});


BookingRoutes.post("/bookRoom", (req, res) => {  // Book rooms
    const { roomId } = req.body
    const room = rooms.find(item => item.id == roomId)
    if (!room) {
        res.send("Room not found")
    } else if (room.bookstatus) {
        res.send("Room is already booked!")
    } else {
        bookings.push(req.body)
        room.bookstatus = true
        res.send("Room booked")
    }

})


BookingRoutes.get("/allBookings", (req, res) => {   // veiw all rooms is booked or not?
    const details = rooms.map(item => {
        if (item.bookstatus) {
            let val = bookings.find(room => room.roomId == item.id)
            return { Room_name: item.name, Bookstatus: item.bookstatus, BookingDetails: val }
        }
        else {
            return { Room_name: item.name, Bookstatus: item.bookstatus }
        }

    })
    res.send(details)
})


BookingRoutes.get("/customerDetails", (req, res) => {    // view customer details
    const detail = bookings.map(item => {
        const value = rooms.find(room => room.id == item.roomId)
        return { Room_name: value.name, ...item }
    })
    res.send(detail)
})


BookingRoutes.get("/bookedHistory", (req, res) => {   // view booking history
    const timesbook = bookings.map(item => {
        const filter = bookings.filter(val => val.name == item.name).length

        return { Name: item.customerName, No_Of_Bookings: filter }
    })
    res.send(timesbook)

})

export default BookingRoutes;