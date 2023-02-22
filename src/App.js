import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import ProductInfoComponent from "./Components/ProductInfoComponent";
import Error_404 from "./Pages/ErrorPages/Error_404";
import Error from "./Pages//ErrorPages/Error";
import NewProduct from "./Components/NewProduct";
//this is the main app component that contains the page routes

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>

          {!localStorage.getItem("token") && (
            <Route path="/login" element={<Login />}></Route>
          )}

          {!localStorage.getItem("token") && (
            <Route path="/register" element={<Register />}></Route>
          )}

          {localStorage.getItem("token") && (
            <Route path="/login" element={<Error />}></Route>
          )}
          {localStorage.getItem("token") && (
            <Route path="/register" element={<Error />}></Route>
          )}

          <Route path="*" element={<Error_404 />}></Route>

          <Route path="/newproduct" element={<NewProduct />} />
          <Route path="info/:id" element={<ProductInfoComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
