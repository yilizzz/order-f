import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../store/modules/accountStore";
import { useSelector, useDispatch } from "react-redux";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import "./bossLogin.css";

const BossLogin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  // Get the account state from the store
  const { role } = useSelector((state) => state.account);

  // Get the dispatch function from the store
  const dispatch = useDispatch();

  // Define a handler for logging in
  const handleSubmit = () => {
    // Dispatch a login action to the store
    dispatch(logIn({ email: email, password: password }));
  };
  // Get the navigate object
  const navigate = useNavigate();
  // Use the useEffect hook to check the loggedIn state and redirect if true
  useEffect(() => {
    // If the user is logged in
    if (role === "boss") {
      // Redirect to the page admin
      navigate("/serviceadmin");
    }
  }, [role, navigate]); // Add the dependencies to the useEffect hook
  return (
    <div className="fullPage">
      <Banner />
      <div className="main">
        <div className="boss">
          <InputText
            id="user"
            className="w-15rem h-2rem"
            value={email || ""}
            onChange={handleEmail}
            placeholder="email"
          />
          <InputText
            id="password"
            className="w-15rem h-2rem"
            value={password || ""}
            onChange={handlePassword}
            placeholder="password"
          />
          <Button label="Submit" onClick={handleSubmit}></Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default BossLogin;
