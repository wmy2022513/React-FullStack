import React from "react";
import axios from "axios";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

function ListBookings() {
  const [listOfBookings, setListofBookings] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/bookings").then((response) => {
      console.log(response.data);
      setListofBookings(response.data);
    });
  }, []);

  return (
    <div>
      {listOfBookings.map((value, key) => {
        return (
          <div key={key} className="booking">
            <div className="title">{value.service}</div>
            <div
              className="body"
              id="listHover"
              onClick={() => {
                navigate(`/booking/${value.id}`);
              }}
            >
              Customer Name: {value.customerName}
            </div>
            <div className="btn">
              {value.service_status === "Booked" && (
                <button type="button" id="Booked">
                  Booked
                </button>
              )}
              {value.service_status === "In Service" && (
                <button type="button" id="inService">
                  In service
                </button>
              )}
              {value.service_status === "Fixed" && (
                <button type="button" id="Fixed">
                  Fixed/
                  <br />
                  Completed
                </button>
              )}
              {value.service_status === "Collected" && (
                <button type="button" id="Collected">
                  Collected
                </button>
              )}
              {value.service_status === "Unrepairable" && (
                <button type="button" id="Unrepairable">
                  Unrepairable/
                  <br />
                  Scrapped
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ListBookings;
