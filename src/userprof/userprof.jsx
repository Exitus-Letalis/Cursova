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
      console.error("Помилка при підписці:", err);
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
      console.error("Помилка при відписці:", err);
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
                  <div key={index} className={styles.postItem}>
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
    </>
  );
};

export default UserProfile;
