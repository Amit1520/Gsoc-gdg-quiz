// // // import React from "react";
// // // import { Link } from "react-router-dom";
// // // import "../styles/Home.css"; // Ensure this file exists

// // // const Home = () => {
// // //     return (
// // //         <div className="home-container">
// // //             <div className="home-content">
// // //                 <h1>Welcome to <span>EduQuiz</span> 🎓</h1>
// // //                 <p>Test your knowledge, earn rewards, and climb the leaderboard!</p>
// // //                 <p>Join now and start learning in a fun, interactive way.</p>
// // //                 <div className="home-buttons">
// // //                     <Link to="/signin" className="home-btn login">Get Started</Link>
// // //                     <Link to="/signup" className="home-btn signup">Sign Up</Link>
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default Home;


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "../styles/Home.css"; 
// import { connectWallet, getEthereumContract } from "../utils/web3";

// const Home = () => {
//     const [walletAddress, setWalletAddress] = useState(null);
//     const [tokenBalance, setTokenBalance] = useState(null);

//     const handleConnectWallet = async () => {
//         const address = await connectWallet();
//         setWalletAddress(address);
//         if (address) {
//             fetchTokenBalance(address);
//         }
//     };

//     const fetchTokenBalance = async (address) => {
//         try {
//             const contract = await getEthereumContract();
//             if (!contract) return;
            
//             const balance = await contract.balanceOf(address);
//             setTokenBalance(Number(balance) / 1e18);  // Convert Wei to EDU tokens
//         } catch (error) {
//             console.error("Error fetching balance:", error);
//         }
//     };

//     useEffect(() => {
//         if (walletAddress) {
//             fetchTokenBalance(walletAddress);
//         }
//     }, [walletAddress]);

//     return (
//         <div className="home-container">
//             <div className="home-content">
//                 <h1>Welcome to <span>EduQuiz</span> 🎓</h1>
//                 <p>Test your knowledge, earn rewards, and climb the leaderboard!</p>
//                 <p>Join now and start learning in a fun, interactive way.</p>
                
//                 {/* <div className="wallet-info">
//                     {walletAddress ? (
//                         <>
//                             <p>Connected Wallet: {walletAddress}</p>
//                             <p>EduToken Balance: {tokenBalance !== null ? `${tokenBalance} EDU` : "Loading..."}</p>
//                         </>
//                     ) : (
//                         <button className="home-btn connect-wallet" onClick={handleConnectWallet}>
//                             Connect Wallet
//                         </button>
//                     )}
//                 </div> */}

//                 <div className="home-buttons">
//                     <Link to="/signin" className="home-btn login">Get Started</Link>
//                     <Link to="/signup" className="home-btn signup">Sign Up</Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Home;


import React from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import { FaVideo, FaChalkboardTeacher, FaShieldAlt, FaBriefcase } from "react-icons/fa";
// import { FaWhatever } from 'react-icons/fa'
import "../styles/Home.css";
//import Feedback from "./Feedback"; // Import Component


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Navbar
      <nav className="navbar">
        <h1 className="logo">AI Learning</h1>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav> */}

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Revolutionize Learning with AI</h1>
          <p className="hero-subtitle">
            Empowering educators and learners with AI-driven insights.
          </p>
          <button className="cta-button" onClick={() => navigate("/signup")}>
            Get Started Today
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="features">
      <div className="feature-card" onClick={() => navigate("/ai-video-content")} style={{ cursor: "pointer" }}>
  <FaVideo className="feature-icon" />
  <h2>AI-Generated Video Content</h2>
  <p>Create engaging video lessons powered by AI.</p>
</div>
        <div className="feature-card" onClick={() => navigate("/feedback")} style={{ cursor: "pointer" }}>
         <FaChalkboardTeacher className="feature-icon" />
         <h2>Personalized Teacher Feedback</h2>
         <p>AI-driven feedback for improved learning outcomes.</p>
        </div>
        <div className="feature-card">
          <FaShieldAlt className="feature-icon" />
          <h2>Blockchain Security</h2>
          <p>Secure and verifiable learning certifications.</p>
        </div>
        <div className="feature-card">
          <FaBriefcase className="feature-icon" />
          <h2>AI-Driven Career Marketplace</h2>
          <p>Connect with top internships and job opportunities.</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <h2>About Us</h2>
        <p>
          At AI Learning & Career Hub, we are passionate about transforming education with 
          cutting-edge AI technologies. Our platform leverages artificial intelligence to 
          create personalized learning experiences, enhance educational content, and provide 
          actionable insights for both students and educators.
        </p>
        <p>
          With AI-generated video lessons, interactive assessments, and real-time feedback, 
          we ensure that learning is more engaging and accessible than ever before. Our goal 
          is to bridge the gap between traditional education and the future of digital learning, 
          making it easier for learners worldwide to acquire new skills and stay ahead in 
          their careers.
        </p>
        <p>
          We also focus on security and credibility, integrating blockchain technology to 
          ensure the authenticity of learning certifications. This makes our platform a 
          trusted choice for students, professionals, and organizations looking to upskill 
          with confidence.
        </p>
        <p>
          Whether you're an educator seeking AI-driven tools, a student looking for 
          personalized learning paths, or a professional exploring new career opportunities, 
          AI Learning & Career Hub is here to support your journey every step of the way.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <p>Email: <a href="mailto:support@ailearning.com">support@ailearning.com</a></p>
        <p>Phone: +123 456 7890</p>
        <p>Address: 123 AI Street, Innovation City, Techland</p>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Start Your AI Learning Journey Today</h2>
        <p>Join thousands of students and professionals leveraging AI-powered education.</p>
        {/* <button className="cta-button">Sign Up Now</button> */}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 AI Learning & Career Hub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
