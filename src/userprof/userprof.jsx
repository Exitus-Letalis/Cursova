import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import styles from "./userprof.module.scss";
import globalstyles from "../style/allstyle.module.scss";

const UserProfile = () => {
  const { nickName } = useParams();
  const [friends, setFriends] = useState([]);
  const [userData, setUserData] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
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

        setFriends(profileRes.data.subscriptions);

        // 🔁 normalize postId → id
        const normalizedData = postsRes.data.map(post => ({
          ...post,
          id: post.postId,
        }));
        setPhotos(normalizedData);

        const token = localStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode(token);
          const myNickName = decoded.NickName || decoded.nickname;
          setIsSubscribed(profileRes.data.subscribers.some(sub => sub.nickName === myNickName));
        }
      } catch (error) {
        console.error("Помилка при отриманні даних:", error);
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

      await axios.patch(
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

      setFriends((prev) => [...prev, userData]);
      setIsSubscribed(true);
    } catch (err) {
      setError(err.message);
      console.error("Помилка:", err);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Користувач не авторизований");

      const decoded = jwtDecode(token);
      const myNickName = decoded.NickName || decoded.nickname;
      if (!myNickName) throw new Error("Нікнейм не знайдено в токені");

      await axios.patch(
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

      setFriends((prev) => prev.filter(friend => friend.nickName !== nickName));
      setIsSubscribed(false);
    } catch (err) {
      setError(err.message);
      console.error("Помилка:", err);
    }
  };

  const openModal = async (post) => {
    try {
      if (!post?.id) {
        console.error("Пост не має ID");
        return;
      }

      const response = await axios.get(`http://localhost:8002/api/posts/${post.id}`);
      
      // ✅ Додаємо ID вручну
      setSelectedPost({
        ...response.data,
        id: post.id,
      });

      setNewComment("");
    } catch (err) {
      console.error("Помилка при завантаженні поста:", err);
      setError("Не вдалося завантажити повну інформацію про пост.");
    }
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Користувач не авторизований");
  
      const decoded = jwtDecode(token);
      const myNickName = decoded.NickName || decoded.nickname;
      if (!myNickName) throw new Error("Нікнейм не знайдено в токені");
  
      if (!selectedPost || !selectedPost.id) {
        throw new Error("Не вдалося отримати ID поста");
      }
  
      const userHasLiked = selectedPost?.likes?.likers?.includes(myNickName); // 🔍 перевірка
  
      const endpoint = userHasLiked
        ? "http://localhost:8002/api/posts/unlike"
        : "http://localhost:8002/api/posts";
  
      await axios.patch(
        endpoint,
        {
          postId: selectedPost.id,
          nickName: myNickName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const updatedPostRes = await axios.get(
        `http://localhost:8002/api/posts/${selectedPost.id}`
      );
      
      // Зберігаємо ID вручну
      setSelectedPost({
        ...updatedPostRes.data,
        id: selectedPost.id,
      });
  
    } catch (err) {
      setError(err.message);
      console.error("Помилка при обробці лайку:", err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Користувач не авторизований");

      const decoded = jwtDecode(token);
      const myNickName = decoded.NickName || decoded.nickname;
      if (!myNickName) throw new Error("Нікнейм не знайдено в токені");

      if (!selectedPost?.id) throw new Error("Пост не вибрано");

      // Відправляємо коментар на сервер
      await axios.patch(
        "http://localhost:8002/api/posts/addcomments",
        {
          postId: selectedPost.id,
          description: newComment,
          nickName: myNickName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Після успішного додавання — оновлюємо пост
      const updatedPostRes = await axios.get(
        `http://localhost:8002/api/posts/${selectedPost.id}`
      );

      setSelectedPost(updatedPostRes.data);
      setNewComment("");
    } catch (err) {
      setError(err.message);
      console.error("Помилка при додаванні коментаря:", err);
    }
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
              <div className={styles.buttonredagpros}>Повідомлення</div>
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
                  <div key={index} className={styles.postItem} onClick={() => openModal(post)}>
                    {post.imageUrl && (
                      <img
                        src={post.imageUrl}
                        alt="Публікація"
                        className={styles.image}
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
              <button onClick={handleLike} className={styles.modalActionslike}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.66275 13.2135L9.82377 19.7065C11.0068 20.9532 12.9932 20.9532 14.1762 19.7065L20.3372 13.2135C22.5542 10.877 22.5543 7.08882 20.3373 4.75235C18.1203 2.41588 14.5258 2.41588 12.3088 4.75235V4.75235C12.1409 4.92925 11.8591 4.92925 11.6912 4.75235V4.75235C9.47421 2.41588 5.87975 2.41588 3.66275 4.75235C1.44575 7.08883 1.44575 10.877 3.66275 13.2135Z" stroke="white" strokeWidth="1.5"/>
                </svg>
                {selectedPost?.likes?.countLike || 0}
              </button>
              <button>save
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 7C5 4.79086 6.79086 3 9 3H15C17.2091 3 19 4.79086 19 7V20.1683C19 20.9595 18.1248 21.4373 17.4592 21.0095L13.0815 18.1953C12.4227 17.7717 11.5773 17.7717 10.9185 18.1953L6.54076 21.0095C5.87525 21.4373 5 20.9595 5 20.1683V7Z" stroke="white" strokeWidth="1.5"/>
                  <path d="M9 8.5H15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className={styles.fotodescription}>{selectedPost?.descriptions || "Опис відсутній"}</div>
            <div className={styles.commentsSection}>
              <h4 className={styles.commentsName}>Коментарі</h4>

              <div className={styles.commentsList}>
                {(selectedPost.comments || []).map((c, i) => (
                  <div key={i} className={styles.commentItem}>
                    <strong>{c.comentatorNickName || "Без імені"}:</strong> {c.notes || "Без коментаря"}
                  </div>
                ))}
              </div>
              <div className={styles.commentInput}>
                <input
                  type="text"
                  placeholder="Ваш коментар..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
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
