// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
// import { getDatabase, ref, get } from "firebase/database";
// import app from "../firebase";
// import "../styles/Navbar.css"; // Ensure this file exists

// const auth = getAuth(app);
// const db = getDatabase(app);

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [points, setPoints] = useState(0);
//   const [showProfile, setShowProfile] = useState(false);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       setUser(currentUser);
//       if (currentUser) {
//         const userRef = ref(db, `leaderboard/${currentUser.uid}`);
//         const snapshot = await get(userRef);
//         if (snapshot.exists()) {
//           setPoints(snapshot.val().score || 0);
//         }
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleLogout = () => {
//     signOut(auth).then(() => {
//       navigate("/signin");
//     });
//   };

//   return (
//     <nav className="navbar">
//       <h1 className="logo">Quiz App</h1>
//       <ul className="nav-links">
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/quiz">Quiz</Link></li>
//         <li><Link to="/leaderboard">Leaderboard</Link></li>
        
//         {!user ? (
//           <>
//             <li><Link to="/signin">Sign In</Link></li>
//             <li><Link to="/signup">Sign Up</Link></li>
//           </>
//         ) : (
//           <li className="profile-container">
//             <button className="profile-btn" onClick={() => setShowProfile(!showProfile)}>👤</button>
//             {showProfile && (
//               <div className="profile-dropdown">
//                 <p><strong>Email:</strong> {user.email}</p>
//                 <p><strong>Points:</strong> {points}</p>
//                 <button className="logout-btn" onClick={handleLogout}>Logout</button>
//               </div>
//             )}
//           </li>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import { connectWallet, getEthereumContract } from "../utils/web3";
import app from "../firebase";
import "../styles/Navbar.css";

const auth = getAuth(app);
const db = getDatabase(app);

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [eduBalance, setEduBalance] = useState(0);

  useEffect(() => {
    // Auto-detect authentication state
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userRef = ref(db, `leaderboard/${currentUser.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setPoints(snapshot.val().score || 0);
        }
      }
    });

    // Auto-load wallet if already connected
    const loadWallet = async () => {
      const accounts = await window.ethereum?.request({ method: "eth_accounts" });
      if (accounts && accounts.length > 0) {
        setWalletAddress(accounts[0]);
        fetchEduTokenBalance(accounts[0]);
      }
    };
    loadWallet();

    return () => unsubscribe();
  }, []);

  const handleConnectWallet = async () => {
    const address = await connectWallet();
    if (address) {
      setWalletAddress(address);
      fetchEduTokenBalance(address);
    }
  };

  const handleDisconnectWallet = () => {
    setWalletAddress(null);
    setEduBalance(0);
  };

  const fetchEduTokenBalance = async (address) => {
    try {
      const contract = await getEthereumContract();
      if (contract) {
        const balance = await contract.balanceOf(address);
        setEduBalance(parseFloat(balance) / 10 ** 18);
      }
    } catch (error) {
      console.error("Error fetching EDU token balance:", error);
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate("/signin");
    });
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Quiz App</h1>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/quiz">Quiz</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
        <li><Link to="/premium">Premium</Link></li> {/* ✅ Added Premium Link */}

        {walletAddress ? (
          <>
    
            <button className="wallet-btn disconnect" onClick={handleDisconnectWallet}>Disconnect</button>
          </>
        ) : (
          <button className="wallet-btn connect" onClick={handleConnectWallet}>Connect Wallet</button>
        )}

        {!user ? (
          <>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        ) : (
          <li className="profile-container">
            <button className="profile-btn" onClick={() => setShowProfile(!showProfile)}>👤</button>
            {showProfile && (
              <div className="profile-dropdown">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Points:</strong> {points}</p>

                {walletAddress && (
                  <div className="wallet-info">
                    <p><strong>Wallet:</strong> {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p>
                    <p><strong>EDU Balance:</strong> {eduBalance.toFixed(2)} EDU</p>
                  </div>
                )}

                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
