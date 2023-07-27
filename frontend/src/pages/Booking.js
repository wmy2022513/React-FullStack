import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";

function Booking() {
  let {id} = useParams();
  const [bookingObject, setBookingObject] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [addedItem, setAddedItem] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/bookings/byId/${id}`).then((response) => {
      console.log(response.data);
      setBookingObject(response.data);
    });
  }, []);

 const handleFormSubmit = (event) => {
   event.preventDefault();
   // Perform actions when the item is added
   // Example:
   // If added item is X, then write to the database with X data using the same booking_id
   // Trigger another POST request to the booking table to change the service_status

   // Call the API to add the item and handle the response accordingly
   axios
     .post("http://localhost:3001/addItem", {item: addedItem, booking_id: id})
     .then((response) => {
       console.log("Item added:", response.data);

       // Reset the added item state
       setAddedItem("");

       // Update the bookingObject with the new data
       setBookingObject((prevBooking) => ({
         ...prevBooking,
         // Update the property based on the response data
         // Example:
         // service_status: response.data.service_status
       }));
     })
     .catch((error) => {
       console.error("Error adding item:", error);
     });
 };

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
          <button onClick={() => setEditMode(!editMode)}>
            {editMode ? "Edit" : "Edit"}
          </button>
          {editMode && (
            <div className="buttonList">
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
          )}

          {/* <button type="button" id="booked">
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
          </button> */}
          {/* {editMode && (
            <Formik
              initialValues={{addedItem: ""}}
              validationSchema={Yup.object({
                addedItem: Yup.string().required("Required"),
              })}
              onSubmit={(values, {resetForm}) => {
                // Perform actions when the item is added
                // Example:
                // If added item is X, then write to the database with X data using the same booking_id
                // Trigger another POST request to the booking table to change the service_status

                axios
                  .post("http://localhost:3001/addItem", {
                    item: values.addedItem,
                    booking_id: id,
                  })
                  .then((response) => {
                    console.log("Item added:", response.data);

                    // Reset the form and hide the edit form
                    resetForm();
                    setEditMode(false);

                    // Update the bookingObject with the new data
                    setBookingObject((prevBooking) => ({
                      ...prevBooking,
                      // Update the property based on the response data
                      // Example:
                      // service_status: response.data.service_status
                    }));
                  })
                  .catch((error) => {
                    console.error("Error adding item:", error);
                  });
              }}
            >
              {({errors, touched}) => (
                <Form>
                  <Field type="text" name="addedItem" placeholder="Add item" />
                  {errors.addedItem && touched.addedItem ? (
                    <div>{errors.addedItem}</div>
                  ) : null}
                  <button type="submit">Add</button>
                  <button type="button" onClick={() => setEditMode(false)}>
                    Cancel
                  </button>
                </Form>
              )}
            </Formik>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default Booking;
