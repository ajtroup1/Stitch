import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../css/EditStory.css";

function EditStory() {
  const navigate = useNavigate();
  const [good2go, setGood2Go] = useState(false)
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(Cookies.get("editingStory"));
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    const storyID = Cookies.get("storyID");
    if (!storyID) {
      navigate("/browse");
    } else {
      setGood2Go(true);
    }
  });

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
          } else {
            alert(data.message);
          }
        });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, [good2go]);

  useEffect(() => {
    if (story && editing == "true") {
      console.log(story);
      setTitle(story.title || "");
      setDesc(story.description || "");
      setIsPrivate(story.private || false);
      setText(story.fragments[story.fragments.length - 1].text);
      setLoading(false);
    } else if (story && editing == "false") {
      console.log(story);
      setLoading(false);
    }
  }, [story]);

  useEffect(() => {
    console.log(title, desc, isPrivate);
  }, [!loading]);

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
    if (editing == "false") {
      fetch(
        `http://127.0.0.1:8000/api/append-story/${Cookies.get("storyID")}`,
        {
          method: "POST",
          body: JSON.stringify(dict),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          response.json().then((data) => {
            if (response.status === 200) {
              alert("Successfully created story!");
              navigate("/profile");
            } else {
              alert(data.message);
            }
          });
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    } else {
      fetch(`http://127.0.0.1:8000/api/edit-story/${Cookies.get("storyID")}`, {
        method: "POST",
        body: JSON.stringify(dict),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          response.json().then((data) => {
            if (response.status === 200) {
              alert("Successfully saved edits!");
            } else {
              alert(data.message);
            }
          });
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  };

  const handleDelete = () => {
    setModalOpen(true);
  };

  const deleteStory = () => {
    fetch(`http://127.0.0.1:8000/api/delete-story/${Cookies.get("storyID")}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 204) {
          alert("Successfully deleted!");
          navigate("/profile");
        } else {
          alert("Failed to delete story. Please try again.");
        }
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
          {modalOpen && (
            <div className="modal">
              <div className="modal-content">
                <p id="title">Are you sure you want to delete this story?</p>
                <p id="subtitle" style={{ margin: "0 auto 10px"}}>(Deletion is permanent)</p>
                <div className="delete-btns">
                  <button className="btn btn-danger" id="delete-btn" onClick={deleteStory}>
                    Yes
                  </button>
                  <button className="btn btn-primary" id="delete-btn" onClick={() => {setModalOpen(false)}}>
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
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
                {editing === "true" && (
                  <img
                    src="https://static-00.iconduck.com/assets.00/trash-bin-icon-1024x1024-b8uy9bpj.png"
                    id="trash-icon"
                    onClick={handleDelete}
                  />
                )}
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
                              checked={isPrivate}
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
