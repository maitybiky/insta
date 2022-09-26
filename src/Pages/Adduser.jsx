import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { faker } from "@faker-js/faker";
import { useState, useEffect } from "react";
const Adduser = (props) => {
  const navigate = useNavigate();
  const url = "http://localhost:3005/user";

  //                                    >>User Data and Error state<<
  const [user, setUser] = useState({ post: [] });

  const submit = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
   
      setUser({ ...user, image: e.target.result });

      console.log(e.target.result);
      console.log(user);
    };
    reader.readAsDataURL(file);
  };
  const send = async (e) => {
e.preventDefault()
    await axios.post(url, user);
    alert("Submitted");
    navigate('/all-user')
    console.log(user);
  };
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Create New Account</h1>
      <div className="container">
        <form style={{ padding: 20 }} className="shadow">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Name</label>
            <input
              name="name"
              type="text"
              className="form-control"
              onChange={(e) => submit(e)}
            />
          </div>{" "}
         
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              onChange={(e) => submit(e)}
            />
          </div>
          <div className="form-row">

          <div className="form-group col-md-6">
            <label htmlFor="exampleInputPhone1">Phone No.</label>
            <input
              name="phone"
              type="tel"
              className="form-control"
              onChange={(e) => submit(e)}
            />
          </div>{" "}
          <div className="form-group col-md-6">
            <label htmlFor="exampleInputEmail1">City</label>
            <input
              name="city"
              type="text"
              className="form-control"
              onChange={(e) => submit(e)}
            />
          </div>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              onChange={(e) => submit(e)}
            />
          </div>
          <div className="form-group form-check">
            <span>Upload Photo</span>
            <input
              type="file"
              name="image"
              accept="image/png, image/jpeg"
              onChange={(e) => submit(e)}
            />
            <div className="moveL">
              <button className="btn btn-primary my-2" onClick={(e) => send(e)}>
                Save
              </button>
            </div>
            {/* <img src={user.image} alt="" /> */}
          </div>
        </form>
      </div>
    </>
  );
};

export default Adduser;
