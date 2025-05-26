import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./profile.module.scss";
import globalstyles from "../style/allstyle.module.scss";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("publications");
  const [savedPhotos, setSavedPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newComment, setNewComment] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const nickName = decodedToken.NickName;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [profileRes, postsRes] = await Promise.all([
          axios.get(`http://localhost:8010/api/profiles/${nickName}`),
          axios.get(`http://localhost:8002/api/users/${nickName}/posts`),
        ]);

        setProfileData({
          ...profileRes.data,
          subscribersCount: profileRes.data.subscribers?.length || 0,
          subscriptionsCount: profileRes.data.subscriptions?.length || 0,
        });
        setPhotos(postsRes.data);

        const savedPosts = profileRes.data.savedPosts || [];

        const savedPhotosDetails = await Promise.all(
          savedPosts.map(async (postId) => {
            const postRes = await axios.get(`http://localhost:8002/api/posts/${postId}`);
            return postRes.data;
          })
        );

        const uniqueSavedPhotos = Array.from(new Set(savedPhotosDetails.map(p => p.postId)))
          .map(id => savedPhotosDetails.find(p => p.postId === id));

        setSavedPhotos(uniqueSavedPhotos);

      } catch (error) {
        setError(error.response ? error.response.data : error.message || "Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [nickName]);

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleEditClick = () => navigate("/redagprof");

  const openModal = async (post) => {
    try {
      const res = await axios.get(`http://localhost:8002/api/posts/${post.postId}`);
      setSelectedPost(res.data);
      setNewComment("");
    } catch (error) {
    //  console.error("Помилка при відкритті модального:", error);
    }
  };

  const closeModal = () => setSelectedPost(null);

  const handleLike = async () => {
    try {
      await axios.patch("http://localhost:8002/api/posts", {
        postId: selectedPost.postId,
        nickName,
      });
      const res = await axios.get(`http://localhost:8002/api/posts/${selectedPost.postId}`);
      setSelectedPost(res.data);
    } catch (error) {
     // console.error("Помилка при лайкуванні:", error);
    }
  };

  const handleDeletePost = async () => {
    if (!selectedPost) return;
    try {
      await axios.delete(`http://localhost:8002/api/posts/${selectedPost.postId}`);
      setPhotos(prev => prev.filter(p => p.postId !== selectedPost.postId));
      closeModal();
    } catch (error) {
      alert("Не вдалося видалити пост");
    }
  };

  const handleRemoveFromSaved = async () => {
    try {
      await axios.patch(`http://localhost:8004/api/profiles/FavoritePosts`, {
        nickName, 
        postId: selectedPost.postId, 
      });
    
      setSavedPhotos(prev => prev.filter(p => p.postId !== selectedPost.postId));
      closeModal(); 
    } catch (error) {
     // console.error("Помилка при видаленні із збережених:", error);
    }
  };
  

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    const commentData = {
      postId: selectedPost.postId,
      description: newComment,
      nickName,
    };

    try {
      await axios.patch("http://localhost:8002/api/posts/addcomments", commentData);
      const res = await axios.get(`http://localhost:8002/api/posts/${selectedPost.postId}`);
      setSelectedPost(res.data);
      setNewComment("");
    } catch (error) {
     // console.error("Помилка при додаванні коментаря:", error);
    }
  };

  
  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>Сталася помилка: {error}</p>;

  const truncatedDescription = profileData?.description?.length > 40
    ? profileData.description.slice(0, 15) + "..."
    : profileData?.description;

  return (
    <>
      <div className={globalstyles.back}></div>
      <div className={styles.body}>
        <div className={styles.mainlayers}>
          <div className={styles.upimage}></div>
          <div className={styles.maininfo}>
            <img src={profileData?.imageUrl || "default-avatar.png"} alt="Avatar" className={styles.avatarImage} />
            <div className={styles.descriptionTitle}>{truncatedDescription}</div>
            <div className={styles.nickName}>@{profileData?.nickName}</div>
          </div>

          <div className={styles.redagbutton}>
            <div className={styles.buttonredagpros} onClick={handleEditClick}>Редагувати профіль</div>
          </div>

          <div className={styles.likeinform}>
            <div>{photos.length} Публікацій</div>
            <div>{profileData?.subscribersCount} Підписників</div>
            <div>{profileData?.subscriptionsCount} Підписок</div>
          </div>

          <div className={styles.prof}>
            <div className={styles.public}>
              <div className={styles.savepublbut}>
                <div className={`${styles.publication} ${activeTab === "publications" ? styles.activeTab : ""}`} onClick={() => handleTabChange("publications")}>Публікації</div>
                <div className={`${styles.saves} ${activeTab === "saves" ? styles.activeTab : ""}`} onClick={() => handleTabChange("saves")}>Збережене</div>
              </div>

              <div className={styles.foto}>
                {activeTab === "publications" ? (
                  photos.length > 0 ? (
                    photos.map((post, index) => (
                      <div key={index} className={styles.postItem} onClick={() => openModal(post)}>
                        {post.imageUrl ? (
                          <img src={post.imageUrl} alt="Публікація" className={styles.image} />
                        ) : <p>{post.description || "Без зображення"}</p>}
                      </div>
                    ))
                  ) : <p>Додайте фото</p>
                ) : savedPhotos.length > 0 ? (
                  savedPhotos.map((post, index) => (
                    <div key={index} className={styles.postItem} onClick={() => openModal(post)}>
                      <img src={post.imageUrl} alt="Збережене" className={styles.image} />
                    </div>
                  ))
                ) : <p>Немає збережених фото</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedPost && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img src={selectedPost.imageUrl} alt="Пост" className={styles.modalImage} />
            <div className={styles.modalActions}>
              <button onClick={handleLike} className={styles.modalActionslike}>
              <svg
               style={{color: 'var(--text-color)'}}
              width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.66275 13.2135L9.82377 19.7065C11.0068 20.9532 12.9932 20.9532 14.1762 19.7065L20.3372 13.2135C22.5542 10.877 22.5543 7.08882 20.3373 4.75235C18.1203 2.41588 14.5258 2.41588 12.3088 4.75235V4.75235C12.1409 4.92925 11.8591 4.92925 11.6912 4.75235V4.75235C9.47421 2.41588 5.87975 2.41588 3.66275 4.75235C1.44575 7.08883 1.44575 10.877 3.66275 13.2135Z" stroke="currentColor" stroke-width="1.5"/>
</svg>
                {selectedPost.likes?.countLike || 0}</button>
              {photos.find(p => p.postId === selectedPost.postId) ? (
                <button onClick={handleDeletePost} className={styles.modalActionsdel}> 
                <svg
                style={{color: 'var(--text-color)'}} 
                width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">

<path d="M2.28613 8H29.7147" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.71484 8H26.2863V28.5714C26.2863 29.1776 26.0455 29.759 25.6168 30.1877C25.1881 30.6163 24.6068 30.8571 24.0006 30.8571H8.00056C7.39435 30.8571 6.81297 30.6163 6.38431 30.1877C5.95566 29.759 5.71484 29.1776 5.71484 28.5714V8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.2861 7.99972V6.85686C10.2861 5.34134 10.8882 3.88789 11.9598 2.81625C13.0314 1.74462 14.4849 1.14258 16.0004 1.14258C17.5159 1.14258 18.9694 1.74462 20.041 2.81625C21.1127 3.88789 21.7147 5.34134 21.7147 6.85686V7.99972" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.5723 12.5713V25.1427" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.4287 12.5713V25.1427" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                </button>
              ) : (
                <button onClick={handleRemoveFromSaved} className={styles.modalActionsdel}>
                  <svg
                  style={{color: 'var(--text-color)'}}  
                  width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">

<path d="M2.28613 8H29.7147" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.71484 8H26.2863V28.5714C26.2863 29.1776 26.0455 29.759 25.6168 30.1877C25.1881 30.6163 24.6068 30.8571 24.0006 30.8571H8.00056C7.39435 30.8571 6.81297 30.6163 6.38431 30.1877C5.95566 29.759 5.71484 29.1776 5.71484 28.5714V8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.2861 7.99972V6.85686C10.2861 5.34134 10.8882 3.88789 11.9598 2.81625C13.0314 1.74462 14.4849 1.14258 16.0004 1.14258C17.5159 1.14258 18.9694 1.74462 20.041 2.81625C21.1127 3.88789 21.7147 5.34134 21.7147 6.85686V7.99972" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.5723 12.5713V25.1427" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.4287 12.5713V25.1427" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                </button>
              )}
            </div>
            <div className={styles.fotodescription}>{selectedPost?.descriptions || "Опис відсутній"}</div>
            <div className={styles.commentsSection}>
              <h4 className={styles.commentsName}>Коментарі</h4>
              <div className={styles.commentsList}>
                {selectedPost.comments?.length > 0 ? (
                  selectedPost.comments.map((c, i) => (
                    <div key={i} className={styles.commentItem}>
                      <strong>{c.comentatorNickName || "Без імені"}:</strong> {c.notes || "Без коментаря"}
                    </div>
                  ))
                ) : <p>Коментарі відсутні</p>}
              </div>
              <div className={styles.commentInput}>
                <input type="text" placeholder="Ваш коментар..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                <button onClick={handleCommentSubmit}>Надіслати</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;