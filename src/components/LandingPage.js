import React, { useEffect, useState } from "react";
import "./LandingPage.css";

const LandingPage = () => {
  const [courses, setCourses] = useState([]);

  // Récupération des cours depuis le backend
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/courses") // Changez cette URL pour votre API
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        return response.json();
      })
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div>
      <header
        className="hero-section text-center"
        style={{
          backgroundImage: "url('/images/image2.avif')",
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Improve your skills on your own</h1>
        <p>To prepare for a better future</p>
        <a href="#courses" className="btn-primary">
          REGISTER NOW
        </a>
      </header>

      {/* Section Courses */}
      <section id="courses" className="container py-5">
        <a href="#courses" className="btn-primary">
          Discover Our Courses
        </a>
        
       

        <h2 className="text-center mb-4">Our Courses</h2>
        <div className="row">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course._id} className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                  <img src={`http://localhost:5000/uploads/${course.image.split('storage/images/')[1]}`} alt={course.title} width="150" />
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text">{course.price} DT/Month</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No courses available at the moment.</p>
          )}
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" className="container py-5">
        <h2 className="text-center mb-4">Contact Us</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Write your message here"
              rows="4"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn-primary">
            Send the message
          </button>
        </form>
      </section>
    </div>
  );
};

export default LandingPage;
