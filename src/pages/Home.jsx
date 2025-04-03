// import React from "react";
// import { Link } from "react-router-dom";
// import "../styles/Home.css"; // Ensure this file exists

// const Home = () => {
//     return (
//         <div className="home-container">
//             <div className="home-content">
//                 <h1>Welcome to <span>EduQuiz</span> 🎓</h1>
//                 <p>Test your knowledge, earn rewards, and climb the leaderboard!</p>
//                 <p>Join now and start learning in a fun, interactive way.</p>
//                 <div className="home-buttons">
//                     <Link to="/signin" className="home-btn login">Get Started</Link>
//                     <Link to="/signup" className="home-btn signup">Sign Up</Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Home;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css"; 
import { connectWallet, getEthereumContract } from "../utils/web3";

const Home = () => {
    const [walletAddress, setWalletAddress] = useState(null);
    const [tokenBalance, setTokenBalance] = useState(null);

    const handleConnectWallet = async () => {
        const address = await connectWallet();
        setWalletAddress(address);
        if (address) {
            fetchTokenBalance(address);
        }
    };

    const fetchTokenBalance = async (address) => {
        try {
            const contract = await getEthereumContract();
            if (!contract) return;
            
            const balance = await contract.balanceOf(address);
            setTokenBalance(Number(balance) / 1e18);  // Convert Wei to EDU tokens
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    };

    useEffect(() => {
        if (walletAddress) {
            fetchTokenBalance(walletAddress);
        }
    }, [walletAddress]);

    return (
        <div className="home-container">
            <div className="home-content">
                <h1>Welcome to <span>EduQuiz</span> 🎓</h1>
                <p>Test your knowledge, earn rewards, and climb the leaderboard!</p>
                <p>Join now and start learning in a fun, interactive way.</p>
                
                {/* <div className="wallet-info">
                    {walletAddress ? (
                        <>
                            <p>Connected Wallet: {walletAddress}</p>
                            <p>EduToken Balance: {tokenBalance !== null ? `${tokenBalance} EDU` : "Loading..."}</p>
                        </>
                    ) : (
                        <button className="home-btn connect-wallet" onClick={handleConnectWallet}>
                            Connect Wallet
                        </button>
                    )}
                </div> */}

                <div className="home-buttons">
                    <Link to="/signin" className="home-btn login">Get Started</Link>
                    <Link to="/signup" className="home-btn signup">Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
