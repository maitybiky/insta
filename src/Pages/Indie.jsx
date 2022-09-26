import React from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { useState } from "react";
import { fetchUser } from "../Redux/Slice/allSlice";
import { addPost } from "../Redux/Slice/allSlice";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLike } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { BsFillShareFill } from "react-icons/bs";
import { GiModernCity } from "react-icons/gi";
import { TbSignature } from "react-icons/tb";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
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

  console.log(first, "jj");

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
    setBtn(false);
    console.log(btn);
    console.log("before udate", Post);
    setUpdatedost({ ...udatedpost, post: [...udatedpost.post, Post] });

    console.log("updaste", udatedpost);
  };

  const confirm = async () => {
    await axios.put(`http://localhost:3005/user/${id}`, udatedpost);
setPost({image:null})
    Dispatch(fetchUser());
    setBtn(true);
    alert("Uploaded");
  };

  return (
    <div className="indie-uni">
      <div>
        <div className="indie">
          <div
            style={{ backgroundImage: `url(${first.image})` }}
            className=" dp"
          ></div>
          <div style={{ marginLeft: 50 }}>
            <h3 style={{ textAlign: "left" }}>
              <TbSignature />
              &nbsp;&nbsp;{first.name}
            </h3>

            <h4 style={{ textAlign: "left" }}>
              <GiModernCity />
              &nbsp;&nbsp;{first.city}
            </h4>
            <h5 style={{ textAlign: "left" }}>
              <FaPhoneSquareAlt />
              &nbsp;&nbsp;{first.phone}
            </h5>
            <h6 style={{ textAlign: "left" }}>
              <MdEmail />
              &nbsp;&nbsp;{first.email}
            </h6>
            {/* post */}
            {/* Example single danger button */}

            <div className="btn-group">
              <button
                type="button"
                className="btn btn-success dropdown-toggle"
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
                className="btn btn-primary move "
              >
                Post
              </Button>

              <div className="dropdown-menu shadow">
                <div style={{ margin: 0 }} className="dropdown-item">
                  <div className="container ">
                    <form>
                      <div class="form-group">
                        <input
                          onChange={(e) => newPost(e)}
                          name="caption"
                          style={{ textAlign: "center" }}
                          type="text"
                          placeholder="Write Something"
                          class="form-control"
                          value={Post.caption}
                        />
                      </div>
                      <div className="upload">
                        <label for="exampleFormControlFile1">
                          Upload Photos
                        </label>
                        <input
                          type="file"
                           name="photo"
                          value={Post.photo}
                          accept="image/png, image/jpeg"
                          onChange={(e) => submit(e)}
                        />
                        <br />
                        <div className="indie">
                          <div
                            style={{ backgroundImage: ` url(${Post.image})` }}
                            className="preview"
                          ></div>
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

                        <div style={{ height: 30 }}></div>
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
          {Details?.post?.map((user) => {
            return (
              <div style={{ marginTop: 20 }} className="col-sm">
                <div className="card moveC">
                  <div style={{backgroundImage:`url(${user.image})`}}  className="post-image">

                  </div>
                  {/* <img src={user.image} className="card-img-top" alt="..." /> */}
                  <div className="card-body">
                    <div className="lcs">

                      <AiOutlineLike />
                      <BiComment />
                      <BsFillShareFill />
                    </div>
                    

                    <p  className="post-caption card-title">{user.caption}</p>
                    
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
