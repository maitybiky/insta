import React from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { fetchUser } from "../Redux/Slice/allSlice";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Alluser = () => {
  const Navigate = useNavigate()
  // const [user, setUser] = useState([]);
  const Dispatch = useDispatch();
  const {userDetails}  = useSelector((state) => {
    return state.all_slice;
  });
  console.log("state", userDetails);
  useEffect(() => {
    Dispatch(fetchUser());
  }, []);

  return (
    <>
      <h1>dhh</h1>
      <div className="container">
        <table className="table table-striped table-light">
          <tbody>
            {userDetails.map((User, ind) => {
              return (
                
                  <tr onClick={()=>Navigate('/all-user/'+User.id)}>
                    <th scope="row">{ind + 1}</th>

                    <td>
                      {" "}
                      <img className="pphoto" src={User.image} alt="" />
                    </td>
                    <td> {User.name}</td>
                  </tr>
               
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Alluser;
