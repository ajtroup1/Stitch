import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Create.css";
import Cookies from "js-cookie";

function Create() {
  const [good2go, setGood2Go] = useState(false)
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if(Cookies.get('loggedIn') == "false") {
      navigate('/login')
    }
  })

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handlePrivateChange = (event) => {
    setIsPrivate(!isPrivate);
  };

  const handleDescChange = (event) => {
    setDesc(event.target.value);
  };

  const postStory = (e) => {
    e.preventDefault()
    
      const dict = {
        "title": title,
        "text": text,
        "is_private": isPrivate,
        "description": desc,
        "userID": Cookies.get('username')
      }

    fetch(`http://127.0.0.1:8000/api/initialize-story`, {
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
            navigate('/profile')
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
      <div className="create-main">
        <div className="create-container">
          <div className="create-top-container">
            <div className="create-title-container">
              <form>
                <div className="mb-3" id="create-form">
                  <p id="title">Title:</p>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control input-no-title"
                      value={title}
                      onChange={handleTitleChange}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="create-top-right-container">
              <form>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                    value={isPrivate}
                    onChange={handlePrivateChange}
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Private
                  </label>
                </div>
                <button className="btn btn-primary" onClick={(e) => {postStory(e)}}>
                  Save
                </button>
              </form>
            </div>
          </div>
          <div className="story-write-container">
            <form>
              <div className="mb-3">
                <div className="input-group">
                  <textarea
                    className="form-control"
                    aria-label="With textarea"
                    value={text}
                    onChange={handleTextChange}
                    id="story-box"
                  ></textarea>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="desc-container">Describe your story:</label>
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
    </>
  );
}

export default Create;
