// import React, { useContext, useState, useEffect } from "react";
// import { BlockchainContext } from "../context/blockchainContext";
// import { ethers } from "ethers";

// const PremiumPage = () => {
//   const { account, eduToken, premiumAccess } = useContext(BlockchainContext);
//   const [status, setStatus] = useState("");
//   const [hasAccess, setHasAccess] = useState(false);
//   const [userPoints, setUserPoints] = useState(0); // Track user points
//   const accessPrice = ethers.parseUnits("1000", 18); // 1000 EDU tokens

//   // ✅ Define fetchUserData function
//   const fetchUserData = async () => {
//     if (!premiumAccess || !account) return;

//     try {
//       const access = await premiumAccess.checkAccess(account);
//       setHasAccess(access);

//       const points = await premiumAccess.getPoints(account);
//       setUserPoints(Number(points));
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   // ✅ Call fetchUserData inside useEffect
//   useEffect(() => {
//     fetchUserData();
//   }, [account, premiumAccess]);

//   const buyPremiumAccess = async () => {
//     if (!eduToken || !premiumAccess) return setStatus("Contracts not loaded");

//     try {
//       setStatus("Approving EDU token spending...");
//       const approveTxn = await eduToken.approve(premiumAccess.target, accessPrice);
//       await approveTxn.wait();

//       setStatus("Purchasing Premium Access...");
//       const txn = await premiumAccess.buyAccess();
//       await txn.wait();

//       setHasAccess(true);
//       setStatus("Premium Access Purchased! 🎉");
//     } catch (error) {
//       console.error(error);
//       setStatus("Transaction Failed ❌");
//     }
//   };

//   const claimEduTokens = async () => {
//     if (!premiumAccess) return setStatus("Contracts not loaded");

//     try {
//       setStatus("Claiming EDU Tokens...");
//       const txn = await premiumAccess.claimEduTokens();
//       await txn.wait();

//       setStatus("EDU Tokens Claimed! 🎉");
//       fetchUserData(); // ✅ Refresh data after claiming tokens
//     } catch (error) {
//       console.error(error);
//       setStatus("Claim Failed ❌");
//     }
//   };

//   return (
//     <div>
//       <h2>Premium Content</h2>
//       <p>Connected Wallet: {account || "Not Connected"}</p>
//       <p>Your Points: {userPoints}</p>

//       {hasAccess ? (
//         <>
//           <h3>Welcome to Premium Content! 🚀</h3>
//           <p>Enjoy exclusive resources, tutorials, and more.</p>
//         </>
//       ) : (
//         <>
//           <button onClick={buyPremiumAccess}>Buy Premium Access</button>
//           <p>{status}</p>
//         </>
//       )}

//       <button onClick={claimEduTokens} disabled={userPoints < 100}>
//         Claim EDU Tokens (100+ points required)
//       </button>
//     </div>
//   );
// };

// export default PremiumPage;

import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const PremiumPage = () => {
    const { account } = useAuth();
    const [points, setPoints] = useState(0);

    useEffect(() => {
        const fetchUserPoints = async () => {
            if (!account) return;

            try {
                console.log("Fetching points for:", account);
                const userRef = ref(db, `leaderboard/${account}/score`);
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    setPoints(snapshot.val());
                } else {
                    console.log("No points data found");
                    setPoints(0);  // Set to 0 if no data found
                }
            } catch (error) {
                console.error("Error fetching user points:", error);
            }
        };

        fetchUserPoints();
    }, [account]); // Runs whenever account changes

    return (
        <div>
            <h1>Premium Content</h1>
            <p>Connected Wallet: {account}</p>
            <p>Your Points: {points}</p>
        </div>
    );
};

export default PremiumPage;
