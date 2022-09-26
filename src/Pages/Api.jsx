import React from "react";
import { useState, useEffect } from "react";
import { BsImageFill } from "react-icons/bs";
import axios from "axios";
// console.log(data);
const Api = () => {
  const [data, setData] = useState([]);
  //     const getdata=()=>{
  //         fetch("https://hidden-ocean-72098.herokuapp.com/api/category")
  //         .then((res) => res.json())
  //         .then((json) => setData(json.data))
  //         .catch((error) =>console.log('hello'));

  // }
  const getdata = async () => {
    const res = await axios.get(
      "https://hidden-ocean-72098.herokuapp.com/api/category"
    );
    const json = await res.data;
    setData(json.data);
  };
  useEffect(() => {
    getdata();
  }, []);

  console.log(data);
  return (
    <div className="container">
      {data.map((user) => {
        return (
          <div style={{margin:'15px'}}>
            <div className="card" style={{width:' 18rem'}}>
              <img className="card-img-top" src={user.image} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title font" style={{color:'#fc6f03'}}>{user.category}</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Api;
