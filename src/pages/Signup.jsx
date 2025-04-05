// import React, { useState } from 'react';
// import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
// import app from "../firebase";
// import "../styles/Auth.css"; // Using common CSS

// const auth = getAuth(app);

// const SignupPage = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const createUser = () => {
//         createUserWithEmailAndPassword(auth, email, password)
//             .then(() => alert("Signup Successful"))
//             .catch((error) => alert(error.message));
//     };

//     const handleLogout = () => {
//         signOut(auth)
//             .then(() => alert("Logged out"))
//             .catch((error) => alert(error.message));
//     };

//     return (
//         <div className="auth-container">
//             <div className="auth-form">
//                 <h1>Sign Up</h1>
//                 <label>Email</label>
//                 <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
//                 <label>Password</label>
//                 <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                 <button className="auth-btn" onClick={createUser}>Sign Up</button>
//                 {/* Uncomment if you need a logout button */}
//                 {/* <button className="auth-btn logout-btn" onClick={handleLogout}>Logout</button> */}
//             </div>
//         </div>
//     );
// };

// export default SignupPage;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Signup.css";

// const Signup = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="signup-container">
//       <div className="signup-box">
//         <h2 className="signup-title">Create Your Account</h2>
//         <p className="signup-subtitle">Join the future of AI-powered learning.</p>
//         <form className="signup-form">
//           <input type="text" placeholder="Full Name" className="input-field" />
//           <input type="email" placeholder="Email Address" className="input-field" />
//           <input type="password" placeholder="Password" className="input-field" />
//           <button className="signup-button">Sign Up</button>
//         </form>
//         <p className="login-link">
//           Already have an account? <span onClick={() => navigate("/login")}>Log in</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../firebase";
import "../styles/Auth.css";

const auth = getAuth(app);

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUser = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Please enter your name!");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Signup Successful");
        navigate("/login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Create Your Account</h2>
        <p className="signup-subtitle">Join the future of AI-powered learning.</p>

        <form className="signup-form" onSubmit={createUser}>
          <input
            type="text"
            placeholder="Full Name"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>

        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Log in</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;


