import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Browse.css";
import Cookies from "js-cookie";

function Browse() {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    username: "",
    original: false,
  });

  const handleOriginalChange = (event) => {
    setFilters({ ...filters, original: event.target.checked });
  };

  const handleUsernameChange = (event) => {
    setFilters({ ...filters, username: event.target.value });
  };

  const filteredData = stories.filter((item) => {
    if (filters.original && item.fragments.length !== 1) {
      return false;
    }
    if (
      filters.username !== "" &&
      item.fragments[item.fragments.length - 1].user.username !==
        filters.username
    ) {
      console.log(item.fragments[item.fragments.length - 1].user.username);
      return false;
    }
    return true;
  });

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/stories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json().then((data) => {
          if (response.status === 200) {
            // Sort the data by most recent date modified
            const sortedData = data.sort(
              (a, b) => new Date(b.date_modified) - new Date(a.date_modified)
            );
            setStories(sortedData);
            console.log(sortedData);
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


  function wrapDescription(description) {
    const maxLength = 50; // Adjust the maximum length as needed
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "..."; // Truncate the description and add ellipsis
    } else {
      return description; // Return the original description if it's shorter than the maximum length
    }
  }

  const navToEdit = (id) => {
    Cookies.set("storyID", id);
    Cookies.set("editingStory", true);
    navigate("/editstory");
  };

  return (
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <div className="browser-main">
            <div className="left-browse">
              <div className="filter-container">
                <p id="subtitle">Filters</p>
                <form>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={filters.username}
                      onChange={handleUsernameChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="original" className="form-label">
                      Original Story
                    </label>
                    <input
                      type="checkbox"
                      id="original"
                      name="original"
                      checked={filters.original}
                      onChange={handleOriginalChange}
                      className="form-checkbox"
                    />
                  </div>
                </form>
              </div>
              <div className="browse-bottom-container">
                <img src="../src/assets/stitch-icon.png" id="stitch-icon" />
                <p id="title" style={{ marginTop: "-4%" }}>
                  Stitch
                </p>
              </div>
            </div>
            <div className="right-browse">
              <div className="inner-stories-container-browse">
                <div className="stories-container">
                  {filteredData.map((story, index) => (
                    <div className="story1-browse" key={index}>
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
                      <div className="story-title" style={{ marginTop: "-2%" }}>
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
                            <div
                              key={fragment.id.toString() + index.toString()}
                            >
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
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Browse;
