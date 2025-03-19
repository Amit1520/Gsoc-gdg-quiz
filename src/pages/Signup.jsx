import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../firebase";
import "../styles/Auth.css"; // Using common CSS

const auth = getAuth(app);

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const createUser = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => alert("Signup Successful"))
            .catch((error) => alert(error.message));
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => alert("Logged out"))
            .catch((error) => alert(error.message));
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h1>Sign Up</h1>
                <label>Email</label>
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Password</label>
                <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="auth-btn" onClick={createUser}>Sign Up</button>
                {/* Uncomment if you need a logout button */}
                {/* <button className="auth-btn logout-btn" onClick={handleLogout}>Logout</button> */}
            </div>
        </div>
    );
};

export default SignupPage;
