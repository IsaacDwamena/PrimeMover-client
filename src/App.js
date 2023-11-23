import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Manager } from "./pages/manager/Manager";
import { Home } from "./pages/home/Home";
import { NewCustomers } from "./components/newCustomers/NewCustomers";
import { AddCustomer } from "./components/addCustomer/AddCustomer";
import { Completed } from "./components/completed/Completed";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="manager" element={<Manager />}>
            <Route index element={<NewCustomers />} />
            <Route path="addCustomer" element={<AddCustomer />} />
            <Route path="completed" element={<Completed />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
