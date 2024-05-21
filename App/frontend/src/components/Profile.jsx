import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Profile.css";
import Cookies from "js-cookie";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [threeStories, setThreeStories] = useState([]);
  const [editInfo, setEditInfo] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

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
    if (user && user.id) {
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
              setEditInfo(user);
              console.log(data);
            } else {
              alert(data.message);
            }
          });
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  }, [user]);

  const navToCreate = () => {
    navigate("/create");
  };
  const navToBrowse = () => {
    navigate("/browse");
  };

  const openModal = () => {
    setModalOpen(true);
    console.log(modalOpen);
  };

  const handleSignupInputChange = (e) => {
    const { name, value } = e.target;
    setEditInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:8000/api/edit-user/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editInfo),
    })
      .then((response) => {
        response.json().then((data) => {
          if (response.status === 200) {
            alert("Edited successfully!");
            window.location.reload();
          } else {
            alert(data.message);
          }
        });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  return loading ? (
    <p>Loading</p>
  ) : (
    <>
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
            <div style={{ marginTop: "2%" }}></div>
            <p id="title">{user.username}</p>
            <p id="subtitle">
              {user.firstname} {user.lastname}
            </p>
            <div className="user-stats">
              <div style={{ paddingTop: "10%" }}></div>
              {user.stories_count === 1 ? (
                <p id="subtitle">
                  Contributed to{" "}
                  <span
                    style={{
                      fontWeight: "bold",
                      // fontStyle: "italic",
                    }}
                  >
                    1
                  </span>{" "}
                  story
                </p>
              ) : (
                <p id="subtitle">
                  Contributed to{" "}
                  <span
                    style={{
                      fontWeight: "bold",
                      // fontStyle: "italic",
                    }}
                  >
                    {user.stories_count}
                  </span>{" "}
                  stories
                </p>
              )}

              <p id="subtitle">#X user in the world</p>
            </div>
            <button id="logout-btn" className="btn btn-danger" onClick={logout}>
              Log out
            </button>
            <p id="edit-text" onClick={openModal}>
              Edit user information
            </p>
          </div>
        </div>
        <div className="right-container">
          <div style={{ paddingTop: "9%" }}></div>
          <div className="top-container">
            <p id="subtitle" style={{ marginTop: "-1%" }}>
              There are currently {user.num_users} users creating right now!
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
              {threeStories.length > 0 && (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2280/2280532.png"
                  id="edit-story"
                />
              )}
              <div className="story-title">
                {threeStories.length > 0 && (
                  <p>
                    {threeStories[0].title.length > 20
                      ? threeStories[0].title.slice(0, 24) + "..."
                      : threeStories[0].title}
                  </p>
                )}
                {threeStories.length === 0 && (
                  <p>Create stories to get started!</p>
                )}
              </div>
              <div className="story-text-container">
                <div className="story-text">
                  {threeStories.length > 0 &&
                    threeStories[0].fragments.map((fragment, index) => (
                      <div key={fragment.id.toString() + index.toString()}>
                        <p className="story-username">
                          {fragment.user.username}:
                        </p>
                        <p>{fragment.text}</p>
                      </div>
                    ))}
                  {threeStories.length === 0 && (
                    <p id="subtitle" style={{ marginTop: "13px" }}>
                      You can find stories by browsing or start your own.
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="story2">
              <img src="../src/assets/notepad.png" id="notepad-img" />
              {threeStories.length > 1 && (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2280/2280532.png"
                  id="edit-story"
                />
              )}
              <div className="story-title">
                {threeStories.length > 1 && (
                  <p>
                    {threeStories[1].title.length > 20
                      ? threeStories[1].title.slice(0, 24) + "..."
                      : threeStories[1].title}
                  </p>
                )}
              </div>
              <div className="story-text-container">
                <div className="story-text">
                  {threeStories.length > 1 &&
                    threeStories[1].fragments.map((fragment, index) => (
                      <div key={fragment.id.toString() + index.toString()}>
                        <p className="story-username">
                          {fragment.user.username}:
                        </p>
                        <p>{fragment.text}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="story3">
              <img src="../src/assets/notepad.png" id="notepad-img" />
              {threeStories.length > 2 && (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2280/2280532.png"
                  id="edit-story"
                />
              )}
              <div className="story-title">
                {threeStories.length > 2 && (
                  <p>
                    {threeStories[2].title.length > 20
                      ? threeStories[2].title.slice(0, 24) + "..."
                      : threeStories[2].title}
                  </p>
                )}
              </div>
              <div className="story-text-container">
                <div className="story-text">
                  {threeStories.length > 2 &&
                    threeStories[2].fragments.map((fragment, index) => (
                      <div key={fragment.id.toString() + index.toString()}>
                        <p className="story-username">
                          {fragment.user.username}:
                        </p>
                        <p>{fragment.text}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {modalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span
                className="close"
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                &times;
              </span>
              <div className="signup-container">
                <p id="title">Edit user information</p>
                <div className="form-container">
                  <form
                    onSubmit={(e) => {
                      handleEdit(e);
                    }}
                  >
                    <div className="mb-3">
                      <label htmlFor="signup-username" className="form-label">
                        Username
                      </label>
                      <input
                        type="text"
                        id="signup-username"
                        name="username"
                        value={editInfo.username}
                        onChange={handleSignupInputChange}
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <div className="form-split">
                        <div className="mb-3" style={{ marginRight: "20px" }}>
                          <label
                            htmlFor="signup-firstname"
                            className="form-label"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            id="signup-firstname"
                            name="firstname"
                            value={editInfo.firstname}
                            onChange={handleSignupInputChange}
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3" style={{ marginLeft: "20px" }}>
                          <label
                            htmlFor="signup-lastname"
                            className="form-label"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="signup-lastname"
                            name="lastname"
                            value={editInfo.lastname}
                            onChange={handleSignupInputChange}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="signup-pic" className="form-label">
                        Profile picture URL:
                      </label>
                      <input
                        type="text"
                        id="signup-pic"
                        name="pic_url"
                        value={editInfo.pic_url}
                        onChange={handleSignupInputChange}
                        className="form-control"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      id="login-btn"
                    >
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        <div style={{ paddingTop: "10%" }}></div>
      </div>
    </>
  );
}

export default Profile;
