import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home.jsx";
import "../css/App.css";
import Login from "./Login.jsx";
import Profile from "./Profile.jsx";
import Browse from "./Browse.jsx";
import Create from "./Create.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <Router>
      <div className="main">
        {location.pathname === "/" && (
          <img
            src={"../src/assets/sketch-background.jpg"}
            id="background-img"
            alt="Background"
          />
        )}
        <nav>
          <div className="navbar">
            <div className="left-nav">
              <img src="../src/assets/stitch-icon.png" id="stitch-nav-icon" />
              <p id="nav-title">Stitch</p>
            </div>
            <div className="center-nav">
              <a href="/">
                <p id="nav-subtitle">Home</p>
              </a>
              <a href="/browse">
                <p id="nav-subtitle">Browse</p>
              </a>
              <a href="/create">
                <p id="nav-subtitle">Create</p>
              </a>
            </div>
            <div id="right-nav">
              {loggedIn ? (
                <div className="nav-login">
                  <a href="/profile">
                    <p id="nav-subtitle">username</p>
                  </a>

                  <a href="/profile">
                    <img
                      src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                      id="profile-img"
                    />
                  </a>
                </div>
              ) : (
                <div className="nav-login">
                  <a href="/login">
                    <p id="nav-subtitle">Login</p>
                  </a>
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                    id="profile-img"
                  />
                </div>
              )}
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/create" element={<Create />} />
        </Routes>

        <div className="container">
          <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <p className="col-md-4 mb-0 text-body-secondary">
              © 2024 Stitch, Inc
            </p>

            <a
              href="/"
              className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
            >
              <img src="../src/assets/stitch-icon.png" id="footer-icon" />
            </a>

            <ul className="nav col-md-4 justify-content-end">
              <li className="nav-item">
                <a href="#" className="nav-link px-2 text-body-secondary">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link px-2 text-body-secondary">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link px-2 text-body-secondary">
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link px-2 text-body-secondary">
                  FAQs
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link px-2 text-body-secondary">
                  About
                </a>
              </li>
            </ul>
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
