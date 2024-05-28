import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../css/MyStories.css";

function MyStories() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [stories, setStories] = useState([]);

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
            console.log(data);
            setUserLoading(false);
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
      fetch(`http://127.0.0.1:8000/api/user-stories/${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          response.json().then((data) => {
            if (response.status === 200) {
              console.log(data);
              setStories(data);
              setLoading(false);
            } else {
              alert(data.message);
            }
          });
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  }, [userLoading]);

  const navToEdit = (id) => {
    Cookies.set("editingStory", true);
    Cookies.set("storyID", id);
    navigate("/editstory");
  };

  return (
    <div className="mystories-main">
      {loading ? (
        <p>Loading</p>
      ) : (
        <div className="inner-stories-container">
          <div className="stories-container">
            {stories.map((story, index) => (
              <div className="story1-edit" key={index}>
                <img
                  src="../src/assets/notepad.png"
                  id="notepad-img"
                  alt="Notepad"
                />
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2280/2280532.png"
                  id="edit-story"
                  alt="Edit"
                  onClick={() => {
                    navToEdit(story.id);
                  }}
                />
                <div className="story-title" style={{ marginTop: "-2%"}}>
                  <p>
                    {story.title.length > 10
                      ? story.title.slice(0, 14) + "..."
                      : story.title}
                  </p>
                  {story.private && (
                    <img
                      src="https://static.thenounproject.com/png/1694941-200.png"
                      id="private-icon"
                      alt="Private"
                    />
                  )}
                </div>
                <div className="story-text-container">
                  <div className="story-text">
                    {story.fragments.map((fragment, index) => (
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyStories;
