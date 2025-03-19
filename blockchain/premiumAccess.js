import { ethers } from "ethers";
import { PREMIUM_ACCESS_ABI, PREMIUM_ACCESS_CONTRACT_ADDRESS } from "../utils/constants";

export const getPremiumContract = () => {
  if (!window.ethereum) throw new Error("MetaMask is not installed!");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(PREMIUM_ACCESS_CONTRACT_ADDRESS, PREMIUM_ACCESS_ABI, signer);
};

export const checkUserAccess = async (userAddress) => {
  try {
    const contract = getPremiumContract();
    return await contract.checkAccess(userAddress);
  } catch (error) {
    console.error("Error checking access:", error);
    return false;
  }
};

export const buyPremiumAccess = async () => {
  try {
    const contract = getPremiumContract();
    const tx = await contract.buyAccess();
    await tx.wait();
    return true;
  } catch (error) {
    console.error("Error buying access:", error);
    return false;
  }
};
