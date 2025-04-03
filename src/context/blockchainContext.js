import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { EDU_TOKEN_ADDRESS, EDU_TOKEN_ABI, PREMIUM_ACCESS_ADDRESS, PREMIUM_ACCESS_ABI } from "../utils/constants";

export const BlockchainContext = createContext();

export const BlockchainProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [eduToken, setEduToken] = useState(null);
  const [premiumAccess, setPremiumAccess] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          setProvider(provider);
          setSigner(signer);

          const eduTokenContract = new ethers.Contract(EDU_TOKEN_ADDRESS, EDU_TOKEN_ABI, signer);
          const premiumAccessContract = new ethers.Contract(PREMIUM_ACCESS_ADDRESS, PREMIUM_ACCESS_ABI, signer);

          setEduToken(eduTokenContract);
          setPremiumAccess(premiumAccessContract);

          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          setAccount(accounts[0]);
        } catch (error) {
          console.error("Error connecting to MetaMask", error);
        }
      } else {
        console.log("Please install MetaMask");
      }
    };

    loadBlockchainData();
  }, []);

  return (
    <BlockchainContext.Provider value={{ account, eduToken, premiumAccess }}>
      {children}
    </BlockchainContext.Provider>
  );
};
