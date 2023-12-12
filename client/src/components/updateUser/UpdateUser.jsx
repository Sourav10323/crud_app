import React,{useState,useEffect} from "react";
import { Link,useParams } from "react-router-dom";
import axios from 'axios'
import "./UpdateUser.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const UpdateUser = () => {
  const users ={
    fname:"",
    lname:"",
    email:"",
    phone:"",
    
  }

  const navigate = useNavigate();
const {id} = useParams();
const [user,setUser] = useState([]);
const inputChangeHandler = (e)=>{
  const {name,value}=e.target;
  setUser({...user,[name]:value})
  console.log(user)
}

useEffect(()=>{
  axios.get(`http://127.0.0.1:8000/api/getone/${id}`)
  .then((response)=>{
    setUser(response.data)
   
}).catch(error => console.log(error))
},[id])

const submitForm = async(e)=>{
  e.preventDefault();
  await axios.put(`http://127.0.0.1:8000/api/update/${id}`,user)
  .then((response)=>{
        toast.success(response.data.message,{position:"top-right"});
        navigate("/")
       
  }).catch(error => console.log(error))
}



  return (
    <div className="addUser">
      <Link to="/" className="back-btn">Back</Link>
      
      <form className="addUserForm" onSubmit={submitForm}>
      <h2>Update User</h2>
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input
            type="text" onChange={inputChangeHandler}
            name="fname" value={user.fname}
            id="fname"
            autoComplete="off"
            placeholder="First Name"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text" onChange={inputChangeHandler}
            name="lname" value={user.lname}
            id="lname"
            autoComplete="off"
            placeholder="Last Name"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email" onChange={inputChangeHandler}
            name="email" value={user.email}
            id="email"
            autoComplete="off"
            placeholder="Email"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="number" onChange={inputChangeHandler}
            name="phone" value={user.phone}
            id="phone"
            autoComplete="off"
            placeholder="Phone Number"
          />
        </div>

        
        <div className="inputGroup">
          <button className="adduser" type="submit">
            UPDATE USER
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;

