import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import AboutUs from "./Components/AboutUs";
import UserLogin from "./Components/Login&SignUp/UserLogin";
import Privacy from "./Components/Privacy";
import Return from "./Components/Return";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/About" element={<AboutUs />}></Route>
          <Route path="/Privacy" element={<Privacy />}></Route>
          <Route path="/Return" element={<Return />}></Route>
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
};

export default App;
