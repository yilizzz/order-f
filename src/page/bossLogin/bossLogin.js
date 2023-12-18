import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { logIn } from "../../store/modules/accountStore";

import { useSelector, useDispatch } from "react-redux";

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
  const { loggedIn } = useSelector((state) => state.account);

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
    if (loggedIn) {
      // Redirect to the page admin
      navigate("/makemenu");
    }
  }, [loggedIn, navigate]); // Add the dependencies to the useEffect hook
  return (
    <div>
      <form>
        <InputText value={email} onChange={handleEmail} placeholder="email" />
        <InputText
          value={password}
          onChange={handlePassword}
          placeholder="password"
        />
      </form>
      <Button label="Submit" onClick={handleSubmit}></Button>
    </div>
  );
};
export default BossLogin;
