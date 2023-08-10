import React, { useContext } from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../helpers/AuthContext";

function HomePage() {
  const {authState} = useContext(AuthContext)
  let navigate = useNavigate();

  return (
    <>
      <div className="introduction">
        <h1>Welcome to Ger's Garage</h1>
        <p>
          We are a small garage with 4 experienced mechanics <br />
          Our primary business is vehicle maintenance service <br />
          Check the navbar above or click the button below for registration{" "}
          <br />
          After registered successfully, then you can go ahead to book a service
        </p>
      </div>
      {authState.status === false && (
        <>
        <button className="selectable-btn" type="button" onClick={() => {navigate("/registration");}}>
          sign up
        </button>
        <button className="selectable-btn" type="button" onClick={() => {navigate('/login')}}>
          log in
        </button>
        </>
      )}
      {authState.status === true && (
        <>
        <button className="selectable-btn" type="button" onClick={() => {navigate("/createbookings");}}>
          Book A Service
        </button>
        </>
      )}
    </>
  );
}

export default HomePage
