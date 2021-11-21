import OrderManagement from "./Components/products/orderManagement";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import AppNavbar from "./Components/Navbar/Navbar";
import Login from "./Components/page/Login";
import Register from "./Components/page/register";

function App() {
  return (
    <>
      <AppNavbar />
      <Login />
      <Register />
      <OrderManagement />
    </>
  );
}

export default App;
