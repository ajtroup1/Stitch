import { useState, useEffect } from "react";
import "../css/Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate()

  const navToLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <div className="home-main">
        <div className="home-top">
          <div style={{ paddingTop: "14%" }}></div>
          <div id="top-background-img">
            <div style={{ paddingTop: "1.5%" }}></div>
            <p id="title">Welcome to Stitch!</p>
            <p id="subtitle">
              The <u>ultimate</u> collaborative storytelling platform
            </p>
          </div>
        </div>
        <div className="home-middle-container">
          <div className="home-middle-left">
            <p id="title">How does Stitch work?</p>
            <p>
              Stitch provides a platform for collaborative storytelling, where
              users can contribute to and co-create stories with others. Users
              can either start their own story or join existing ones by adding
              "story fragments" to other users' stories. This collaborative
              process allows multiple users to contribute their creativity and
              imagination, resulting in a cohesive and dynamic story that
              evolves over time. Whether you're a storyteller looking to share
              your ideas or someone who enjoys adding twists to existing
              narratives, Stitch offers a space for collaborative storytelling
              where everyone's contribution matters!
            </p>
          </div>
          <div className="home-middle-left">
            <p id="title">Access Stitch account</p>
            <img src="../src/assets/stitch-icon.png" id="stitch-icon"/>
            <button className="btn btn-primary" onClick={navToLogin}>Log in / Sign up</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
