import React, {useState, useEffect, useRef} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import {InvoicerPage} from "../components/InvoicerPage";
import Invoicer from "./Invoicer";

function Booking() {
  let {id} = useParams();
  const [bookingObject, setBookingObject] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [addedItem, setAddedItem] = useState("");
  const buttonListRef = useRef(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [dropdownForms, setDropdownForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/bookings/byId/${id}`).then((response) => {
      console.log(response.data);
      setBookingObject(response.data);
      setIsLoading(false)
    });
  }, [id]);

  const handleInvoiceBtn = () => {
    navigate(`/booking/${id}/invoice`);
  }

  const handleButtonClick = (event) => {
    // Remove "selected" class from the previously clicked button
    const clickedButtonId = event.target.id;

    // Update the selectedButton state with the clicked button's id
    setSelectedButton(clickedButtonId);
    // console.log(clickedButtonId);
  };

  const menuOptions = [
    {id: 1, label: "Option 1", value: "option1"},
    {id: 2, label: "Option 2", value: "option2"},
    {id: 3, label: "Option 3", value: "option3"},
    // Add more menu options here if needed
  ];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAddDropdown = () => {
    // Create a new dropdown menu form with the hardcoded options
    const newDropdownForm = (
      <>
      <select value={selectedOption} onChange={handleOptionChange}>
        {menuOptions.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button onClick={() => handleRemoveDropdown(dropdownForms.length)}>Remove</button>
      </>
    );

    // Add the new dropdown form to the state
    setDropdownForms((prevForms) => [...prevForms, newDropdownForm]);
  };
    const handleRemoveDropdown = (formIndex) => {
      // Remove the dropdown form with the specified index from the state
      setDropdownForms((prevForms) =>
        prevForms.filter((form, index) => index !== formIndex)
      );
    };

  const applyChanges = () => {
    const confirmed = window.confirm("Are you sure you want to apply changes?");
    if (confirmed) {
      axios.put(`http://localhost:3001/bookings/byId/${id}`, {
        service_status: selectedButton,
      });
        alert("Apply changes successfully!");
        navigate("/listbookings");
    }


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
          <div className="footer">
            <button type="text" id="invoice" onClick={handleInvoiceBtn}>
              {" "}
              Generate Invoice
            </button>
          </div>
        </div>
      </div>

      <div className="rightSide">
        {/* <div className="addCommentContainer"> */}

        <div className="editButtonContainer">
          <div className="buttonList" ref={buttonListRef}>
            <button
              type="button"
              className={`selectable-btn ${
                selectedButton === "Booked" ? "selected" : ""
              }`}
              id="Booked"
              onClick={handleButtonClick}
            >
              Booked
            </button>
            <button
              type="button"
              className={`selectable-btn ${
                selectedButton === "In Service" ? "selected" : ""
              }`}
              id="In Service"
              onClick={handleButtonClick}
            >
              In service
            </button>
            <button
              type="button"
              className={`selectable-btn ${
                selectedButton === "Fixed" ? "selected" : ""
              }`}
              id="Fixed"
              onClick={handleButtonClick}
            >
              Fixed/
              <br />
              Completed
            </button>
            <button
              type="button"
              className={`selectable-btn ${
                selectedButton === "Collected" ? "selected" : ""
              }`}
              id="Collected"
              onClick={handleButtonClick}
            >
              Collected
            </button>
            <button
              type="button"
              className={`selectable-btn ${
                selectedButton === "Unrepairable" ? "selected" : ""
              }`}
              id="Unrepairable"
              onClick={handleButtonClick}
            >
              Unrepairable/
              <br />
              Scrapped
            </button>
          </div>
          <div className="selecFormContainer">
            <button onClick={handleAddDropdown}>Add Selection Form</button>
            {dropdownForms.map((form, index) => (
              <div key={index}>{form}</div>
            ))}
          </div>

          {/* )} */}
          <button onClick={applyChanges} type="submit">
            Apply
          </button>
        </div>
      </div>
      {/* <Invoicer id= {id} /> */}
    </div>
  );
  
}

export default Booking;
