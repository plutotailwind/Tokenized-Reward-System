// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Menu from "./pages/Menu";
// import TransferPoints from "./pages/TransferPoints";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/menu" element={<Menu />} />
//         <Route path="/transfer" element={<TransferPoints />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BuyPage from "./pages/BuyPage";
import RedeemPage from "./pages/RedeemPage";
import TransferPoints from "./pages/TransferPoints";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/redeem" element={<RedeemPage />} />
        <Route path="/transfer" element={<TransferPoints />} />
      </Routes>
    </Router>
  );
}

export default App;

