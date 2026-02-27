import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import '../../../styles/profile.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CreateFood from './CreateFood';
import { useAuth } from '../../../context/AuthContext';

const Profile = () => {
    const {id}=useParams()
    const { auth } = useAuth();
    const [profile,setProfile]=useState(null);
const [videos, setVideos]=useState([]);    
    const [showCreateFood, setShowCreateFood] = useState(false);
    useEffect(()=>{
axios.get(`/api/food-partner/profile/${id}`,{withCredentials:true})
.then(response=>{
    console.log('Profile response:', response.data);
    setProfile(response.data.foodPartner)
    setVideos(response.data.foodPartner.foodItems)
})
.catch(error=>{
    console.error('Error fetching profile:', error);
})
},[id])
  return (
     <main className="profile-page">
            <section className="profile-header">
                <div className="profile-meta">
                    
                    
                        <img  className='profile-avatar' src='https://tse1.mm.bing.net/th/id/OIP.6E59fA0XA6lx8RsJjtAjXwHaHa?pid=Api'></img>
                    
                    <div className="profile-info">
                        <h1 className="profile-pill profile-business" title="Business name">
                    
                            {profile?.fullname || 'Loading...'}
                        </h1>
                        <p className="profile-pill profile-address" title="Address">
                            {profile?.address || 'Loading...'}
                        </p>
                    </div>
                </div>

                <div className="profile-stats" role="list" aria-label="Stats">
                    <div className="profile-stat" role="listitem">
                        <span className="profile-stat-label">total meals</span>
                        <span className="profile-stat-value">{profile?.totalMeals || 0}</span>
                    </div>
                    <div className="profile-stat" role="listitem">
                        <span className="profile-stat-label">customer served</span>
                        <span className="profile-stat-value">{profile?.customersServed || 0}</span>
                    </div>
                </div>
                {auth?.type === 'foodPartner' && auth.profile._id === id && (
                  <button
                    className="profile-create-food-btn"
                    onClick={() => setShowCreateFood(true)}
                    style={{marginTop:'1rem', background:'var(--button-bg)', color:'#fff', border:'none', borderRadius:'8px', padding:'0.7rem 1.2rem', fontSize:'1rem', cursor:'pointer' }}
                  >
                    Add/Create Food
                  </button>
                )}
            </section>

            {showCreateFood && (
              <section className="profile-create-food-section">
                <CreateFood />
                <button
                  className="profile-close-create-food-btn"
                  onClick={() => setShowCreateFood(false)}
                  style={{marginTop:'1rem', background:'var(--error-color)', color:'#fff', border:'none', borderRadius:'8px', padding:'0.5rem 1rem', fontSize:'0.95rem', cursor:'pointer' }}
                >
                  Close
                </button>
              </section>
            )}

            <section className="profile-gallery">
                <h2 className="gallery-title">Videos</h2>
                <div className="gallery-grid">
                    {videos.map(v => (
                      <div key={v._id} className="gallery-item">
                        <video  className="video-placeholder" style={{objectFit:"cover",width:'100%', height:'100%'}} src={v.video} muted></video>
                      </div>
                    ))}
                </div>
            </section>
        </main>
  );
};

export default Profile;