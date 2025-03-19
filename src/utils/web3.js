import { ethers } from "ethers";
import { EDU_TOKEN_ADDRESS, EDU_TOKEN_ABI } from "./constants";

export const getEthereumContract = async () => {
  if (!window.ethereum) return null;

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(EDU_TOKEN_ADDRESS, EDU_TOKEN_ABI, signer);
};

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      return await signer.getAddress();
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  } else {
    alert("Please install MetaMask!");
  }
};
