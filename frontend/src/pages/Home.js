// import React from "react";
// import { useNavigate } from "react-router-dom";

// function Home() {
//   const navigate = useNavigate();

//   return (
//     <div style={{ textAlign: "center", paddingTop: "3rem" }}>
//       <h2>Welcome to Loyalty DApp</h2>
//       <button onClick={() => navigate("/menu")}>Menu</button>
//       <br /><br />
//       <button onClick={() => navigate("/transfer")}>Transfer Points</button>
//     </div>
//   );
// }

// export default Home;


// src/pages/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-container home-page">
      <h2 className="page-title">Welcome to Bonus Bazaar </h2>
      <p>Select an option:</p>
      <div className="card-container">
        <button className="button" onClick={() => navigate("/buy")}>
          Buy & Earn Points
        </button>
        <button className="button" onClick={() => navigate("/redeem")}>
          Redeem Points
        </button>
        <button className="button" onClick={() => navigate("/transfer")}>
          Transfer Points
        </button>
      </div>
    </div>
  );
}

export default Home;

