import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase";
import "../styles/Auth.css"; // Using common CSS

const auth = getAuth(app);

const SigninPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const signinUser = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert("Sign in Successful");
                navigate("/quiz");
            })
            .catch(() => alert("Sign in failed"));
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h1>Sign In</h1>
                <label>Email</label>
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Password</label>
                <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="auth-btn" onClick={signinUser}>Sign In</button>
            </div>
        </div>
    );
};

export default SigninPage;
