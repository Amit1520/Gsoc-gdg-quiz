import React, { useState } from "react";
import "../styles/Dashboard.css";

const Card = ({ title, description, image, details, onClick }) => (
  <div className="card" onClick={onClick}>
    <img src={image} alt={title} />
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const DetailView = ({ item, onClose }) => (
  <div className="detail-card">
    <h2>{item.title}</h2>
    <img src={item.image} alt={item.title} />
    <p>{item.description}</p>
    <p><strong>Details:</strong> {item.details}</p>
    <div className="button-group">
      <button onClick={() => window.open(item.link, '_blank')}>Apply Now</button>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);


const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const sections = {
    Jobs: [
      {
        title: "Software Engineer",
        description: "Tech job in a reputed company",
        details: "Salary: $80,000/year. Location: Remote. Requirements: React, Node.js",
        image: "https://media.istockphoto.com/id/1075599562/photo/programmer-working-with-program-code.jpg?s=612x612&w=0&k=20&c=n3Vw5SMbMCWW1YGG6lnTfrwndNQ8B_R4Vw-BN7LkqpA=",
        link: "#",
      },
      {
        title: "Marketing Assistant",
        description: "Non-Tech job in marketing",
        details: "Salary: $45,000/year. Location: On-site. Requirements: Communication skills",
        image: "https://t4.ftcdn.net/jpg/04/09/98/25/360_F_409982569_hylwto57CuvwHa0xTUk6s1xoAQwkIgSp.jpg",
        link: "#",
      },
    ],
    Internships: [
      {
        title: "Web Dev Intern",
        description: "Remote internship for students",
        details: "3 months, remote, stipend: $500/month",
        image: "https://img.freepik.com/free-photo/web-design-technology-browsing-programming-concept_53876-163260.jpg?semt=ais_hybrid&w=740",
        link: "#",
      },
      {
        title: "HR Intern",
        description: "Internship in HR department",
        details: "2 months, on-site, stipend: $300/month",
        image: "https://t3.ftcdn.net/jpg/00/88/82/10/360_F_88821040_p5ExISvABloQC1UOxkXfoKzFM7iVLJz0.jpg",
        link: "#",
      },
    ],
    Scholarships: [
      {
        title: "Tech Scholarship",
        description: "Scholarship for tech students",
        details: "$5000 grant, merit-based",
        image: "https://lh3.googleusercontent.com/M_epEaDZAONlh-puGWXhtw4zBUhO9-BZAQyRzCGF3ECfHQPey8XZT_ItmrrM25R8FGFNdmsJARBOl3hNhHjg0Xk5dDl27_AyL5rxnd5oht00Ebvz3HSc",
        link: "#",
      },
      {
        title: "Arts Scholarship",
        description: "Scholarship for arts students",
        details: "$3000 grant, needs-based",
        image: "https://www.bafta.org/wp-content/smush-webp/2025/02/P1S6575.jpg.webp",
        link: "#",
      },
    ],
    Courses: [
      {
        title: "React Course",
        description: "Learn React from scratch",
        details: "Duration: 4 weeks, Online, Certificate included",
        image: "https://d3f1iyfxxz8i1e.cloudfront.net/courses/course_image/90442c4bf350.jpg",
        link: "#",
      },
      {
        title: "Digital Marketing",
        description: "Comprehensive digital marketing course",
        details: "Duration: 6 weeks, Online, Certificate included",
        image: "https://cdn.pixabay.com/photo/2016/03/09/13/58/online-marketing-1246457_640.jpg",
        link: "#",
      },
    ],
  };

  const sectionIcons = {
    Jobs: "https://image-processor-storage.s3.us-west-2.amazonaws.com/images/7d8ccac9e059f9d0e2296298c389089e/portrait-of-a-cheerful-beautiful-young-woman-having-an-online-meeting-on-her-laptop-in-the-cafeteria-copy-space.jpg",
    Internships: "https://t3.ftcdn.net/jpg/00/78/41/82/360_F_78418208_eNjhg8sEW0OTP7ZxbpZ9QApqpgHreKV9.jpg",
    Scholarships: "https://media.istockphoto.com/id/1128863489/photo/online-scholarship.webp?b=1&s=612x612&w=0&k=20&c=x3whNfyg8DT5oORRpSwsPij7NG-hmW20wg94liGp6nc=",
    Courses: "https://img.freepik.com/premium-photo/e-learning-online-education-student-university-concept_31965-6534.jpg?semt=ais_hybrid",
  };

  return (
    <div className="dashboard">
      <h1>DashBoard</h1>
      <div className="section-buttons">
        {Object.keys(sections).map((section) => (
          <div
            key={section}
            className="section-button"
            onClick={() => setActiveSection(section)}
          >
            <img src={sectionIcons[section]} alt={section} />
            <h2>{section}</h2>
          </div>
        ))}
      </div>

      {activeSection && !selectedItem && (
        <div className="section">
          <h2>{activeSection}</h2>
          <div className="card-container">
            {sections[activeSection].map((item, index) => (
              <Card key={index} {...item} onClick={() => setSelectedItem(item)} />
            ))}
          </div>
        </div>
      )}

      {selectedItem && (
        <DetailView item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
};

export default Dashboard;
