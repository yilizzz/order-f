// import "./App.css";
import Payment from "./page/Payment/Payment";
import Completion from "./page/Completion/Completion";
import BossLogin from "./page/bossLogin/bossLogin";
import MakeMenu from "./page/MakeMenu/MakeMenu";
import Home from "./page/Home/Home";

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";

function App() {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/payment/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="bosslogin" element={<BossLogin />} />
          <Route path="makemenu" element={<MakeMenu />} />
          <Route
            path="/payment"
            element={<Payment stripePromise={stripePromise} />}
          />
          <Route
            path="/completion"
            element={<Completion stripePromise={stripePromise} />}
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
