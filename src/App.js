import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Manager } from "./pages/manager/Manager";
import { Home } from "./pages/home/Home";
import { NewCustomers } from "./components/newCustomers/NewCustomers";
import { AddCustomer } from "./components/addCustomer/AddCustomer";
import { Completed } from "./components/completed/Completed";
import { SearchCustomer } from "./components/searchCustomer/SearchCustomer";
import { Customer } from "./components/customer/Customer";
import { Login } from "./components/login/Login";
import { Signup } from "./components/signup/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="sign-up" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="manager" element={<Manager />}>
            <Route index element={<NewCustomers />} />
            <Route path="addCustomer" element={<AddCustomer />} />
            <Route path="completed" element={<Completed />} />
            <Route path="search/:query" element={<SearchCustomer />} />
            <Route path="customer/:id" element={<Customer />} />
            <Route path="completed/customer/:id" element={<Customer />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
