// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import app from "../firebase";
// import "../styles/Signin.css"; // Using common CSS

// const auth = getAuth(app);

// const SigninPage = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     const signinUser = () => {
//         signInWithEmailAndPassword(auth, email, password)
//             .then(() => {
//                 alert("Sign in Successful");
//                 navigate("/quiz");
//             })
//             .catch(() => alert("Sign in failed"));
//     };

//     return (
//         <div className="signin-container">
//             <div className="signin-box">
//                 <div className="input-field">
//                 <h1>Sign In</h1>
//                 <label>Email</label>
//                 <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
//                 <label>Password</label>
//                 <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                 <button className="auth-btn" onClick={signinUser}>Sign In</button>
//             </div>
//         </div>
//         </div>
//     );
// };

// export default SigninPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase";
import "../styles/Signin.css"; // Common CSS
// Optional: For better alerts
//import { toast } from "react-hot-toast";

const auth = getAuth(app);

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signinUser = () => {
    if (!email || !password) {
      alert.error("Please fill all fields");
      return;
    }

    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert.success("Sign in Successful");
        navigate("/quiz");
      })
      .catch(() => {
        alert.error("Sign in Failed");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h1 className="signin-title">Sign In</h1>
        <div>
          <label>Email</label>
          <input
            className="input-field"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            className="input-field"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="signin-button"
            onClick={signinUser}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;

