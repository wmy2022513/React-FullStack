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
        );
      })}
    </div>
  );
}

export default ListBookings;
