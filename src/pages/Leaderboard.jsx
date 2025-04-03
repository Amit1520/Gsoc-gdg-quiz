import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import app from "../firebase";
import "../styles/Leaderboard.css"; // Ensure this file exists

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const db = getDatabase(app);
    const scoresRef = ref(db, "leaderboard");

    onValue(scoresRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const sortedScores = Object.entries(data)
          .map(([key, value]) => ({ id: key, ...value }))
          .sort((a, b) => b.score - a.score); // Sort in descending order
        setScores(sortedScores);
      }
    });
  }, []);

  return (
    <div className="premium-container">
    <div className="leaderboard-container">
      <h2>🏆 Leaderboard 🏆</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((player, index) => (
            <tr key={player.id} className={index === 0 ? "top-rank" : ""}>
              <td>{index + 1}</td>
              <td>{player.username}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Leaderboard;
