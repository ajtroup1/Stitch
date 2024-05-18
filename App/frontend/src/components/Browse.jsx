import { useState, useEffect } from "react";
import "../css/Browse.css";

function Browse() {
  const [topStories, setTopStories] = useState([
    {
      id: 4,
      title: "title1",
      description: "desc1",
      og_author: "author1",
      fragment_1: "text1",
      fragment_2: "text2",
      fragment_3: "text3",
    },
    {
      id: 7,
      title: "title2",
      description: "desc2",
      og_author: "author1",
      fragment_1: "text1",
      fragment_2: "text2",
      fragment_3: "text3",
      fragment_4: "text4",
    },
    {
      id: 18,
      title: "title3",
      description: "desc3",
      og_author: "author1",
      fragment_1: "text1",
      fragment_2: "text2",
      fragment_3: "text3",
      fragment_4: "text4",
      fragment_5: "text5",
      fragment_6: "text6",
    },
  ]);
  const [stories, setStories] = useState([
    {
      id: 4,
      title: "title1",
      description:
        "desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1",
      og_author: "author1",
      fragment_1: "text1",
      fragment_2: "text2",
      fragment_3: "text3",
    },
    {
      id: 7,
      title: "title2",
      description: "desc2",
      og_author: "author1",
      fragment_1: "text1",
      fragment_2: "text2",
      fragment_3: "text3",
      fragment_4: "text4",
    },
    {
      id: 18,
      title: "title3",
      description: "desc3",
      og_author: "author1",
      fragment_1: "text1",
      fragment_2: "text2",
      fragment_3: "text3",
      fragment_4: "text4",
      fragment_5: "text5",
      fragment_6: "text6",
    },
    // Additional sample objects
    {
      id: 22,
      title: "title4",
      description: "desc4",
      og_author: "author2",
      fragment_1: "text1",
      fragment_2: "text2",
      fragment_3: "text3",
    },
    {
      id: 31,
      title: "title5",
      description: "desc5",
      og_author: "author3",
      fragment_1: "text1",
      fragment_2: "text2",
      fragment_3: "text3",
      fragment_4: "text4",
    },
    {
      id: 48,
      title: "title6",
      description: "desc6",
      og_author: "author4",
      fragment_1: "text1",
      fragment_2: "text2",
      fragment_3: "text3",
      fragment_4: "text4",
      fragment_5: "text5",
    },
    {
      id: 57,
      title: "title7",
      description: "desc7",
      og_author: "author5",
      fragment_1: "text1",
      fragment_2: "text2",
      fragment_3: "text3",
      fragment_4: "text4",
      fragment_5: "text5",
      fragment_6: "text6",
    },
    {
      id: 62,
      title: "title8",
      description: "desc8",
      og_author: "author6",
      fragment_1: "text1",
      fragment_2: "text2",
      fragment_3: "text3",
    },
    {
      id: 73,
      title: "title9",
      description: "desc9",
      og_author: "author7",
      fragment_1: "text1",
      fragment_2: "text2",
      fragment_3: "text3",
      fragment_4: "text4",
      fragment_5: "text5",
    },
    {
      id: 86,
      title: "title10",
      description: "desc10",
      og_author: "author8",
      fragment_1: "text1",
      fragment_2: "text2",
      fragment_3: "text3",
      fragment_4: "text4",
      fragment_5: "text5",
      fragment_6: "text6",
    },
  ]);
  const [filterOptions, setFilterOptions] = useState({});

  function wrapDescription(description) {
    const maxLength = 50; // Adjust the maximum length as needed
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "..."; // Truncate the description and add ellipsis
    } else {
      return description; // Return the original description if it's shorter than the maximum length
    }
  }

  return (
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
                      <td colSpan={2}>{wrapDescription(story.description)}</td>
                      <td>XXXXXX</td>
                      <td>{story.og_author}</td>
                      <td>
                        <a className="link">Link</a>
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
  );
}

export default Browse;
