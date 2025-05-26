import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import styles from "./userprof.module.scss";
import globalstyles from "../style/allstyle.module.scss";

const UserProfile = () => {
  const { nickName } = useParams();
  const [userData, setUserData] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [profileRes, postsRes] = await Promise.all([
          axios.get(`http://localhost:8004/api/profiles/${nickName}`),
          axios.get(`http://localhost:8002/api/users/${nickName}/posts`),
        ]);
  
        setUserData({
          ...profileRes.data,
          subscribersCount: profileRes.data.subscribers.length,
          subscriptionsCount: profileRes.data.subscriptions.length,
        });

        const normalizedData = postsRes.data.map(post => ({
          ...post,
          id: post.postId,
        }));
        setPhotos(normalizedData);

        const token = localStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode(token);
          const myNickName = decoded.NickName || decoded.nickname;
          setIsSubscribed(profileRes.data.subscribers.includes(myNickName));
        }
      } catch (error) {
       // console.error("Помилка при отриманні даних:", error);
        setError(error.response ? error.response.data : "Помилка з сервером");
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, [nickName]);

  
  const handleSubscribe = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Користувач не авторизований");
  
      const decoded = jwtDecode(token);
      const myNickName = decoded.NickName || decoded.nickname;
      if (!myNickName) throw new Error("Нікнейм не знайдено в токені");

      const response = await axios.patch(
        "http://localhost:8004/api/users/subscribe",
        {
          currentNickName: myNickName,
          targetNickName: nickName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsSubscribed(true);

        setUserData((prevData) => ({
          ...prevData,
          subscribersCount: prevData.subscribersCount + 1,
        }));
      }
    } catch (err) {
      setError(err.message);
     // console.error("Помилка при підписці:", err);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Користувач не авторизований");
  
      const decoded = jwtDecode(token);
      const myNickName = decoded.NickName || decoded.nickname;
      if (!myNickName) throw new Error("Нікнейм не знайдено в токені");

      const response = await axios.patch(
        "http://localhost:8004/api/users/unsubscribe",
        {
          currentNickName: myNickName,
          targetNickName: nickName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setIsSubscribed(false);

        setUserData((prevData) => ({
          ...prevData,
          subscribersCount: prevData.subscribersCount - 1,
        }));
      }
    } catch (err) {
      setError(err.message);
    //  console.error("Помилка при відписці:", err);
    }
  };

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

    // Оновлюємо selectedPost
    setSelectedPost((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        likes: {
          countLike: isLiked
            ? prev.likes.countLike - 1
            : (prev.likes.countLike || 0) + 1,
          likesNickName: isLiked
            ? prev.likes.likesNickName.filter((nick) => nick !== myNickName)
            : [...prev.likes.likesNickName, myNickName],
        },
      };
    });

  } catch (err) {
    // console.error("Не вдалось лайкнути:", err);
  }
};
const handleCommentSubmit = async () => {
  if (!newComment.trim() || !selectedPost) return;
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Користувач не авторизований");

    const decoded = jwtDecode(token);
    const myNickName = decoded.NickName || decoded.nickname;

    await axios.patch("http://localhost:8002/api/posts/addcomments", {
      postId: selectedPost.postId,
      description: newComment,
      nickName: myNickName,
    });

    const updatedPostRes = await axios.get(`http://localhost:8002/api/posts/${selectedPost.postId}`);
    const updatedPost = updatedPostRes.data;

    setSelectedPost(updatedPost);
    setNewComment("");
  } catch (err) {
    // console.error("Не вдалось коментувати:", err);
  }
};
  const savePost = async (postId) => {
    try {
      const token = localStorage.getItem("token");
    if (!token) throw new Error("Користувач не авторизований");

    const decoded = jwtDecode(token);
    const myNickName = decoded.NickName || decoded.nickname;
      const res = await fetch('http://localhost:8004/api/profiles/FavoritePosts', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         nickName: myNickName,
          postId,
        }),
      });
  
      if (!res.ok) {
        throw new Error('Не вдалося зберегти публікацію');
      }
  
     alert('Публікація збережена');
    } catch (error) {
      //console.error('Помилка при збереженні:', error);
    }
  };

   const openModal = async (postId) => {
    try {
      const response = await axios.get(`http://localhost:8002/api/posts/${postId}`);
      setSelectedPost(response.data);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Помилка при відкритті модального вікна:", err);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };
  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>Сталася помилка: {error}</p>;

  return (
    <>
      <div className={globalstyles.back}></div>
      <div className={styles.body}>
        <div className={styles.mainlayers}>
          <div className={styles.upimage}></div>
          <div className={styles.maininfo}>
            <img
              src={userData?.imageUrl || "default-avatar.png"}
              alt="Avatar"
              className={styles.avatarImage}
            />
            <div className={styles.descriptionTitle}>Опис</div>
            <div className={styles.nickName}>@{userData?.nickName}</div>
          </div>

          {!isSubscribed && (
            <div className={styles.redagbutton}>
              <div className={styles.buttonredagpros} onClick={handleSubscribe}>
                Підписатися
              </div>
            </div>
          )}

          {isSubscribed && (
            <div className={styles.redagbutton}>
              <div className={styles.buttonredagpros} onClick={handleUnsubscribe}>
                Видалити
              </div>
            </div>
          )}

          <div className={styles.likeinform}>
            <div>{photos.length} Публікацій</div>
            <div>{userData.subscribersCount} Підписників</div>
            <div>{userData.subscriptionsCount} Підписок</div>
          </div>

          <div className={styles.prof}>
            <div className={styles.public}>
              <div className={styles.savepublbut}>
                <div className={styles.publication}>Публікації</div>
              </div>

              <div className={styles.foto}>
                {photos.map((post, index) => (
                  <div key={index} className={styles.postItem}>
                    {post.imageUrl && (
                      <img
                        src={post.imageUrl}
                        alt="Публікація"
                        className={styles.image}
                         onClick={() => openModal(post.id)}
                      />
                    )}
                  </div>
                ))}
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
                    <button onClick={() => handleLike(selectedPost.postId)} className={styles.modalActionslike}>
                    <svg
                     style={{color: 'var(--text-color)'}}
                    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.66275 13.2135L9.82377 19.7065C11.0068 20.9532 12.9932 20.9532 14.1762 19.7065L20.3372 13.2135C22.5542 10.877 22.5543 7.08882 20.3373 4.75235C18.1203 2.41588 14.5258 2.41588 12.3088 4.75235V4.75235C12.1409 4.92925 11.8591 4.92925 11.6912 4.75235V4.75235C9.47421 2.41588 5.87975 2.41588 3.66275 4.75235C1.44575 7.08883 1.44575 10.877 3.66275 13.2135Z" stroke="currentColor" stroke-width="1.5"/>
      </svg>
                      {selectedPost.likes?.countLike || 0}</button>
                     <button onClick={() => savePost(selectedPost.postId)} className={styles.modalActionsdel}>
                        <svg
style={{color: 'var(--text-color)'}} 
width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 7C5 4.79086 6.79086 3 9 3H15C17.2091 3 19 4.79086 19 7V20.1683C19 20.9595 18.1248 21.4373 17.4592 21.0095L13.0815 18.1953C12.4227 17.7717 11.5773 17.7717 10.9185 18.1953L6.54076 21.0095C5.87525 21.4373 5 20.9595 5 20.1683V7Z" stroke="currentColor" stroke-width="1.5"/>
<path d="M9 8.5H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                      </button>
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

export default UserProfile;
