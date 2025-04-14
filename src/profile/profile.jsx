import React, { useEffect, useState } from "react";
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
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const nickName =decodedToken.NickName;
  console.log(nickName);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Токен не знайдено");
          return;
        }

      
        console.log(nickName);
        const profileUrl = `http://localhost:7777/api/profiles/${nickName}`;

        const response = await axios.get(profileUrl);
        setProfileData(response.data);
        console.log("Отримано дані профілю:", response.data);
      } catch (error) {
        console.error("Виникла помилка запиту:", error);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:5010/api/users/${nickName}/posts`);
        alert("Grats");
        console.log(response)
        setPhotos(response.data || []);
      } catch (error) {
        console.error("Помилка при отриманні постів:", error);
      } finally {
        setLoading(false); // Завантаження завершується незалежно від результату
      }
    };

    fetchPosts();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (loading || !profileData) return <p>Завантаження...</p>;

  return (
    <>
      <div className={globalstyles.back}></div>
      <div className={styles.body}>
        <div className={styles.mainlayers}>
          <div className={styles.upimage}></div>
          <div className={styles.maininfo}>
            <div className={styles.avatar}>
              <img
                src={profileData?.imageUrl}
                alt="Avatar"
                className={styles.avatarImage}
              />
            </div>
            <div className={styles.information}>
              <div className={styles.name}>{profileData?.nickName}</div>
              <div className={styles.infor}>{profileData?.description}</div>
            </div>
          </div>
          <div className={styles.redagbutton}>
            <div className={styles.buttonredagpros}>Редагувати профіль</div>
            <div className={styles.buttonlook}>Переглянути архів</div>
          </div>
          <div className={styles.likeinform}>
            <div>{profileData?.posts?.length || 0} Публікацій</div>
            <div>{profileData?.subscribers?.length || 0} Підписників</div>
            <div>{profileData?.subscriptions?.length || 0} Підписок</div>
          </div>
          <div className={styles.prof}>
            <div className={styles.public}>
              <div className={styles.savepublbut}>
                <div
                  className={`${styles.publication} ${
                    activeTab === "publications" ? styles.activeTab : ""
                  }`}
                  onClick={() => handleTabChange("publications")}
                >
                  Публікації
                </div>
                <div
                  className={`${styles.saves} ${
                    activeTab === "saves" ? styles.activeTab : ""
                  }`}
                  onClick={() => handleTabChange("saves")}
                >
                  Збережене
                </div>
              </div>
              <div className={styles.foto}>
                {activeTab === "publications" ? (
                  photos.length > 0 ? (
                    photos.map((post, index) => (
                      <div key={index} className={styles.postItem}>
                        {post.imageUrl ? (
                          <>
                            <img
                              src={post.imageUrl}
                              alt="Публікація"
                              className={styles.image}
                            />
                            <p className={styles.postId}>ID: {post.postId}</p>
                          </>
                        ) : (
                          <p>{post.title || "Без назви"}</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>Додайте фото</p>
                  )
                ) : savedPhotos.length > 0 ? (
                  savedPhotos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt="Збережене фото"
                      className={styles.image}
                    />
                  ))
                ) : (
                  <p>Немає збережених фото</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
