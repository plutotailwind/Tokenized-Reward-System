🎁 Blockchain-Based Loyalty Rewards DApp

💡 Overview
This project is a Decentralized Loyalty Rewards System built on the Ethereum blockchain. It allows users to:

🪙 Earn reward points (tokens) after purchases

🔁 Transfer tokens to other users

💸 Redeem tokens for discounts

Unlike traditional loyalty systems, our DApp ensures full transparency, security, and user control—eliminating the need for intermediaries. All operations are backed by smart contracts deployed on-chain.

🔐 Blockchain Implementation Details
Smart contract: LoyaltyToken
Standard: ERC-20
Security: OpenZeppelin contracts

🖼️ Frontend & Application Architecture
Built with React, the DApp provides a clean and intuitive user interface with full MetaMask integration for wallet connectivity and transaction signing.

🔧 Key Components
🔐 Wallet Integration: Users connect via MetaMask to view balances and interact with the contract.

🏠 Homepage: Navigation between earn, redeem, and transfer token functionalities.

🛒 Buy Page: Users simulate purchases and earn tokens via issuePoints().

🎁 Redeem Page: Burn tokens to unlock discounts using redeemPoints().

🔄 Transfer Page: Peer-to-peer token transfers with secure ERC-20 transfer().

📜 Transaction History: Real-time updates using Etherscan API to display blockchain-verified transactions.
