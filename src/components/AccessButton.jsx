import React, { useState } from "react";
import { buyPremiumAccess } from "../blockchain/premiumAccess";

const AccessButton = () => {
  const [loading, setLoading] = useState(false);

  const handleBuyAccess = async () => {
    setLoading(true);
    const success = await buyPremiumAccess();
    setLoading(false);
    if (success) alert("Access Granted! Refresh the page.");
  };

  return (
    <button className="buy-access-btn" onClick={handleBuyAccess} disabled={loading}>
      {loading ? "Processing..." : "Buy Access"}
    </button>
  );
};

export default AccessButton;
