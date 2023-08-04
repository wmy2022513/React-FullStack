import React, {useState, useEffect, useRef} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import CustomSelect from "../components/CustomSelect";


function Booking() {
  let {id} = useParams();
  const [bookingObject, setBookingObject] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [addedItem, setAddedItem] = useState("");
  const buttonListRef = useRef(null);
  const [selectedButton, setSelectedButton] = useState(bookingObject.service_status);//if none of the button is selected
  const [selectedOption, setSelectedOption] = useState("");
  const [dropdownForms, setDropdownForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [supplies, setSupplies] = useState([]);
  const [selectedSupplies, setSelectedSupplies] = useState("");
  const [existingData, setExistingData] = useState([]);
  const [customSelects, setCustomSelects] = useState([]);


  let navigate = useNavigate();

  // Function to handle changes in the CustomSelect
  const handleCustomSelectChange = (index, selectedValue) => {
    // customSelects(itemName);
    const updatedSelects = [...customSelects];

    updatedSelects[index] = selectedValue;

    console.log(updatedSelects);

    setCustomSelects(updatedSelects);
  };

  // Function to add a new CustomSelect component
  const handleAddCustomSelect = () => {
    setCustomSelects([...customSelects, ""]);
  };

  // Function to remove a CustomSelect component
  const handleRemoveCustomSelect = (index) => {
    const updatedSelects = [...customSelects];
    updatedSelects.splice(index, 1);
    setCustomSelects(updatedSelects);
  };

  // const handleSuppliesChange = (e) => {
  //   const selectedSupplies = e.target.value;

  //   setSelectedSupplies(selectedSupplies);

  // }

  useEffect(() => {
    const fetchSuppliesListAndFee = async () => {
      await axios.get("http://localhost:3001/supplies").then((response) => {
        // console.log(response.data);
        setSupplies(response.data);
      });
    };
    fetchSuppliesListAndFee();
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3001/bookings/byId/${id}`).then((response) => {
      // console.log(response.data);
      setBookingObject(response.data);
      // console.log(bookingObject)
      setIsLoading(false);
    });
  }, [id]);

  //need to wait the getBookingsById has data to proceed, initially is empty
  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        if (bookingObject.invoice_id) {
          const response = await axios.get(
            `http://localhost:3001/addsupplies/byinvoiceid/${bookingObject.invoice_id}`
          );
          console.log(response.data);
          setExistingData(response.data);
          setCustomSelects(response.data.map((data) => data.item));
        }
      } catch (error) {
        console.error("Error while fetching existing data:", error);
      }
    };

    fetchExistingData();
  }, [bookingObject.invoice_id]);

  const handleInvoiceBtn = () => {
    navigate(`/booking/${id}/invoice`);
  };

  const handleButtonClick = (event) => {
    // Remove "selected" class from the previously clicked button
    const clickedButtonId = event.target.id;

    // Update the selectedButton state with the clicked button's id
    setSelectedButton(clickedButtonId);
    // console.log(clickedButtonId);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAddDropdown = () => {
    // Create a new dropdown menu form with the hardcoded options
    const newDropdownForm = (
      <>
        <select value={selectedOption} onChange={handleOptionChange}>
          {supplies.map((option) => (
            <option key={option.id} value={option.item}>
              {option.item}
            </option>
          ))}
        </select>
        <button onClick={() => handleRemoveDropdown(dropdownForms.length)}>
          Remove
        </button>
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
        // console.log(bookingObject.service_status);
        

    if (confirmed) {
      axios.put(`http://localhost:3001/bookings/byId/${id}`, {
        service_status: selectedButton ,
        // service_status: statusUpdate
      });
      // alert("Apply changes successfully!");
      // navigate("/listbookings");
    }
  };

  const onSubmit = async (data) => {
    try {
      applyChanges();

      const pricesResponse = await axios.get("http://localhost:3001/supplies");

      // Map the prices data to an object with item names as keys and prices as values
      const pricesMap = {};
      pricesResponse.data.forEach((item) => {
        pricesMap[item.item] = item.price;
      });

      const selectedSuppliesData = customSelects.map((selectedValue) => ({
        ...data,
        item: selectedValue,
        invoice_id: bookingObject.invoice_id,
        price: pricesMap[selectedValue],
        BookingId: id
      }));

      // Delete existing data for the given invoice_id at first
      await axios.delete(
        `http://localhost:3001/addsupplies/byinvoiceid/${bookingObject.invoice_id}`
      );
      // Send multiple POST requests using Promise.all
      const requests = selectedSuppliesData.map((supplyData) =>
        axios.post("http://localhost:3001/addsupplies", supplyData)
      );

      await Promise.all(requests);

      alert("Added Successfully");
      navigate("/listBookings");
    } catch (error) {
      console.error("Error while submitting:", error);
    }
  };

  const initialValues = {
    invoice_id: bookingObject.invoice_id,
    quantity: 1,
    item: "",
    price: 0,
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title"> {bookingObject.service} </div>
          <div className="body">
            <label>Invoice ID: {bookingObject.invoice_id}</label>
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
              {/* <br /> */}
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
              {/* <br /> */}
              Scrapped
            </button>
          </div>

          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form className="formContainer" id="bookSelect">
              <button type="button" onClick={handleAddCustomSelect}>
                Add Supplies
              </button>
              {/* Render the CustomSelect components based on the existing data */}
              {customSelects.map((selectedValue, index) => (
                <div key={index}>
                  <CustomSelect
                    label={`Supplies ${index + 1}`}
                    name={`selectedSupplies${index}`}
                    value={selectedValue}
                    onChange={(e) =>
                      handleCustomSelectChange(index, e.target.value)
                    }
                  >
                    <option value="" disabled>
                      Please select a supplies
                    </option>
                    {supplies.map((sup) => (
                      <option key={sup.id}>{sup.item}</option>
                    ))}
                  </CustomSelect>
                  <button
                    type="button"
                    onClick={() => handleRemoveCustomSelect(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div>
                <button type="submit">Submit</button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Booking;
