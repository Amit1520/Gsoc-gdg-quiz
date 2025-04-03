import React, { useContext, useState, useEffect } from "react";
import { BlockchainContext } from "../context/blockchainContext";
import { ethers } from "ethers";
import { db } from "../firebase";
import { doc, updateDoc, increment } from "firebase/firestore";
import "../styles/Premium.css"

const PremiumPage = () => {
  const { account, eduToken, premiumAccess } = useContext(BlockchainContext);
  const [status, setStatus] = useState("");
  const [hasAccess, setHasAccess] = useState(false);
  const [userPoints, setUserPoints] = useState(0);
  const [eduBalance, setEduBalance] = useState(0);
  const accessPrice = ethers.parseUnits("1000", 18);

  const fetchUserData = async () => {
    if (!premiumAccess || !account) return;
    try {
      const [access, points, balance] = await Promise.all([
        premiumAccess.checkAccess(account),
        premiumAccess.getPoints(account),
        eduToken.balanceOf(account),
      ]);

      setHasAccess(access);
      setUserPoints(Number(points));
      setEduBalance(Number(balance) / 10 ** 18);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [account, premiumAccess, eduToken]);

  const buyPremiumAccess = async () => {
    if (!eduToken || !premiumAccess) {
      setStatus("Contracts not loaded ❌");
      return;
    }
    try {
      setStatus("Approving EDU token spending...");
      const approveTxn = await eduToken.approve(premiumAccess.target, accessPrice);
      await approveTxn.wait();

      setStatus("Purchasing Premium Access...");
      const txn = await premiumAccess.buyAccess();
      await txn.wait();

      setHasAccess(true);
      setStatus("✅ Premium Access Purchased! 🎉");
      await fetchUserData();
    } catch (error) {
      console.error("Purchase Failed:", error);
      setStatus("Transaction Failed ❌");
    }
  };

  const claimEduTokens = async () => {
    if (!premiumAccess) {
      setStatus("Contracts not loaded ❌");
      return;
    }
    if (userPoints < 100) {
      setStatus("Not enough points to claim EDU tokens ❌");
      return;
    }
    try {
      setStatus("Claiming EDU Tokens...");
      const txn = await premiumAccess.claimEduTokens();
      await txn.wait();

      setStatus("✅ EDU Tokens Claimed! 🎉");
      await fetchUserData();
    } catch (error) {
      console.error("Claim Failed:", error);
      setStatus("Claim Failed ❌");
    }
  };

  const completeCourse = async () => {
    if (!account) return;
    try {
      setStatus("Completing course and adding points...");
      const userRef = doc(db, "users", account);
      await updateDoc(userRef, {
        points: increment(500), // Awarding 500 points after course completion
      });
      setStatus("✅ Course Completed! 500 Points Added 🎉");
      await fetchUserData();
    } catch (error) {
      console.error("Error updating points:", error);
      setStatus("Failed to update points ❌");
    }
  };

  return (
    <div className="premium-container">
      <h2>Premium Content</h2>
      <p><strong>Connected Wallet:</strong> {account || "Not Connected"}</p>
      {/* <p><strong>Your Points:</strong> {userPoints}</p> */}
      <p><strong>Your EDU Tokens:</strong> {eduBalance}</p>

      {hasAccess ? (
        <div>
          <h3>Welcome to the AI-Structured Course! 🚀</h3>
          <p>Gain in-depth knowledge on Artificial Intelligence with hands-on modules.</p>

          <h4>Course Modules:</h4>
          <ul>
            <li><strong>Module 1:</strong> Introduction to AI</li>
            <li><strong>Module 2:</strong> Machine Learning Basics</li>
            <li><strong>Module 3:</strong> Deep Learning & Neural Networks</li>
            <li><strong>Module 4:</strong> AI in Real-World Applications</li>
            <li><strong>Module 5:</strong> AI Ethics & Future Trends</li>
          </ul>
          
          <h4>Interactive Learning:</h4>
          <p>Includes video lectures, quizzes, coding exercises, and AI-powered tutors.</p>

          <button onClick={completeCourse}>Complete Course & Earn Points</button>
        </div>
      ) : (
        <button className="button"
          onClick={buyPremiumAccess} 
          disabled={!eduToken || !premiumAccess || hasAccess}
        >
          Buy Premium Access (1000 EDU)
        </button>
      )}

      {/* <button 
        onClick={claimEduTokens} 
        disabled={userPoints < 100 || !premiumAccess}
      >
        Claim EDU Tokens (100+ points required)
      </button> */}

      <p className="status-message">{status}</p>
    </div>
  );
};

export default PremiumPage;