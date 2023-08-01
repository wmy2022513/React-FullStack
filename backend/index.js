const express = require('express')
const app = express()
const cors = require('cors');//don't forget to download this dependency

app.use(express.json()) // use express to parse json file
app.use(cors()); //Automatically whitelist API, let the connection works, thus will be able to make API request

const db = require('./models')


//Routers
const postRouter = require('./routes/Posts')
app.use('/posts', postRouter);
const commentsRouter = require('./routes/Comments')
app.use('/comments', commentsRouter);
const usersRouter = require('./routes/Users')
app.use('/auth', usersRouter);
const likesRouter = require('./routes/Likes')
app.use('/likes', likesRouter);
const bookingsRouter = require('./routes/Bookings')
app.use('/bookings', bookingsRouter);
const MotorBikeMakesRouter = require('./routes/MotorBikeMakes')
app.use('/motorbikemakes', MotorBikeMakesRouter)
const SuppliesRouter = require('./routes/Supplies')
app.use('/supplies', SuppliesRouter)
const serviceFeeRouter = require('./routes/ServiceFee')
app.use('/servicefee', serviceFeeRouter)
const AddSuppliesRouter = require('./routes/AddSupplies')
app.use('/addsupplies', AddSuppliesRouter)

db.sequelize.sync().then(() =>{
    app.listen(3001, () => {
        console.log("Server running on port 3001")
        });
});

