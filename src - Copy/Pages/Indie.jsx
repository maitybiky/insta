import React from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { useState } from "react";
import { fetchUser } from "../Redux/Slice/allSlice";
import { addPost } from "../Redux/Slice/allSlice";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLike } from "react-icons/ai";
import { MdUpdate } from "react-icons/md";
import axios from "axios";
const Indie = () => {
  const Dispatch = useDispatch();
  const { id } = useParams();
  const Details = useSelector((state) => {
    // console.log("poko",state);
    const index = state.all_slice.userDetails.findIndex(
      (user) => user.id == id
    );
    return state.all_slice.userDetails[index];
  });
  // console.log("indnhhj",userDetails);

  const [first, setfirst] = useState({});
  const [btn, setBtn] = useState(true);
  const [dis, setDis] = useState(true);
  const [Post, setPost] = useState({ image: null });
  const [udatedpost, setUpdatedost] = useState(Details);

  const getuser = async (id) => {
    const res = await fetch(`http://localhost:3005/user/${id}`);
    console.log(res, "res");
    const data = await res.json();
    console.log(data, "data");
    setfirst(data);
  };
  useEffect(() => {
    getuser(id);
    Dispatch(fetchUser());
  }, []);
  // console.log(first, "jj");

  const newPost = (e) => {
    const Name = e.target.name;
    const Value = e.target.value;

    if (Name === "caption") {
      if (Value !== "") {
        setDis(false);
      } else {
        setDis(true);
      }

      //        if(Name!==""){
      // setDis(false)
      //       }
    }
    setPost({ ...Post, [Name]: Value });
  };
  const submit = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      // The file's text will be printed here

      setPost({ ...Post, image: reader.result });
      console.log(Post, "post");
      console.log(e.target.result);
    };
    reader.readAsDataURL(file);
    // setUpdatedost({...udatedpost,post:[...udatedpost.post,Post]})
  };
  const update = () => {
    console.log("before udate", Post);
    setUpdatedost({ ...udatedpost, post: [...udatedpost.post, Post] });
   
    console.log("updaste", udatedpost);
    setBtn(false);

  };

  const confirm = async () => {
    await axios.put(`http://localhost:3005/user/${id}`, udatedpost);
    alert("Uploaded");
    setPost({ image: "" });
    setUpdatedost(Details);
    Dispatch(fetchUser());
    setBtn(true);
  };

  return (
    <div>
      <div>
        <div className="indie">
          <div
            style={{ backgroundImage: `url(${first.image})` }}
            className=" dp"
          >
          </div>
          <div style={{marginLeft:50}}>

          <h3 style={{ textAlign: "center" }}>{first.name}</h3>
          <br />
        <h4 style={{ textAlign: "center" }}>{first.city}</h4>
      {/* post */}
 {/* Example single danger button */}

 <div className="btn-group">

<button
      type="button"
      className="btn btn-primary dropdown-toggle"
      data-toggle="dropdown"
      aria-expanded="false"
    >
      New Post
    </button>
  
      <Button
      disabled={btn}
                variant="contained"
                onClick={() => confirm()}
                type="button"
                class="btn btn-primary"
              >
                Post
              </Button>
    
    
    <div className="dropdown-menu shadow">
     <div style={{margin:0}} className="dropdown-item" >
     <div className="container ">
        <form >
          <div class="form-group">
            <input
              onChange={(e) => newPost(e)}
              name="caption"
              style={{ textAlign: "center" }}
              type="text"
              placeholder="Write Something"
              class="form-control"
            />
          </div>
          <div className="upload">
            <label for="exampleFormControlFile1">Upload Photos</label>
            <input
              type="file"
              //  name="image"
              accept="image/png, image/jpeg"
              onChange={(e) => submit(e)}
            />
            <br />
            <div className="indie">

            <div style={{backgroundImage:` url(${Post.image})`}} className="preview"></div>
            </div>
            
       
              <Button
                variant="contained"
                disabled={dis}
                onClick={() => update()}
                type="button"
                class="btn btn-primary"
              >
                Confirm
              </Button>
           
            <div style={{height:30}}></div>
          </div>
        </form>
      </div>
     </div>
    </div>
  </div>
          </div>

        </div>
        <br />
      </div>



      



 




      <div class="container">
        <div class="row">
          {Details.post.map((user) => {
            return (
              <div style={{ marginTop: 20 }} className="col-sm">
                <div className="card" style={{ width: "18rem" }}>
                  <img src={user.image} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{user.caption}</h5>
                    <span>
                      <AiOutlineLike />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Indie;
