import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Story.css";
import Cookies from "js-cookie";

function Story() {
  const navigate = useNavigate();
  const [good2go, setGood2Go] = useState(false);
  const [story, setStory] = useState({});
  const [loading, setLoading] = useState(true);

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
            console.log(data);
            setLoading(false);
          } else {
            alert(data.message);
          }
        });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, [good2go]);

  const handleNavToEditStory = () => {
    Cookies.set("editing", false);
    navigate("/editstory");
  };

  return (
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        <div className="story-main">
          <div style={{ marginTop: "-4%" }}></div>
          <div className="top-half-2">
            <div className="top-left">
              <p id="title">
                {story.title.length > 25
                  ? story.title.slice(0, 29) + "..."
                  : story.title}
              </p>
              <div className="lower-top-left">
                <div className="profile-photos">
                  <div className="profile-pics-container">
                    {story &&
                      story.fragments.slice(-3).map((fragment, index) => (
                        <div
                          key={fragment.id.toString() + index.toString()}
                          className="profile-pic-wrapper"
                        >
                          {fragment.user.pic_url === "" ? (
                            <img
                              src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                              className="profile-pic-story-mini"
                            />
                          ) : (
                            <img
                              src={fragment.user.pic_url}
                              className="profile-pic-story-mini"
                            />
                          )}
                        </div>
                      ))}
                  </div>
                </div>
                {story.fragments.length == 1 && (
                  <p id="subtitle">
                    {story.fragments[story.fragments.length - 1].user.username}
                  </p>
                )}
                {story.fragments.length > 1 &&
                  story.fragments.length < 4 &&
                  story.fragments.map((fragment, index) => (
                    <div key={fragment.id.toString() + index.toString()}>
                      <p className="story-username">
                        {fragment.user.username}
                        {index !== story.fragments.length - 1 && ","}&nbsp;
                      </p>
                    </div>
                  ))}
                {story.fragments.length > 3 &&
                  story.fragments.slice(0, 3).map((fragment, index) => (
                    <div key={fragment.id.toString() + index.toString()}>
                      <p className="author-text-story">
                        {fragment.user.username}
                        {index !== 2 && ","}&nbsp;{" "}
                        {/* Add comma for the first two usernames */}
                      </p>
                    </div>
                  ))}
                {story.fragments.length > 3 &&
                  `+${story.fragments.length - 3} more`}
                <button
                  className="btn btn-primary"
                  id="add-part-btn"
                  onClick={handleNavToEditStory}
                >
                  Add a fragment to this story!
                </button>
              </div>
            </div>
            <div className="top-right">
              <div className="story-desc-area">
                <p>{story.description}</p>
              </div>
            </div>
          </div>
          <div className="bottom-half-2">
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
      )}
    </>
  );
}

export default Story;
