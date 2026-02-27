import React, { useState, useEffect, useRef } from 'react'
import '../../styles/home.css'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

import { FaHeart, FaRegBookmark, FaRegCommentDots } from "react-icons/fa";


function Home() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false);
  const videoRefs = useRef(new Map())
  const containerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (!(video instanceof HTMLVideoElement)) return
          if (entry.isIntersecting) {
            video.play().catch(() => { })
          } else {
            video.pause()
          }
        })
      },
      {
        threshold: 0.5
      }
    )

    videoRefs.current.forEach((video) => {
      observer.observe(video)
    })

    return () => observer.disconnect()
  }, [videos])

  useEffect(() => {
    setLoading(true);
    axios.get("/api/food",{withCredentials:true})
      .then(response => {
        setVideos(response.data.foodItems)
      })
      .finally(() => setLoading(false));
  }, []);

  // Like handler
  const handleLike = async (foodId, idx) => {
    try {
      await axios.post("/api/food/like", { foodId }, { withCredentials: true });
      setVideos(videos => videos.map((v, i) => i === idx ? {
        ...v,
        likeCount: (typeof v.likeCount === 'number' ? v.likeCount : Array.isArray(v.likeCount) ? v.likeCount.length : 0) + 1
      } : v));
    } catch (e) { alert('Like failed'); }
  };

  // Save handler
  const handleSave = async (foodId, idx) => {
    try {
      await axios.post("/api/food/save", { foodId }, { withCredentials: true });
      setVideos(videos => videos.map((v, i) => i === idx ? {
        ...v,
        saves: Array.isArray(v.saves) ? [...v.saves, 'dummy'] : ['dummy']
      } : v));
    } catch (e) { alert('Save failed'); }
  };

  const setVideoRef = (id) => (el) => {
    if (!el) {
      videoRefs.current.delete(id)
      return
    }
    videoRefs.current.set(id, el)
  }

  return (
    <div ref={containerRef} className="reels-page">
      <div className="reels-feed" role="list">
        {videos.map((item, idx) => (
          <section key={item._id} className="reel" role="listitem">
            <video
              ref={setVideoRef(item._id)}
              className='reel-video'
              src={item.video}
              muted
              playsInline
              loop
              autoPlay
              preload='metadata' />
            <div className='reel-overlay'>
              <div className='reel-overlay-gradient'>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', width:'100%'}}>
                  <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', gap:'8px'}}>
                    <p className='reel-description'>{item.description}</p>
                    <Link
                      to={'/food-partner/'+ item.foodPartner}
                      className='visit-store-btn'
                    >
                      Visit Store {item.storeName}
                    </Link>
                  </div>
                  <div className="video-actions">
                    <div className="video-action" style={{cursor:'pointer'}} onClick={() => handleLike(item._id, idx)}>
                      <FaHeart size={22} />
                      <span>{Array.isArray(item.likeCount) ? item.likeCount.length : (typeof item.likeCount === 'number' ? item.likeCount : 0)}</span>
                    </div>
                    <div className="video-action" style={{cursor:'pointer'}} onClick={() => handleSave(item._id, idx)}>
                      <FaRegBookmark size={22} />
                      <span>{Array.isArray(item.saves) ? item.saves.length : 0}</span>
                    </div>
                    <div className="video-action" style={{cursor:'pointer'}}>
                      <FaRegCommentDots size={22} />
                      <span>{item.commentCount || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
      <div className="bottom-nav">
        <Link to="/" className="nav-item active">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4"/></svg>
          <span>home</span>
        </Link>
        <Link to="/saved" className="nav-item">
          <FaRegBookmark size={24} />
          <span>saved</span>
        </Link>
      </div>
    </div>
  )
}

export default Home
