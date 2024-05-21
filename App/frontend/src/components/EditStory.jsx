import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "../css/EditStory.css";

function EditStory() {
  const [editing, setEditing] = useState(Cookies.get("editing"));
  const [story, setStory] = useState({});
  const [loading, setLoading] = useState(true);
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/story/${Cookies.get("storyID")}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json().then((data) => {
          if (response.status === 200) {
            setStory(data);
            setLoading(false);
            console.log(data);
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
    if (story) {
      if (editing == "true") {
        setText(story.fragments[story.fragments.length - 1].text)
        setTitle(story.title)
        setDesc(story.description);
        setIsPrivate(story.isPrivate)
      }
    }
  }, [story]);

  const handleDescChange = (event) => {
    setDesc(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handlePrivateChange = (event) => {
    setIsPrivate(!isPrivate);
  };

  const postStory = (e) => {
    e.preventDefault();

    const dict = {
      title: title,
      text: text,
      private: isPrivate,
      description: desc,
      userID: Cookies.get("username"),
    };

    fetch(`http://127.0.0.1:8000/api/append-story/${Cookies.get("storyID")}`, {
      method: "POST",
      body: JSON.stringify(dict),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json().then((data) => {
          if (response.status === 200) {
            alert("Successfully created story!");
            navigate("/browse");
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
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <div style={{ paddingTop: "5%" }}></div>
          <div className="edit-story-main">
            <div className="left-container-2">
              <div className="inner-left-container">
                <div style={{ paddingTop: "2%" }}></div>
                <p id="title">
                  {story.title.length > 27
                    ? story.title.slice(0, 27) + "..."
                    : story.title}
                </p>
                <div className="story-text-container-2">
                  <div className="story-text-2">
                    {story &&
                      story.fragments.map((fragment, index) => (
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
            <div className="right-container-2">
              <div className="inner-right-container">
                <div style={{ paddingTop: "2%" }}></div>
                <p id="title">Add your fragment!</p>
                <div className="edit-story-area">
                  <form>
                    <div className="mb-3">
                      <div className="input-group" id="desc-container">
                        <textarea
                          className="form-control"
                          aria-label="With textarea"
                          value={text}
                          onChange={handleTextChange}
                          id="edit-text-area"
                        ></textarea>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="edit-bottom-right-container">
                  <div className="edit-bottom-right-left">
                    <form>
                      <div className="mb-3">
                        <label htmlFor="title-container">Title:</label>
                        <div className="input-group" id="title-container">
                          <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={handleTitleChange}
                          />
                        </div>
                      </div>
                      <div className="bottom-lower-left">
                        <div className="mb-3">
                          <label htmlFor="private-container">Private:</label>
                          <div className="input-group" id="private-container">
                            <input
                              type="checkbox"
                              value={isPrivate}
                              onChange={handlePrivateChange}
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <button
                            className="btn btn-primary"
                            onClick={(e) => postStory(e)}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="edit-bottom-right-right">
                    <form>
                      <div className="mb-3">
                        <label htmlFor="desc-container">
                          Describe your story:
                        </label>
                        <div className="input-group" id="desc-container">
                          <textarea
                            className="form-control"
                            aria-label="With textarea"
                            value={desc}
                            onChange={handleDescChange}
                          ></textarea>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default EditStory;
