import "./App.css";
import React from "react";
import {BrowserRouter as Router, Route, Routes, Link, useNavigate} from "react-router-dom";
//v6 syntax has something different to the previous version, be aware of it!
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import CreateBookings from "./pages/CreateBookings";
import ListBookings from "./pages/ListBookings";
import {AuthContext} from "./helpers/AuthContext";
import {useState, useEffect} from "react";
import axios from "axios";
import Booking from "./pages/Booking";
import Invoicer from "./pages/Invoicer";

function App() {
  // let navigate = useNavigate();
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState((prevState) => ({...prevState, status: false}));
          //only need to change authState, so pass in prevState(previous state) put ... in the front
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
    alert("You've already log out");
    
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <div className="navbar">
            <div className="links">
              <Link to="/"> HomePage </Link>
              <Link to="/createpost"> Create A Post </Link>
              {authState.status && (
                <>
                  <Link to="/createbookings">Book A Service</Link>
                  <Link to="/listbookings">Booking List</Link>
                </>
              )}
              {!authState.status && (
                <>
                  <Link to="/login"> Login </Link>
                  <Link to="/registration"> Registration</Link>
                </>
              )}
            </div>
            <div className="loggedInContainer">
              <h1>{authState.username}</h1>
              {authState.status && <button onClick={logout}> Logout </button>}
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createbookings" element={<CreateBookings />} />
            <Route path="/listbookings" element={<ListBookings />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/booking/:id/invoice" element={<Invoicer />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
