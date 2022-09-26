import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { faker } from "@faker-js/faker";
import { useState, useEffect } from "react";
const Adduser = (props) => {
  const navigate = useNavigate();
  const url = "http://localhost:3005/user";

  //                                    >>User Data and Error state<<
  const [user, setUser] = useState({post:[]});

  const submit = (e) => {
    setUser({...user,[e.target.name]:e.target.value})
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      // The file's text will be printed here
      // setUser({ ...user, image: e.target.result });
      setUser({ ...user, image: e.target.result });
     
      console.log(e.target.result);
      console.log(user);
    };
    reader.readAsDataURL(file);
    
  };
  const send = async () => {

    await axios.post(url, user);
    alert("Submitted");
    console.log(user);
  };
  return (
    <>
      <div className="container">
      <form>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Name</label>
    <input
    name="name"
      type="text"
      className="form-control"
      onChange={(e) => submit(e)}
    />
  </div>  
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">City</label>
    <input
    name="city"
      type="text"
      className="form-control"
      onChange={(e) => submit(e)}
    />
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
  <input
          type="file"
          name="image"
          accept="image/png, image/jpeg"
          onChange={(e) => submit(e)}
        />
        <button onClick={() => send()}>Post</button>
        {/* <img src={user.image} alt="" /> */}
  </div>
  
</form>

      
      </div>
    </>
  );
};

export default Adduser;
