import Payment from "./page/Payment/Payment";
import Completion from "./page/Completion/Completion";
import BossLogin from "./page/bossLogin/bossLogin";
import ServiceAdmin from "./page/ServiceAdmin/ServiceAdmin";
import Home from "./page/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bosslogin" element={<BossLogin />} />
          <Route path="/serviceadmin" element={<ServiceAdmin />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/completion" element={<Completion />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
