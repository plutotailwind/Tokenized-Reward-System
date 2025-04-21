// import React, { useEffect, useState } from "react";
// import { ethers } from "ethers";
// import abi from "../LoyaltyTokenABI.json";
// const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

// const items = [
//   { name: "Food", price: 50 },
//   { name: "Drinks", price: 30 },
//   { name: "Clothes", price: 500 },
//   { name: "Books", price: 200 },
//   { name: "Toiletries", price: 100 },
//   { name: "Electronics", price: 2000 },
// ];

// function Menu() {
//   const [selectedItem, setSelectedItem] = useState(items[0]);
//   const [quantity, setQuantity] = useState(1);
//   const [mode, setMode] = useState("buy");
//   const [redeemPoints, setRedeemPoints] = useState(0);
//   const [walletAddress, setWalletAddress] = useState("");
//   const [contract, setContract] = useState(null);
//   const [balance, setBalance] = useState(0);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const connectWallet = async () => {
//       if (window.ethereum) {
//         try {
//           const provider = new ethers.BrowserProvider(window.ethereum);
//           await provider.send("eth_requestAccounts", []);
//           const signer = await provider.getSigner();
//           const address = await signer.getAddress();
//           setWalletAddress(address);

//           const loyaltyContract = new ethers.Contract(contractAddress, abi.abi, signer);
//           setContract(loyaltyContract);

//           const bal = await loyaltyContract.balanceOf(address);
//           setBalance(parseInt(bal.toString()));
//         } catch (err) {
//           console.error("Wallet connection failed", err);
//         }
//       } else {
//         alert("Please install MetaMask");
//       }
//     };

//     connectWallet();
//   }, []);

//   const calculateTotal = () => {
//     return selectedItem.price * quantity;
//   };

//   const handleSubmit = async () => {
//     if (!contract || !walletAddress) {
//       setMessage("Wallet not connected.");
//       return;
//     }

//     const total = calculateTotal();

//     if (mode === "buy") {
//       const pointsEarned = Math.floor(total / 100) * 10;

//       try {
//         const tx = await contract.issuePoints(walletAddress, pointsEarned);
//         await tx.wait();
//         const updatedBalance = await contract.balanceOf(walletAddress);
//         setBalance(parseInt(updatedBalance.toString()));

//         setMessage(`Purchase successful. You earned ${pointsEarned} points! New balance: ${updatedBalance.toString()} points.`);
//       } catch (err) {
//         console.error("Transaction failed", err);
//         setMessage("Transaction failed.");
//       }

//     } else if (mode === "redeem") {
//       if (redeemPoints > balance) {
//         setMessage("Error: You cannot redeem more points than your balance.");
//         return;
//       }

//       const discount = redeemPoints;
//       const discountedTotal = Math.max(0, total - discount);

//       try {
//         const tx = await contract.redeemPoints(redeemPoints);
//         await tx.wait();

//         const updatedBalance = await contract.balanceOf(walletAddress);
//         setBalance(parseInt(updatedBalance.toString()));

//         setMessage(`Redeemed ${redeemPoints} points. Discounted bill: ₹${discountedTotal}. Purchase successful. New balance: ${updatedBalance.toString()} points.`);
//         setRedeemPoints(0); // Reset after redeeming
//       } catch (err) {
//         console.error("Redeem failed", err);
//         setMessage("Redeem transaction failed.");
//       }
//     }
//   };

//   return (
//     <div style={{ padding: "2rem", textAlign: "center" }}>
//       <h2>{mode === "buy" ? "Buy Items" : "Redeem Points for Discount"}</h2>

//       <label>
//         Select Item:
//         <select
//           value={selectedItem.name}
//           onChange={(e) =>
//             setSelectedItem(items.find((item) => item.name === e.target.value))
//           }
//         >
//           {items.map((item, idx) => (
//             <option key={idx} value={item.name}>
//               {item.name} (₹{item.price})
//             </option>
//           ))}
//         </select>
//       </label>

//       <br /><br />

//       <label>
//         Quantity:
//         <input
//           type="number"
//           value={quantity}
//           min={1}
//           onChange={(e) => setQuantity(Number(e.target.value))}
//         />
//       </label>

//       <br /><br />

//       <label>
//         <input
//           type="radio"
//           checked={mode === "buy"}
//           onChange={() => setMode("buy")}
//         /> Buy & Earn Points
//       </label>
//       &nbsp;
//       <label>
//         <input
//           type="radio"
//           checked={mode === "redeem"}
//           onChange={() => setMode("redeem")}
//         /> Redeem Points
//       </label>

//       <br /><br />

//       {mode === "redeem" && (
//         <label>
//           Enter points to redeem (Balance: {balance}):
//           <input
//             type="number"
//             value={redeemPoints}
//             min={0}
//             max={balance}
//             onChange={(e) => setRedeemPoints(Number(e.target.value))}
//           />
//         </label>
//       )}

//       <br /><br />

//       <h4>Total Bill: ₹{calculateTotal()}</h4>
//       <button onClick={handleSubmit}>
//         {mode === "buy" ? "Buy" : "Redeem & Buy"}
//       </button>

//       <br /><br />
//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default Menu;

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../LoyaltyTokenABI.json";
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const items = [
  { name: "Food", price: 50 },
  { name: "Drinks", price: 30 },
  { name: "Clothes", price: 500 },
  { name: "Books", price: 200 },
  { name: "Toiletries", price: 100 },
  { name: "Electronics", price: 2000 },
];

function Menu() {
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [quantity, setQuantity] = useState(1);
  const [mode, setMode] = useState("buy");
  const [redeemPoints, setRedeemPoints] = useState(0);
  const [walletAddress, setWalletAddress] = useState("");
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setWalletAddress(address);

          const loyaltyContract = new ethers.Contract(contractAddress, abi.abi, signer);
          setContract(loyaltyContract);

          const bal = await loyaltyContract.balanceOf(address);
          setBalance(parseInt(bal.toString()));
        } catch (err) {
          console.error("Wallet connection failed", err);
        }
      } else {
        alert("Please install MetaMask");
      }
    };

    connectWallet();
  }, []);

  const calculateTotal = () => {
    return selectedItem.price * quantity;
  };

  const handleSubmit = async () => {
    if (!contract || !walletAddress) {
      setMessage("Wallet not connected.");
      return;
    }

    const total = calculateTotal();

    if (mode === "buy") {
      const pointsEarned = Math.floor(total / 100) * 10;

      try {
        const tx = await contract.issuePoints(walletAddress, pointsEarned);
        await tx.wait();
        const updatedBalance = await contract.balanceOf(walletAddress);
        setBalance(parseInt(updatedBalance.toString()));

        setMessage(`Purchase successful. You earned ${pointsEarned} points! New balance: ${updatedBalance.toString()} points.`);
      } catch (err) {
        console.error("Transaction failed", err);
        setMessage("Transaction failed.");
      }

    } else if (mode === "redeem") {
      if (redeemPoints > balance) {
        setMessage("Error: You cannot redeem more points than your balance.");
        return;
      }

      const discount = redeemPoints;
      const discountedTotal = Math.max(0, total - discount);

      try {
        const tx = await contract.redeemPoints(redeemPoints);
        await tx.wait();

        const updatedBalance = await contract.balanceOf(walletAddress);
        setBalance(parseInt(updatedBalance.toString()));

        setMessage(`Redeemed ${redeemPoints} points. Discounted bill: ₹${discountedTotal}. Purchase successful. New balance: ${updatedBalance.toString()} points.`);
        setRedeemPoints(0); // Reset after redeeming
      } catch (err) {
        console.error("Redeem failed", err);
        setMessage("Redeem transaction failed.");
      }
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>{mode === "buy" ? "Buy Items" : "Redeem Points for Discount"}</h2>

      <label>
        Select Item:
        <select
          value={selectedItem.name}
          onChange={(e) =>
            setSelectedItem(items.find((item) => item.name === e.target.value))
          }
        >
          {items.map((item, idx) => (
            <option key={idx} value={item.name}>
              {item.name} (₹{item.price})
            </option>
          ))}
        </select>
      </label>

      <br /><br />

      <label>
        Quantity:
        <input
          type="number"
          value={quantity}
          min={1}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </label>

      <br /><br />

      <label>
        <input
          type="radio"
          checked={mode === "buy"}
          onChange={() => setMode("buy")}
        /> Buy & Earn Points
      </label>
      &nbsp;
      <label>
        <input
          type="radio"
          checked={mode === "redeem"}
          onChange={() => setMode("redeem")}
        /> Redeem Points
      </label>

      <br /><br />

      {mode === "redeem" && (
        <label>
          Enter points to redeem (Balance: {balance}):
          <input
            type="number"
            value={redeemPoints}
            min={0}
            max={balance}
            onChange={(e) => setRedeemPoints(Number(e.target.value))}
          />
        </label>
      )}

      <br /><br />

      <h4>Total Bill: ₹{calculateTotal()}</h4>
      <button onClick={handleSubmit}>
        {mode === "buy" ? "Buy" : "Redeem & Buy"}
      </button>

      <br /><br />
      {message && <p>{message}</p>}
    </div>
  );
}

export default Menu;
