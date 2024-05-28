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
      navigate("/profile");
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
            setRouteUser(loginInput.username);
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

  const scrollToSignUp = () => {
    console.log('jabsdb')
    const windowHeight = window.innerHeight;
    const scrollDistance = windowHeight * 0.25; // Scroll down 25% of the window height
    window.scrollTo({
      top: scrollDistance,
      behavior: "smooth",
    });
  };

  return (
    <div className="login-main">
      <div style={{ paddingTop: "2%" }}></div>
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
            <p id="signup-link" onClick={scrollToSignUp}>
              Don't have an account? Sign up below!
            </p>
          </form>
        </div>
      </div>

      <div className="login-mid">
        <div className="left-third">
          <p id="title" className="login-title">
            Create a story
          </p>
          <img
            src="https://cdn-icons-png.freepik.com/256/708/708739.png?semt=ais_hybrid"
            id="login-info-img"
          />
        </div>
        <div className="middle-third">
          <p id="title" className="login-title">
            OR Find a story
          </p>
          <img
            src="https://www.svgrepo.com/show/181800/library-book.svg"
            id="login-info-img"
          />
        </div>
        <div className="right-third">
          <p id="title" className="login-title">
            And collaborate!
          </p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/809/809522.png"
            id="login-info-img"
          />
        </div>
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
