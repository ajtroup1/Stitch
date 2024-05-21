import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Browse.css";
import Cookies from "js-cookie";

function Browse() {
  const navigate = useNavigate()
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topStories, setTopStories] = useState([
    {
      title: "title1",
      description: "desc1",
      og_author: "author1",
    },
    {
      title: "title1",
      description: "desc1",
      og_author: "author1",
    },
    {
      title: "title1",
      description: "desc1",
      og_author: "author1",
    },
  ]);
  const [filterOptions, setFilterOptions] = useState({});

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
            setStories(data);
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
  }, []);

  function wrapDescription(description) {
    const maxLength = 50; // Adjust the maximum length as needed
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "..."; // Truncate the description and add ellipsis
    } else {
      return description; // Return the original description if it's shorter than the maximum length
    }
  }

  const goToStory = (id) => {
    Cookies.set("storyID", id)
    navigate("/story")
  }

  return (
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <div style={{ paddingTop: "5.4%" }}></div>
          <div className="browser-main">
            <div className="top-half">
              <div className="top-left-container">
                <p id="subtitle" style={{ marginTop: "2%" }}>
                  This week's top 3 stories
                </p>
                <div className="top-stories-container">
                  {topStories.map((story, key) => (
                    <div key={key} className="story-indiv">
                      <p>{`${story.title}`}</p>
                      <p>{`${story.description}`}</p>
                      <p>{`Original author: ${story.og_author}`}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="top-right-container"></div>
            </div>
            <div className="bottom-half">
              <div className="bottom-inner-container">
                <div className="filter-container"></div>
                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th colSpan={2}>Description</th>
                        <th>Rating</th>
                        <th>Original author</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {stories.map((story, key) => (
                        <tr key={key}>
                          <td>{story.title}</td>
                          <td colSpan={2}>
                            {wrapDescription(story.description)}
                          </td>
                          <td>XXXXXX</td>
                          <td>
                            {
                              story.fragments[story.fragments.length - 1].user
                                .username
                            }
                          </td>
                          <td>
                            <a className="link" onClick={() => {goToStory(story.id)}}>Link</a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
