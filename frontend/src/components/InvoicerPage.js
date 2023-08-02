import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


export const InvoicerPage = () => {

const [bookingObject,setBookingObject]= useState({});
const [selectedData, setSelectedData] = useState([]);
const { id } = useParams();

useEffect(() => {
  const fetchBookingsData = async () => {
    await axios
      .get(`http://localhost:3001/bookings/byId/${id}`)
      .then((response) => {
        console.log(response.data);
        setBookingObject(response.data);
      });
  }

  fetchBookingsData();

}, [id]);

useEffect(()=> {
  const fetchSelectedData = async() => {
    try {
      if(bookingObject.booking_id){
        const response = await axios.get(
          `http://localhost:3001/addsupplies/bybookingid/${bookingObject.booking_id}`
        );
        console.log(response.data)
        setSelectedData(response.data);
      }
    } catch(error) {
      console.error("Error while fetching existing data:", error);
    }
  }
  fetchSelectedData();
}, [bookingObject.booking_id])
// console.log(selectedData)

  const handlePrint = () => {
    window.print();
  };

  const total = bookingObject.serviceFee 
  return (
    <>
      <main className="p-5 lg:max-w-xl lg:mx-auto">
        <header className="flex flex-col items-center justify-center mb-5">
          <div>
            <h1 className="font-bold uppercase tracking-wide text-4xl mb-3">
              Invoicer
            </h1>
          </div>

          <div>
            <ul className="flex items-center justify-between flex-wrap">
              <li>
                <button
                  onClick={handlePrint}
                  className="btn btn-print bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Print/Download
                </button>
              </li>
              {/* <li>
                <button className="btn btn-download">Download</button>
              </li>
              <li>
                <button className="btn btn-send">Send</button>
              </li> */}
            </ul>
          </div>
        </header>
        {/* End of header */}
        {/* Client details */}
        <section className="mt-5">
          <h2 className="text-xl uppercase">
            Client's Name: {bookingObject.customerName}
          </h2>
          <h2 className="text-xl uppercase">
            Phone Number: {bookingObject.phoneNumber}
          </h2>
        </section>
        {/* End of client details */}
        {/* Dates */}
        <article className="my-5 flex items-end justify-end">
          <ul>
            <li>
              <span className="font-bold">
                Invoicer number: {bookingObject.booking_id}
              </span>
            </li>
            <li>
              <span className="font-bold">
                Invoice date: {bookingObject.updatedAt}
              </span>
            </li>
            <li>
              <span className="font-bold">
                Due date: {bookingObject.selectedDate}
              </span>
            </li>
          </ul>
        </article>
        {/* End of dates */}
        {/* Table */}
        <div className="my-5">Service fee:</div>
        {bookingObject.service} - €{bookingObject.serviceFee}
        {/* End of table */}
        {/* Notes */}
        <section className="my-5">
          {/* Textarea */}
          <div className="my-5">
            Supplies:
            <p className="my-5"></p>
            {selectedData.map((sup) => (
              <p key={sup.id}>
                {" "}
                {sup.item} - €{sup.price}{" "}
              </p>
            ))}
          </div>
          <div className="font-bold">
            <p className="underline">
              Total: €
              {selectedData.reduce(
                (total, sup) => total + sup.price,
                bookingObject.serviceFee
              )}
            </p>
          </div>
        </section>
        {/* End of notes */}
        {/* Footer */}
        <footer>
          <ul className="flex flex-wrap items-center justify-center">
            <li>
              <span className="font-bold">Company name:</span> Ger's Garage
            </li>
            {/* <li>
              <span className="font-bold">Your email:</span>{" "}
              tsbsankara@gmail.com
            </li>
            <li>
              <span className="font-bold">Phone number:</span> 0712 345 678
            </li>
            <li>
              <span className="font-bold">Bank:</span> Bank Account
            </li>
            <li>
              <span className="font-bold">Account holder:</span> Thomas Sankara
            </li> */}
            {/* <li>
              <span className="font-bold">Account number:</span> 123 456 789
            </li> */}
            <li>
              <span className="font-bold">Website:</span> https://gersgarage.ie
            </li>
          </ul>
        </footer>
        {/* End of footer */}
      </main>
    </>
  );
};
