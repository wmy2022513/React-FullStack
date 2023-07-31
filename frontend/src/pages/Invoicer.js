import React from "react";
import {InvoicerPage} from "../components/InvoicerPage";
import { useParams } from "react-router-dom";
// import {bookingObject} from "../pages/Booking";

function Invoicer() {
  let id = useParams();
  // console.log(id)
  return <InvoicerPage id={id}/>;
}



export default Invoicer;
