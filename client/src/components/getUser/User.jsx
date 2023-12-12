import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import "./User.css";

const User = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://127.0.0.1:8000/api/getall");
      setUsers(response.data);
    };
    fetchData();
  }, []);


const deleteUser =async (userId)=>{
  await axios.delete(`http://127.0.0.1:8000/api/delete/${userId}`)
  .then((response)=>{
   setUsers((prevUser)=> prevUser.filter((user)=>user._id !== userId))
   toast.success(response.data.message,{position:"top-right"});
   
}).catch(error => console.log(error))
}


  return (
    <div className="userTable">
      <Link to={"/add"} className="addButton">
        Add User
      </Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Phone No</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index+1}</td>
                <td>
                  {user.fname}{" "}
                  {user.lname}
                </td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td className="actionButtons">
                  <button onClick={()=>deleteUser(user._id)}>
                    <AiFillDelete size={20} />
                  </button>
                  <Link to={`/edit/` +user._id}>
                    <button className="button2">
                      <FaUserEdit size={20} />
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default User;
