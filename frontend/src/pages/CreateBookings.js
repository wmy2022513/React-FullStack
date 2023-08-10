import React, {useEffect, useState , useContext} from "react";
import * as Yup from "yup";
import {Formik, Form, Field} from "formik";
import CustomSelect from "../components/CustomSelect";
import axios from "axios";
import {DatePickerField} from "../components/DatePicker";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../helpers/AuthContext";

function CreateBookings() {
  const [fetchedData, setFetchedData] = useState([]);
  const [vehicleType, setVehicleType] = useState("");
  const [carBrand, setCarBrand] = useState([]);
  const [motorBrands, setMotorBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [motorModels, setMotorModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [year, setYear] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedEngine, setSelectedEngine] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newBookId,setNewBookId] = useState("");
  const [serviceDetails, setServiceDetails] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedServiceName, setSelectedServiceName] = useState("");
  const [selectedServiceFee, setSelectedServiceFee] = useState(0);
  const {authState} = useContext(AuthContext);
  const [initialValuesLoaded, setInitialValuesLoaded] = useState(false);
  
  let navigate = useNavigate();


  useEffect(()=>{
    const fetchExistingData = async () => {
      try{
        const response = await axios.get(
          `http://localhost:3001/bookings/${authState.username}`
        );
        console.log(response.data);
        // setExistingData(response.data); //Store fetched data in existingData state
          if (response.data.length > 0) {
            const lastSessionData = response.data[response.data.length - 1];
            setFetchedData(lastSessionData); // Store the fetched data in the state
            //set dropdown menus value
            // setCustomerName(lastSessionData.customerName)
            setVehicleType(lastSessionData.vehicleType)
            setSelectedBrand(lastSessionData.vehicleBrand)
            setSelectedModel(lastSessionData.model)
            setSelectedYear(lastSessionData.year)
            setSelectedEngine(lastSessionData.engineType)
            setSelectedService(
              `${lastSessionData.service} - €${lastSessionData.serviceFee}`
            );
            setSelectedServiceName(lastSessionData.service);
            setSelectedServiceFee(lastSessionData.serviceFee)
            setSelectedDate(lastSessionData.selectedDate)
            setInitialValuesLoaded(true);
            console.log(lastSessionData);
          }
      } catch(error) {
        console.error("Error while fetching existing data:", error);
      }
    };
    fetchExistingData();
  }, [])

  const initialValues = {
    username: "",
    customerName: "" ,
    email: "",
    phoneNumber: "",
    licenseDetails: "",
    vehicleType: "",
    vehicleBrand: "",
    model: "",
    year: "",
    engineType: "",
    service: "",
    serviceFee: 0,
    selectedDate: null,
    selectedTime: "",
    userDescription: "",
    service_status: "Booked",
    invoice_id: "GGRSVC001",
    booking_seq: 1,
  };
  if (initialValuesLoaded) {
    initialValues.customerName = fetchedData.customerName || "";
    initialValues.email = fetchedData.email || "";
    initialValues.phoneNumber = fetchedData.phoneNumber || "";
    initialValues.licenseDetails = fetchedData.licenseDetails || "";
  }

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    setVehicleType(selectedOption);

  };

  const handleBrandChange = (event) => {
    const selectedBrand = event.target.value;
    setSelectedBrand(selectedBrand);
    // console.log(selectedBrand)
  };

  const handleModelChange = (event) => {
    const selectedModel = event.target.value;
    setSelectedModel(selectedModel)
    console.log(selectedModel)
  }

  const handleSelectedYear = (e) => {
    const selectedYears = e.target.value;
    setSelectedYear(selectedYears);
    
  }
  const handleSelectedEngine = (e) => {
    const selectedEngines = e.target.value
    setSelectedEngine(selectedEngines);
  }
  
  //deal with the selected STRING type service splitting to service name and fee 
  const handleServiceChange = (event) => {
    const selectedService = event.target.value; //return ex.Annual Service - €200

    setSelectedService(selectedService);

    const [serviceName, serviceFee] = selectedService.split(" - ");
    console.log(serviceName);
    console.log(Number(serviceFee.replace("€", "")));
    // setSelectedServiceName(serviceName);
    // setSelectedServiceFee(Number(serviceFee.replace("€", "")));

    const selectedServiceData = serviceDetails.find(
      (ser) => ser.name === serviceName
    );

    if (selectedServiceData) {
      setSelectedServiceName(serviceName);
      setSelectedServiceFee(Number(serviceFee.replace("€", "")));
    } else {
      setSelectedServiceName("");
      setSelectedServiceFee(0);
    }
  };

  useEffect(() => { // get from external API
    const fetchMotorModels = async (selectedModel) => {
      const options = {
        method: "GET",
        url: "https://motorcycles-by-api-ninjas.p.rapidapi.com/v1/motorcycles",
        params: {make: selectedModel},
        headers: {
          "X-RapidAPI-Key":
            "3e444b30bfmsh2c7503f3d34a282p1fbe24jsn90c9b065de55",
          "X-RapidAPI-Host": "motorcycles-by-api-ninjas.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        // console.log(response.data);
        setMotorModels(response.data);
        // console.log(response.data.model);
      } catch (error) {
        // console.error(error);
      }
    };

    fetchMotorModels(selectedBrand);
  }, [selectedBrand]);

  useEffect(() => { // requesting data from internal API

    const fetchBookedData = async () => {
      await axios.get("http://localhost:3001/bookings").then((response) => {
        console.log(response.data);
        //initialise
        if (response.data.length === 0) {
          setNewBookId("GGRSVC001");
        } else {

          let returning = response.data;
          //retrive booked data and assign a new invoice_id
          let getTopPosition = returning.length - 1;
          console.log(
            `the returned previous invoice id: ${returning[getTopPosition].invoice_id}`
          );
          let lastBookId = returning[getTopPosition].invoice_id;
          if (lastBookId.startsWith("GGRSVC")) {
            // Split the string "GGRSVC00X" into "GGRSVC" and "00X"
            const prefix = lastBookId.slice(0, -3); // "GGRSVC"
            const suffix = lastBookId.slice(-3); // "00X"

            // Parse "00X" to an integer and increment it
            let newNumber = parseInt(suffix, 10) + 1; // X + 1

            // Add leading zeros if necessary (e.g., 3 -> "003")
            const newSuffix = String(newNumber).padStart(3, "0"); // "003"

            // Combine the prefix and new suffix to form the new value
            const assignNewBookId = `${prefix}${newSuffix}`; // "GGRSVC003"
            console.log(`The new booking id is: ${assignNewBookId}`);

            setNewBookId(assignNewBookId);
          }
        }

        response.data.forEach((item) => {
          console.log(item.selectedDate);
        });
      });
    };
    fetchBookedData();

    const fetchServiceListAndFee = async () => {
      await axios.get("http://localhost:3001/servicefee").then((response) => {
        console.log(response.data);
        setServiceDetails(response.data);
      });
    }

    fetchServiceListAndFee();

  }, []);




  const validationSchema = Yup.object().shape({});

  const onSubmit = async (data) => {
    //Sending POST method then write data into database with API
    data.vehicleType = vehicleType; //need to specify the correct parameter
    data.vehicleBrand = selectedBrand; //in order to store into the database
    data.year = selectedYear;
    data.model = selectedModel;
    data.engineType = selectedEngine;
    data.service = selectedServiceName; // Add selected service name to the data object
    data.serviceFee = selectedServiceFee; // Add selected service fee to the data object
    data.username = authState.username;
        const formData = {
          ...data,
          invoice_id: newBookId,
        };
    try {
      await axios.post("http://localhost:3001/bookings", formData,{
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        }
      }).then(() => {
        // console.log(data);
      });
      alert("Booked Successfully");
      navigate("/");
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };
  const currentDate = new Date();

  //Calculate the maxium date excluding Sundays
  const maxDate = new Date();
  maxDate.setDate(currentDate.getDate() + 7);

  const isSunday = (date) => {
    return date.getDay() === 0; // 0 represents Sunday
  };

  const isPastDate = (date) => {
    return date < currentDate;
  };

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://car-api2.p.rapidapi.com/api/makes",
        params: {
          direction: "asc",
          sort: "id",
        },
        headers: {
          "X-RapidAPI-Key":
            "3e444b30bfmsh2c7503f3d34a282p1fbe24jsn90c9b065de55",
          "X-RapidAPI-Host": "car-api2.p.rapidapi.com",
        },
      };
      try {
        const response = await axios.request(options);
        // console.log(response.data);
        setCarBrand(response.data.data);
      } catch (error) {
        // console.error(error);
      }
    };

    fetchData();

    axios.get("http://localhost:3001/motorbikemakes").then((res) => {
      // console.log(res.data);
      setMotorBrands(res.data);
    });



    const currentYear = new Date().getFullYear();
    const yearOptions = [];
    for (let year = currentYear; year >= 1990; year--) {
      yearOptions.push(year);
    }
    setYear(yearOptions);

    
  }, []);




        // const initialValues = {
        //   username: "",
        //   customerName: "" || fetchedData.customerName, // Add customName field to initialValues
        //   email: "" || fetchedData.email,
        //   phoneNumber: "" || fetchedData.phoneNumber,
        //   licenseDetails: "" || fetchedData.licenseDetails,
        //   vehicleType: "",
        //   vehicleBrand: "",
        //   model: "",
        //   year: "",
        //   engineType: "",
        //   service: "",
        //   serviceFee: 0,
        //   selectedDate: null,
        //   selectedTime: "",
        //   userDescription: "" || fetchedData.userDescription,
        //   service_status: "Booked",
        //   invoice_id: "GGRSVC001",
        //   booking_seq: 1,
        // };

  return (
    <div className="createBooking">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        <Form className="formContainer" id="bookSelect">
          <label>Customer Name:</label>
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="customerName"
            placeholder="(Ex.Johnny)"
            // value={initialValues.customerName}

          />
          <label>Phone Number:</label>
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="phoneNumber"
            placeholder="(Ex.085-1234567)"
            // value={initialValues.phoneNumber}
          />
          <label>email:</label>
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="email"
            placeholder="(Ex.admin@gersgarage.ie)"
            // value={initialValues.email}
          />
          <label>License Details:</label>
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="licenseDetails"
            placeholder="(Ex.12 G 123456)"
            // value={initialValues.licenseDetails}
          />
          <CustomSelect
            label="Vehicle Type:"
            name="vehicleType"
            onChange={handleSelectChange}
            value={vehicleType}
          >
            <option value="" disabled>
              Please select the vehicle type
            </option>
            <option value="Motorbikes">Motorbikes</option>
            <option value="Cars">Cars</option>
            <option value="Small Vans">Small Vans</option>
            <option value="Small Buses">Small Buses</option>
            <option value="Other">Other</option>
          </CustomSelect>

          <CustomSelect
            label="Vehicle Brand"
            name="vehicleBrand"
            onChange={handleBrandChange}
            value={selectedBrand}
          >
            <option value="" disabled>
              Please select a vehicle brand
            </option>
            {vehicleType === "Cars" &&
              carBrand.map((brand) => (
                <option key={brand.id}> {brand.name} </option>
              ))}
            {vehicleType === "Motorbikes" &&
              motorBrands.map((motor) => (
                <option key={motor.id}> {motor.makes}</option>
              ))}
            {vehicleType === "Other" && <option>N/A</option>}
          </CustomSelect>

          <CustomSelect
            label="Model:"
            name="model"
            placeholder="Please select a model"
            onChange={handleModelChange}
            value={selectedModel}
          >
            <option value="" disabled>
              Please select a model
            </option>
            {vehicleType === "Motorbikes" &&
              motorModels.map((model) => (
                <option key={model}> {model.model}</option>
              ))}
            {vehicleType !== "Motorbikes" && <option>N/A</option>}
            {selectedBrand === "N/A" && <option>N/A</option>}
          </CustomSelect>

          <CustomSelect
            label="Year:"
            name="year"
            placeholder="Please select a year"
            onChange={handleSelectedYear}
            value={selectedYear}
          >
            <option value="" disabled>
              Please select a year
            </option>
            {year.map((year) => (
              <option key={year}> {year} </option>
            ))}
          </CustomSelect>
          <CustomSelect
            label="Engine Type"
            name="engineType"
            placeholder="Please select a engine type"
            value={selectedEngine}
            onChange={handleSelectedEngine}
          >
            <option value="" disabled>
              Please select a engine type
            </option>
            <option>Diesel</option>
            <option>Petrol</option>
            <option>Hybrid</option>
            <option>Electric</option>
          </CustomSelect>
          <CustomSelect
            label="Service"
            name="service"
            placeholder="Please select a service"
            value={selectedService}
            onChange={handleServiceChange}
          >
            <option value="" disabled>
              Please select a service
            </option>
            {serviceDetails.map((ser) => (
              <option key={ser.id}>
                {ser.name} - €{ser.fee}
              </option>
            ))}
          </CustomSelect>
          <label>Description:</label>
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="userDescription"
            placeholder="(Add situation)"
            // value={initialValues.userDescription}
          />

          <label>Select A Date:</label>

          <DatePickerField
            name="selectedDate"
            select={selectedDate}
            onChange={(date) => {
              console.log(date);
              if (isSunday(date) || isPastDate(date)) {
                setSelectedDate(null); // Clear the input value for invalid dates
              } else {
                setSelectedDate(date);
              }
            }}
            // dateFormat="dd/MM/yyyy"
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
            minDate={currentDate}
            filterDate={(date) => !isSunday(date)} // Disable Sundays
            // showTimeSelect
            // showDisabledMonthNavigation // Enable month navigation in disabled months
          />
          {/* <DatePicker onChange={(event) => console.log(event)}></DatePicker> */}
          <CustomSelect
            label="Select A Time:"
            name="selectedTime"
            placeholder="Please select a time"
          >
            <option value="" disabled>
              Please select a time
            </option>
            <option>9am - 11am</option>
            <option>11am - 1pm</option>
            <option>1pm - 3pm</option>
            <option>3pm - 5pm</option>
          </CustomSelect>

          <div>
            <button type="submit">Submit</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default CreateBookings;
