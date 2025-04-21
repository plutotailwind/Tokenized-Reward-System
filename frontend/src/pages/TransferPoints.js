// src/pages/TransferPoints.js
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../LoyaltyTokenABI.json"; // Adjust path if necessary
import '../App.css';

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

function TransferPoints() {
  const [walletAddress, setWalletAddress] = useState("");
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState("Loading...");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

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
          setBalance(bal.toString());
        } catch (err) {
          console.error("Wallet connection failed", err);
        }
      } else {
        alert("Please install MetaMask");
      }
    };

    connectWallet();
  }, []);

  const handleTransferPoints = async () => {
    if (!contract || !walletAddress) return;

    try {
      const tx = await contract.transfer(recipient, Number(amount));
      await tx.wait();
      alert(`Transferred ${amount} points to ${recipient}`);
      const bal = await contract.balanceOf(walletAddress);
      setBalance(bal.toString());
    } catch (err) {
      console.error("Transfer failed:", err);
      alert("Failed to transfer points.");
    }
  };

  return (
    <div className="transfer-page">
      <div className="page-container">
        <div className="content-box">
          <h2>Transfer Points</h2>
          <p><strong>Wallet Address:</strong> {walletAddress || "Not connected"}</p>
          <p><strong>Current Balance:</strong> {balance} Tokens</p>
  
          <label>Recipient Address</label>
          <input
            type="text"
            placeholder="0x..."
            className="input-field"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
  
          <label>Amount</label>
          <input
            type="text"
            placeholder="Enter amount"
            className="input-field"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
  
          <button className="button" onClick={handleTransferPoints}>
            Transfer Points
          </button>
        </div>
      </div>
    </div>
  );
}  

export default TransferPoints;
