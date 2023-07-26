import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {DatePickerField} from "../components/DatePicker";
import DatePicker from "react-datepicker";
function Booking() {
  let {id} = useParams();
  const [bookingObject, setBookingObject] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/bookings/byId/${id}`).then((response) => {
      console.log(response.data);
      setBookingObject(response.data);
    });
  }, []);

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title"> {bookingObject.service} </div>
          <div className="body">
            <label>Booking ID: {bookingObject.booking_id}</label>
            <label>Customer Name: {bookingObject.customerName} </label>
            <label>Phone Number: {bookingObject.phoneNumber} </label>
            <label>Vehicle Type: {bookingObject.vehicleType} </label>
            <label>Vehicle Brand: {bookingObject.vehicleBrand} </label>
            <label>Model: {bookingObject.model} </label>
            <label>Year: {bookingObject.year}</label>
            <label>Engine Type: {bookingObject.engineType} </label>
            <label>Service: {bookingObject.service}</label>
            
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <button type="button" id="booked">
            Booked
          </button>
          <button type="button" id="inService">
            In service
          </button>
          <button type="button" id="fixed">
            Fixed/
            <br />
            Completed
          </button>
          <button type="button" id="collected">
            Collected
          </button>
          <button type="button" id="unrepairable">
            Unrepairable/
            <br />
            Scrapped
          </button>
        </div>

      </div>
    </div>
  );
}

export default Booking;
