import { useState } from "react";
import "../css/Create.css";

function Create() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handlePrivateChange = (event) => {
    setIsPrivate(!isPrivate);
  };

  return (
    <>
      <div style={{ paddingTop: "5.5%" }}></div>
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
                <button className="btn btn-primary">Save</button>
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
