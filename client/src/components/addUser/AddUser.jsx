import React,{useState} from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import "./AddUser.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const AddUser = () => {
const users ={
  fname:"",
  lname:"",
  email:"",
  phone:"",
  
}
const [user,setUser] = useState(users);
const navigate = useNavigate();


//HANDLING INPUT

const inputHandler = (e)=>{
   const {name,value}=  e.target;
   setUser({...user,[name]:value});
  
}

const submitForm = async (e)=>{
  e.preventDefault();
  await axios.post("http://127.0.0.1:8000/api/create",user)
  .then((response)=>{
        toast.success(response.data.message,{position:"top-right"});
        navigate("/")
       
  }).catch(error => console.log(error))
}

  return (
    <div className="addUser">
      <Link to="/" className="back-btn">
        Back
      </Link>

      <form className="addUserForm" onSubmit={submitForm}>
        <h2>Add New User</h2>
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            onChange={inputHandler}
            name="fname"
            id="fname"
            autoComplete="off"
            placeholder="First Name"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            onChange={inputHandler}
            name="lname"
            id="lname"
            autoComplete="off"
            placeholder="Last Name"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={inputHandler}
            name="email"
            id="email"
            autoComplete="off"
            placeholder="Email"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="number"
            onChange={inputHandler}
            name="phone"
            id="phone"
            autoComplete="off"
            placeholder="Phone Number"
          />
        </div>

        <div className="inputGroup">
          <button className="adduser" type="submit">
            ADD USER
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
