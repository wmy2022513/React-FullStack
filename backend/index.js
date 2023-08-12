const express = require('express')
const app = express()
const cors = require('cors');//don't forget to download this dependency

app.use(express.json()) // use express to parse json file
app.use(cors()); //Automatically whitelist API, let the connection works, thus will be able to make API request
const db = require('./models')
//Routers
const usersRouter = require('./routes/Users') 
app.use('/auth', usersRouter); //for login and register
const bookingsRouter = require('./routes/Bookings') //
app.use('/bookings', bookingsRouter); //dealing with API operations related to booking
const MotorBikeMakesRouter = require('./routes/MotorBikeMakes') 
app.use('/motorbikemakes', MotorBikeMakesRouter) //retrieving motorbikemakes from db
const SuppliesRouter = require('./routes/Supplies')
app.use('/supplies', SuppliesRouter) //retrieving supplies list from db
const serviceFeeRouter = require('./routes/ServiceFee')
app.use('/servicefee', serviceFeeRouter) //retrieing service name with fee from db
const AddSuppliesRouter = require('./routes/AddSupplies')
app.use('/addsupplies', AddSuppliesRouter) //controlling added supplies list in invoice
const ListBookingsRouter = require('./routes/ListBookings')
app.use('/listbookings', ListBookingsRouter) 
//Separating Get operation from booking with username and checking permission level

db.sequelize.sync().then(() =>{
    app.listen(3001, () => {
        console.log("Server running on port 3001")
        });
});

