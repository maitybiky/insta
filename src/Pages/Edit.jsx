import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import Adduser from "./Adduser";
import { faker } from "@faker-js/faker";
const Home = () => {
  const url = "http://localhost:3005/user";
  const {id} =useParams()
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const getUser=async()=>{


    const response = await  axios.get(`${url}/${id}`);
   
    setUser(response.data);
  }

useEffect(() => {
 getUser()
  console.log(user);
}, [])


  //                                    >>User Data and Error state<<

  
    const [error, setError] = useState({
      name: "",
      city: "",
      email: "",
      number: "",
      password: "",
    });


  //                                          >>On Submit Validation<<

  const Validation = () => {
    const error = {};
    if (!user.name) {
      error.name = `Name can't be empty...`;
    }
    if (!user.email) {
      error.email = `email can't be empty...`;
    } else if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        user.email
      )
    ) {
      error.email = "Enter a valid Email";
    }
    if (!user.city) {
      error.city = `City name is required...`;
    }

    if (!user.number) {
      error.number = `Number name is required...`;
    } else if (user.number.length !== 10  && user.number.length !== 12) {
      error.number = `Enter 10 digits Number `;
    }

    if (!user.password) {
      error.password = `Password can't be empty...`;
    } else if (user.password.length < 5) {
      error.password = `Password Can't be smaller Than 5`;
    } else if (user.password.length > 12) {
      error.password = `Password Can't be bigger Than 12`;
    }

    return error;
  };

  //                                          >>On Change Validation<<

  const inputData = (e) => {
    const Name = e.target.name;
    const Value = e.target.value;
    if (Name === "name") {
      if (Value.length === 0) {
        setError({ ...error, name: `Name can't be empty...` });
        setUser({ ...user, name: " " });
      } else {
        setError({ ...error, name: `` });
        setUser({ ...user, name: Value });
      }
    }
    if (Name === "city") {
      if (Value.length === 0) {
        setError({ ...error, city: `City name is required...` });
        setUser({ ...user, city: " " });
      } else {
        setError({ ...error, city: `` });
        setUser({ ...user, city: Value });
      }
    }
    if (Name === "email") {
      if (Value.length === 0) {
        setError({ ...error, email: `Enter Valid Email...` });
        setUser({ ...user, email: " " });
      } else {
        setError({ ...error, email: `` });
        setUser({ ...user, email: Value });
      }
    }
    if (Name === "number") {
      if (Value.length === 0) {
        setError({ ...error, number: "Enter Valid Number..." });
        setUser({ ...user, number: " " });
      } else {
        setError({ ...error, number: "" });
        setUser({ ...user, number: Value });
      }
    }
    if (Name === "password") {
      if (Value.length === 0) {
        setError({ ...error, password: "Password is required..." });
        setUser({ ...user, password: " " });
      } else {
        setError({ ...error, password: "" });
        setUser({ ...user, password: Value });
      }
    }
  };
  //                                                  Submit Button functionality
  const submit = async (v) => {
    v.preventDefault();
    let errorList = Validation();
    setError(Validation());

    if (Object.keys(errorList).length === 0) {
      await axios.put(`${url}/${id}`, user);
      navigate("/all-user");
      // Adduser();
    }
  };
  const change =()=>{
    setUser({ ...user,  image: faker.image.avatar() });
  }
  console.log(user.name);
  return (
    <>
    <h4 style={{ textAlign: "center", margin: 10 }}>edit</h4>
    <div className="container">
      <div className="avatar">
<img className="avtimg" src={user.image}/>
<br />
<button onClick={change} type="submit" className="btn btn-primary">
          Change
        </button>

      </div>
      <form>
        <div className="form-group">
          <label for="exampleInputName1">Name</label>
          <input
            name="name"
            onChange={inputData}
            type="text"
            className="form-control"
            id="exampleInputName1"
            aria-describedby="emailHelp"
            placeholder="Enter Your Name..."
            value={user.name}

          />
          <span id="red">{error.name}</span>
        </div>

        <div className="form-group">
          <label for="exampleInputemail1">Email</label>
          <input
            name="email"
            onChange={inputData}
            type="email"
            className="form-control"
            id="exampleInputemail1"
            placeholder="Enter Your Email..."
            value={user.email}
          />
          <span id="red">{error.email}</span>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">City</label>
          <input
            name="city"
            onChange={inputData}
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Your City..."
            value={user.city}
          />
          <span id="red">{error.city}</span>
        </div>
        <div className="form-group">
          <label for="exampleInputNumber1">Mobile No.</label>
          <input
            name="number"
            onChange={inputData}
            type="tel"
            className="form-control"
            id="exampleInputNumber1"
            placeholder="Enter Your Mobile Number..."
            value={user.number}
          />
          <span id="red">{error.number}</span>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            name="password"
            onChange={inputData}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Your Password..."
            value={user.password}
          />
          <span id="red">{error.password}</span>
        </div>

        <button onClick={submit} type="submit" className="btn btn-primary">
          Submit
        </button>

      </form>
    </div>
  </>
  )
}

export default Home