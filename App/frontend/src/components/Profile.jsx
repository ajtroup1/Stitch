import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Profile.css";
import Cookies from "js-cookie";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [threeStories, setThreeStories] = useState([]);

  const logout = () => {
    Cookies.set("loggedIn", "false"); // Note: 'false' as a string
    Cookies.remove("username");

    // Wait for cookies to be set and then navigate
    setTimeout(() => {
      navigate("/login");
    }, 100); // Adjust the delay as needed
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/users/${Cookies.get("username")}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json().then((data) => {
          if (response.status === 200) {
            setUser(data);
            setLoading(false);
          } else {
            alert(data.message);
          }
        });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/3-user-stories/${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json().then((data) => {
          if (response.status === 200) {
            setThreeStories(data);
            console.log(data);
          } else {
            alert(data.message);
          }
        });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, [user]);

  const navToCreate = () => {
    navigate("/create");
  };
  const navToBrowse = () => {
    navigate("/browse");
  };

  return loading ? (
    <p>Loading</p>
  ) : (
    <div className="profile-main">
      <div className="left-container">
        <div className="display-container">
          <div className="profile-img-container">
            {user.pic_url == "" ? (
              <img
                className="profile-img"
                src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              />
            ) : (
              <img className="profile-img" src={user.pic_url} />
            )}
          </div>
          <div style={{ marginTop: "12%" }}></div>
          <p id="title">{user.username}</p>
          <p id="subtitle">
            {user.firstname} {user.lastname}
          </p>
          <div className="user-stats">
            <div style={{ paddingTop: "10%" }}></div>
            {user.stories_count === 1 ? (
              <p id="subtitle">Contributed to 1 story</p>
            ) : (
              <p id="subtitle">Contributed to {user.stories_count} stories</p>
            )}

            <p id="subtitle">#X user in the world</p>
          </div>
          <button id="logout-btn" className="btn btn-danger" onClick={logout}>
            Log out
          </button>
        </div>
      </div>
      <div className="right-container">
        <div style={{ paddingTop: "8%" }}></div>
        <div className="top-container">
          <p id="subtitle" style={{ marginTop: "-1%" }}>
            There are currently XXXXXXX users creating right now!
          </p>
          <div className="profile-btns">
            <div className="profile-btn-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="white"
                className="bi bi-journal"
                viewBox="0 0 16 16"
              >
                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
              </svg>
              <button
                className="btn btn-primary"
                id="profile-btn"
                onClick={navToCreate}
              >
                Create a story
              </button>
            </div>
            <div className="profile-btn-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="white"
                className="bi bi-journals"
                viewBox="0 0 16 16"
              >
                <path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2" />
                <path d="M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0" />
              </svg>
              <button
                className="btn btn-primary"
                id="profile-btn"
                onClick={navToBrowse}
              >
                Browse stories
              </button>
            </div>
          </div>
        </div>
        <div className="bottom-container">
          <div className="story1">
            <img src="../src/assets/notepad.png" id="notepad-img" />
            <div className="story-title">
              {threeStories.length > 0 && threeStories[0].title}
            </div>
            <div className="story-text-container">
              <div className="story-text">
                {threeStories.length > 0 &&
                  threeStories[0].fragments.map((fragment, index) => (
                    <p key={index}>{fragment.text}</p>
                  ))}
              </div>
            </div>
          </div>
          <div className="story2">
            <img src="../src/assets/notepad.png" id="notepad-img" />
            <div className="story-title">
              {threeStories.length > 1 && threeStories[1].title}
            </div>
            <div className="story-text-container">
              <div className="story-text">
                {threeStories.length > 1 &&
                  threeStories[1].fragments.map((fragment, index) => (
                    <p key={index}>{fragment.text}</p>
                  ))}
              </div>
            </div>
          </div>
          <div className="story3">
            <img src="../src/assets/notepad.png" id="notepad-img" />
            <div className="story-title">
              {threeStories.length > 2 && threeStories[2].title}
            </div>
            <div className="story-text-container">
              <div className="story-text">
                {threeStories.length > 2 &&
                  threeStories[2].fragments.map((fragment, index) => (
                    <p key={index}>{fragment.text}</p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ paddingTop: "10%" }}></div>
    </div>
  );
}

export default Profile;
