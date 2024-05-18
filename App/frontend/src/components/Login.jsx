import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import Cookies from "js-cookie";

function Login() {
  const navigate = useNavigate();
  const [loginInput, setLoginInput] = useState({
    username: "",
    password: "",
  });
  const [signupInput, setSignupInput] = useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    confpassword: "",
  });
  const [routeUser, setRouteUser] = useState();

  useEffect(() => {
    if (routeUser) {
      Cookies.set("username", routeUser);
      Cookies.set("loggedIn", true);
      navigate('/profile')
    }
  }, [routeUser]);

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignupInputChange = (e) => {
    const { name, value } = e.target;
    setSignupInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/validate-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInput),
    })
      .then((response) => {
        response.json().then((data) => {
          if (response.status === 200) {
            setRouteUser(loginInput.username); // Set routeUser state on successful login
          } else {
            alert(data.message);
          }
        });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupInput),
    })
      .then((response) => {
        response.json().then((data) => {
          if (response.status === 200) {
            setRouteUser(signupInput.username); // Set routeUser state on successful signup
          } else {
            alert(data.message);
          }
        });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  return (
    <div className="login-main">
      <div style={{ paddingTop: "10%" }}></div>
      <div className="login-container">
        <p id="title">Log in</p>
        <div className="form-container">
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={loginInput.username}
                onChange={handleLoginInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginInput.password}
                autoComplete="off"
                onChange={handleLoginInputChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary" id="login-btn">
              Login
            </button>
            <p id="signup-link">Don't have an account?</p>
          </form>
        </div>
      </div>

      <div className="login-mid">
        <img
          id="user-img-1"
          src="https://media.istockphoto.com/id/1416048929/photo/woman-working-on-laptop-online-checking-emails-and-planning-on-the-internet-while-sitting-in.jpg?s=612x612&w=0&k=20&c=mt-Bsap56B_7Lgx1fcLqFVXTeDbIOILVjTdOqrDS54s="
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="green"
          className="bi bi-journals"
          viewBox="0 0 16 16"
          id="paper1"
        >
          <path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2" />
          <path d="M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="purple"
          className="bi bi-journal"
          viewBox="0 0 16 16"
          id="paper2"
        >
          <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
          <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="yellow"
          className="bi bi-journal-bookmark"
          viewBox="0 0 16 16"
          id="paper3"
        >
          <path
            fillRule="evenodd"
            d="M6 8V1h1v6.117L8.743 6.07a.5.5 0 0 1 .514 0L11 7.117V1h1v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8"
          />
          <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
          <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
        </svg>
        <img
          id="user-img-2"
          src="https://img.freepik.com/premium-photo/man-lying-down-bed-with-computer_153437-2972.jpg"
        />
      </div>

      <div style={{ marginTop: "5%" }}></div>
      <div className="signup-container">
        <p id="title">Sign up</p>
        <div className="form-container">
          <form onSubmit={handleSignupSubmit}>
            <div className="mb-3">
              <label htmlFor="signup-username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="signup-username"
                name="username"
                value={signupInput.username}
                onChange={handleSignupInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <div className="form-split">
                <div className="mb-3" style={{ marginRight: "20px" }}>
                  <label htmlFor="signup-firstname" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="signup-firstname"
                    name="firstname"
                    value={signupInput.firstname}
                    onChange={handleSignupInputChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3" style={{ marginLeft: "20px" }}>
                  <label htmlFor="signup-lastname" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="signup-lastname"
                    name="lastname"
                    value={signupInput.lastname}
                    onChange={handleSignupInputChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="form-split">
                <div className="mb-3" style={{ marginRight: "20px" }}>
                  <label htmlFor="signup-password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="signup-password"
                    name="password"
                    autoComplete="off"
                    value={signupInput.password}
                    onChange={handleSignupInputChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3" style={{ marginLeft: "20px" }}>
                  <label htmlFor="signup-confpassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="signup-confpassword"
                    name="confpassword"
                    value={signupInput.confpassword}
                    onChange={handleSignupInputChange}
                    autoComplete="off"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" id="login-btn">
              Sign up
            </button>
          </form>
        </div>
      </div>

      <div style={{ paddingTop: "10%" }}></div>
    </div>
  );
}

export default Login;
