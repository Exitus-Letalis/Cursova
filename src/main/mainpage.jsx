import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from './mainstyle.module.scss';
import globalstyles from "../style/allstyle.module.scss";
import Stories from "./storis";
import { fetchPostsForSubscriptions } from "./photofunc.jsx";
import { jwtDecode } from "jwt-decode";

const MainPage = () => {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [currentUserNickname, setCurrentUserNickname] = useState("");
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
const [selectedStoryForModal, setSelectedStoryForModal] = useState(null);
  
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode(token);
          const myNick = decoded.NickName || decoded.nickname;
          setCurrentUserNickname(myNick);
        }
  
        const posts = await fetchPostsForSubscriptions();
        setFilteredPosts(posts);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Користувач не авторизований");

      const decoded = jwtDecode(token);
      const myNickName = decoded.NickName || decoded.nickname;

      const postRes = await axios.get(`http://localhost:8002/api/posts/${postId}`);
      const postData = postRes.data;

      const isLiked = postData.likes.likesNickName.includes(myNickName);

      await axios.patch(`http://localhost:8002/api/posts`, {
        postId,
        nickName: myNickName,
      });

      setFilteredPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.postId === postId
            ? {
                ...post,
                likes: {
                  countLike: isLiked
                    ? post.likes.countLike - 1
                    : (post.likes.countLike || 0) + 1,
                  likesNickName: isLiked
                    ? post.likes.likesNickName.filter((nick) => nick !== myNickName)
                    : [...post.likes.likesNickName, myNickName],
                },
              }
            : post
        )
      );
    } catch (err) {
      console.error("Error in handleLike:", err);
    }
  };

  const openCommentModal = (post) => {
    setActivePost({ ...post, comments: post.comments || [] });
    setNewComment("");
    setModalOpen(true);
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim() || !activePost) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Користувач не авторизований");

      const decoded = jwtDecode(token);
      const myNickName = decoded.NickName || decoded.nickname;

      await axios.patch("http://localhost:8002/api/posts/addcomments", {
        postId: activePost.postId,
        description: newComment, // це буде новий текст коментаря
        nickName: myNickName,    // це ваш никнейм
      });

      // Після відправки на сервер
      const updatedPostRes = await axios.get(`http://localhost:8002/api/posts/${activePost.postId}`);
      const updatedPost = updatedPostRes.data;

      // Оновлюємо локальний стан після отримання актуальних даних
      setFilteredPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.postId === activePost.postId
            ? { ...post, comments: updatedPost.comments }
            : post
        )
      );
      
      setActivePost((prev) => ({
        ...prev,
        comments: updatedPost.comments,
      }));
      setNewComment("");
    } catch (err) {
      console.error("Error in handleCommentSubmit:", err);
    }
  };
  const savePost = async (postId, nickName) => {
    try {
      const res = await fetch('http://localhost:8004/api/profiles/FavoritePosts', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickName,
          postId,
        }),
      });
  
      if (!res.ok) {
        throw new Error('Не вдалося зберегти публікацію');
      }
  
      console.log('Публікація збережена');
    } catch (error) {
      console.error('Помилка при збереженні:', error);
    }
  };
  const closeStoryModal = () => {
  setIsStoryModalOpen(false);
  setSelectedStoryForModal(null);
};
const openStoryModal = (story) => {
  setSelectedStoryForModal(story);
  setIsStoryModalOpen(true);
  
};
  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка: {error.message}</div>;

  return (
    <>
      <div className={globalstyles.back}></div>
      <div className={styles.storis}><Stories onOpenStoryModal={openStoryModal} /></div>
      <div className={styles.post}>
        {filteredPosts.map((post, index) => (
          <div key={index} className={styles.postItem}>
            <div className={styles.userInfo}>
              <Link to={`/profile/${post.creatorNickName}`} className={styles.avatarLink}>
                <img
                  src={post.creatorAvatarUrl || "default-avatar.jpg"}
                  alt={post.creatorNickName}
                  className={styles.avatar}
                />
              </Link>
              <div className={styles.nameTime}>
                <div className={styles.userName}>{post.creatorNickName}</div>
                <div className={styles.postTime}>
                  {new Date(post.createDateTime).toLocaleString()}
                  
<svg 
style={{color: 'var(--text-color)'}}
width="24" 
height="24" 
viewBox="0 0 24 24" 
fill="none" 
xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
<path d="M12 8V11.7324C12 11.8996 12.0836 12.0557 12.2226 12.1484L15 14"
 stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>

                </div>
              </div>
            </div>

            <div className={styles.postContent}>
              <img src={post.imageUrl} alt="Публікація" className={styles.postImage} />
            </div>
            {post.descriptions ? (
  <div className={styles.postDescription}>{post.descriptions}</div>
  
) : (
  <div className={styles.noDescription}>Опис не надано</div>
)}
            <div className={styles.likeitem}>
              <div className={styles.like}>
                <button
                  className={styles.likebut}
                  onClick={() => handleLike(post.postId)}
                >
                  
<svg
 style={{color: 'var(--text-color)'}}
width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.66275 13.2135L9.82377 19.7065C11.0068 20.9532 12.9932 20.9532 14.1762 19.7065L20.3372 13.2135C22.5542 10.877 22.5543 7.08882 20.3373 4.75235C18.1203 2.41588 14.5258 2.41588 12.3088 4.75235V4.75235C12.1409 4.92925 11.8591 4.92925 11.6912 4.75235V4.75235C9.47421 2.41588 5.87975 2.41588 3.66275 4.75235C1.44575 7.08883 1.44575 10.877 3.66275 13.2135Z" stroke="currentColor" stroke-width="1.5"/>
</svg>

                </button>
                <span className={styles.likeCount}>{post.likes.countLike || 0}</span>
              </div>

              <div className={styles.comment}>
                <button className={styles.commentbut} onClick={() => openCommentModal(post)}>
                
<svg
 style={{color: 'var(--text-color)'}}
width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.23903 20.0292L1.53188 19.7793H1.53188L2.23903 20.0292ZM3.77027 21.5605L4.02015 22.2676H4.02015L3.77027 21.5605ZM7.15817 20.7518L6.79451 21.4077L7.15817 20.7518ZM3.10104 16.5662L3.76804 16.2233L3.10104 16.5662ZM3.16731 17.4022L3.87446 17.6521L3.16731 17.4022ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM3.76804 16.2233C3.11751 14.9581 2.75 13.523 2.75 12H1.25C1.25 13.7671 1.67697 15.4367 2.43404 16.9092L3.76804 16.2233ZM2.94618 20.2791L3.87446 17.6521L2.46016 17.1523L1.53188 19.7793L2.94618 20.2791ZM3.52039 20.8533C3.16372 20.9793 2.82014 20.6358 2.94618 20.2791L1.53188 19.7793C0.985728 21.3249 2.47455 22.8138 4.02015 22.2676L3.52039 20.8533ZM6.04298 19.9619L3.52039 20.8533L4.02015 22.2676L6.54274 21.3762L6.04298 19.9619ZM12 21.25C10.3739 21.25 8.84798 20.8311 7.52184 20.0958L6.79451 21.4077C8.33751 22.2632 10.113 22.75 12 22.75V21.25ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 2.75C17.1086 2.75 21.25 6.89137 21.25 12H22.75C22.75 6.06294 17.9371 1.25 12 1.25V2.75ZM6.54274 21.3762C6.60823 21.3531 6.7001 21.3554 6.79451 21.4077L7.52184 20.0958C7.08623 19.8543 6.54889 19.7832 6.04298 19.9619L6.54274 21.3762ZM2.43404 16.9092C2.4814 17.0013 2.48243 17.0893 2.46016 17.1523L3.87446 17.6521C4.04633 17.1657 3.98714 16.6494 3.76804 16.2233L2.43404 16.9092Z" fill="currentColor"/>
<circle cx="7.0498" cy="12.0498" r="1.25" fill="currentColor"/>
<circle cx="12.0498" cy="12.0498" r="1.25" fill="currentColor"/>
<circle cx="17.0498" cy="12.0498" r="1.25" fill="currentColor"/>
</svg>

                </button>
              </div>
              <div className={styles.save}>
              <button  className={styles.savebut} onClick={() => savePost(post.postId, currentUserNickname)}>
                
<svg
style={{color: 'var(--text-color)'}} 
width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 7C5 4.79086 6.79086 3 9 3H15C17.2091 3 19 4.79086 19 7V20.1683C19 20.9595 18.1248 21.4373 17.4592 21.0095L13.0815 18.1953C12.4227 17.7717 11.5773 17.7717 10.9185 18.1953L6.54076 21.0095C5.87525 21.4373 5 20.9595 5 20.1683V7Z" stroke="currentColor" stroke-width="1.5"/>
<path d="M9 8.5H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

              </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && activePost && (
        <div className={styles.modalOverlay} onClick={() => setModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img src={activePost.imageUrl} alt="Фото" className={styles.modalImage} />
            {activePost.description && (
              <div className={styles.fotodescription}>{activePost.description}</div>
            )}

            <div className={styles.commentsSection}>
              <div className={styles.commentsList}>
                {activePost.comments?.map((comment, idx) => (
                  <div key={idx} className={styles.commentItem}>
                    <span className={styles.commentsName}>{comment.comentatorNickName}:</span>{" "}
                    {comment.notes}
                  </div>
                ))}
              </div>

              <div className={styles.commentInput}>
                <input
                  type="text"
                  placeholder="Напишіть коментар..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={handleCommentSubmit}>Відправити</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isStoryModalOpen && selectedStoryForModal && (
  <div className={styles.modalOverlay} onClick={closeStoryModal}>
    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
      
      <img src={selectedStoryForModal.storyImageUrl} alt="Сторіс" className={styles.modalImage} />
    </div>
  </div>
)}
    </>
  );
};

export default MainPage;
