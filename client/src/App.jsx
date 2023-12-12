import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./components/getUser/User";
import AddUser from "./components/addUser/AddUser";
import UpdateUser from "./components/updateUser/UpdateUser";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<User/>} />
          <Route path="/add" element={<AddUser/>} />
          <Route path="/edit/:id" element={<UpdateUser/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
