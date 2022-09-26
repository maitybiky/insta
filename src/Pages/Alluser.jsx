import React from "react";
import axios from "axios";
import { fetchUser } from "../Redux/Slice/allSlice";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Alluser = () => {
  const Navigate = useNavigate()

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
    <div>

      <h1 style={{textAlign:'center'}}>All User</h1>
      <div className="container">
        <table className="table table-striped table-light">
          <tbody>
            {userDetails.map((User, ind) => {
              return (
                
                  <tr onClick={()=>Navigate('/user/'+User.id)}>
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
    </div>
    </>
  );
};

export default Alluser;
