import React, { useState, useEffect } from "react";
import { getDatabase, ref, set, get } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebase";
import "../styles/Quiz.css";

const auth = getAuth(app);
const db = getDatabase(app);

const quizData = {
  Math: [
    { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
    { question: "What is 5 × 6?", options: ["30", "25", "35"], answer: "30" },
    { question: "What is 9 × 9?", options: ["30", "25", "81"], answer: "81" }
  ],
  Computer: [
    { question: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Process Utility"], answer: "Central Processing Unit" },
    { question: "What is RAM?", options: ["Random Access Memory", "Read Access Memory", "Rapid Access Memory"], answer: "Random Access Memory" }
  ],
  Physics: [
    { question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "1,000,000 km/s"], answer: "300,000 km/s" },
    { question: "Who discovered gravity?", options: ["Newton", "Einstein", "Galileo"], answer: "Newton" }
  ],
  Chemistry: [
    { question: "What is H2O?", options: ["Hydrogen", "Water", "Oxygen"], answer: "Water" },
    { question: "What gas do plants absorb?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen"], answer: "Carbon Dioxide" }
  ]
};

const Quiz = () => {
  const [user, setUser] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ? currentUser : null);
    });
  }, []);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setQuestions(quizData[topic]);
  };

  const handleAnswerSubmit = () => {
    if (!isSubmitted) {
      setIsSubmitted(true);

      if (selectedOption === questions[currentQuestion].answer) {
        setScore(score + 100);
      }

      setTimeout(() => {
        if (currentQuestion + 1 < questions.length) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedOption("");
          setIsSubmitted(false);
        } else {
          updateLeaderboard();
          setShowResult(true);
        }
      }, 1500);
    }
  };

  const updateLeaderboard = async () => {
    if (!user) return;
    const userRef = ref(db, `leaderboard/${user.uid}`);
    const snapshot = await get(userRef);
    const previousScore = snapshot.exists() ? snapshot.val().score : 0;
    set(userRef, { username: user.email, score: Math.max(previousScore, score + 1) });
  };

  return (
    <div className="quiz-container">
      {user ? (
        !selectedTopic ? (
          <div className="topic-selection">
            <h2>Select a Quiz Topic</h2>
            {Object.keys(quizData).map((topic, index) => (
              <button key={index} className="topic-btn" onClick={() => handleTopicSelect(topic)}>
                {topic}
              </button>
            ))}
          </div>
        ) : showResult ? (
          <div className="result-container">
            <h2>Quiz Finished!</h2>
            <p>Your score: {score} / {questions.length}</p>
            <button className="restart-btn" onClick={() => window.location.reload()}>Restart</button>
          </div>
        ) : (
          <>
            <h2>{questions[currentQuestion].question}</h2>
            <div>
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`option-btn 
                    ${selectedOption === option ? "selected" : ""}
                    ${isSubmitted && option === questions[currentQuestion].answer ? "correct" : ""}
                    ${isSubmitted && selectedOption === option && selectedOption !== questions[currentQuestion].answer ? "incorrect" : ""}
                  `}
                  onClick={() => !isSubmitted && setSelectedOption(option)}
                  disabled={isSubmitted}
                >
                  {option}
                </button>
              ))}
            </div>
            <button className="submit-btn" onClick={handleAnswerSubmit} disabled={!selectedOption || isSubmitted}>
              Submit Answer
            </button>
          </>
        )
      ) : (
        <p>Please log in to take the quiz.</p>
      )}
    </div>
  );
};

export default Quiz;
