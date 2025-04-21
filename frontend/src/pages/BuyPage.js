// src/pages/BuyPage.js
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../LoyaltyTokenABI.json";
import '../App.css';

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const items = [
  { name: "Food", price: 50 },
  { name: "Drinks", price: 30 },
  { name: "Clothes", price: 500 },
  { name: "Books", price: 200 },
  { name: "Toiletries", price: 100 },
  { name: "Electronics", price: 2000 },
];

function BuyPage() {
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [quantity, setQuantity] = useState(1);
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

  const handleBuy = async () => {
    const total = calculateTotal();
    const pointsEarned = Math.floor(total / 100) * 10;

    try {
      const tx = await contract.issuePoints(walletAddress, pointsEarned);
      await tx.wait();
      setMessage(`Purchase successful. You earned ${pointsEarned} points!`);

      const updatedBalance = await contract.balanceOf(walletAddress);
      setBalance(parseInt(updatedBalance.toString()));
    } catch (err) {
      console.error("Transaction failed", err);
      setMessage("Transaction failed.");
    }
  };

  return (
    <div className="buy-page">
      <div className="content-box">
        <h2>Buy & Earn Points</h2>
        <p>Wallet: {walletAddress}</p>
        <p>Balance: {balance} points</p>

        <label>
          Select Item:
          <select
            value={selectedItem.name}
            onChange={(e) => setSelectedItem(items.find((item) => item.name === e.target.value))}
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
        <h4>Total: ₹{calculateTotal()}</h4>
        <button onClick={handleBuy}>Buy</button>

        <br /><br />
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default BuyPage;
