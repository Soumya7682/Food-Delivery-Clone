import React from "react";
import "../../styles/video-page.css";
import { FaHeart, FaRegBookmark, FaRegCommentDots } from "react-icons/fa";

const VideoPage = ({ likes = 23, saves = 23, comments = 45, description = "description" }) => {
  return (
    <div className="video-page-container">
      <div className="video-header">Video</div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', width:'100%', position:'relative'}}>
        <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', gap:'12px', marginLeft:'24px', marginBottom:'32px'}}>
          <div className="video-description">{description}</div>
          <button className="visit-store-btn">visit store</button>
        </div>
        <div className="video-actions" style={{position:'absolute', right:'24px', bottom:'80px', display:'flex', flexDirection:'column', alignItems:'center', gap:'24px'}}>
          <div className="video-action" style={{cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:'4px'}}>
            <FaHeart size={40} />
            <div>likes : {likes}</div>
          </div>
          <div className="video-action" style={{cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:'4px'}}>
            <FaRegBookmark size={40} />
            <div>Save : {saves}</div>
          </div>
          <div className="video-action" style={{cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:'4px'}}>
            <FaRegCommentDots size={40} />
            <div>Comment:{comments}</div>
          </div>
        </div>
      </div>
      <div className="bottom-nav">
        <div className="nav-item active">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4"/></svg>
          <span>home</span>
        </div>
        <div className="nav-item">
          <FaRegBookmark size={24} />
          <span>saved</span>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
