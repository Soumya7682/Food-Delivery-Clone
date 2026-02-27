import React, { useEffect, useState } from "react";
import "../../styles/video-page.css";
import { FaRegBookmark } from "react-icons/fa";

const SavePage = () => {
  const [savedVideos, setSavedVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Fetch saved videos for the current user
    fetch("/api/food/saved", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setSavedVideos(data.savedVideos || []);
      })
      .catch(() => setSavedVideos([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="save-page-container">
      <h2>Saved Items</h2>
      {loading ? <div>Loading...</div> : savedVideos.length === 0 ? (
        <div>No saved items.</div>
      ) : (
        <ul className="saved-list">
          {savedVideos.map((item, idx) => (
            <li key={idx} className="saved-item">
              <video src={item.video} style={{width:80, height:80, objectFit:'cover', borderRadius:8, marginRight:12}} />
              <div style={{flex:1}}>
                <div style={{fontWeight:'bold'}}>{item.name}</div>
                <div>{item.description}</div>
                <a href={"/food-partner/"+(item.foodPartner && item.foodPartner._id ? item.foodPartner._id : item.foodPartner)} style={{color:'#7c4444'}}>Visit store</a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavePage;
