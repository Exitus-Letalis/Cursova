import React, { useEffect, useState } from "react";
import styles from "./profile.module.scss";
import axios from "axios";



const Profile = () => {
    
  const [activeTab, setActiveTab] = useState("publications"); // Стан активної вкладки
  const [savedPhotos, setSavedPhotos] = useState([]); // Масив для збережених фото

  const [photos, setPhotos] = useState([]);// Масив для публікацій

  useEffect(() => {
    // Генеруємо 12 рандомних фото
    const randomPhotos = Array.from({ length: 40 }, () => "https://picsum.photos/300");
    setPhotos(randomPhotos);
  }, []);


  useEffect(() => {
    // Запит на сервер для отримання збережених фото (тільки при першому завантаженні)
    axios.get("http://localhost:5000/saved-photos")
      .then((response) => setSavedPhotos(response.data))
      .catch((error) => console.error("Помилка завантаження збережених фото:", error));
  }, []);


  /*const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/photos") // Запит до сервера
      .then((response) => setPhotos(response.data))
      .catch((error) => console.error("Помилка завантаження фото:", error));
  }, []);

  


  {photos.map((photo, index) => (
                <img key={index} src={photo.image_url} alt="Фото" className={styles.image} />
              ))}
*/
const handleTabChange = (tab) => {
  setActiveTab(tab);
};

  return (
    <div className={styles.body}>
      <div className={styles.mainlayers}>
        <div className={styles.upimage}></div>
        <div className={styles.maininfo}>
          <div className={styles.avatar}></div>
          <div className={styles.information}>
            <div className={styles.name}>@Slavedick</div>
            <div className={styles.infor}>Kalush</div>
          </div> 
        </div>
        <div className={styles.redagbutton}>
          <div className={styles.buttonredagpros}>Редагувати профіль</div>
          <div className={styles.buttonlook}>Переглянути архів</div>
        </div>
        <div className={styles.likeinform}>
          <div>100 Публікацій</div>
          <div>100 Підписників</div>
          <div>100 Підписок</div>
          </div>
        <div className={styles.prof}>
          <div className={styles.public}>
            <div className={styles.savepublbut}>
              <div  className={`${styles.publication} ${activeTab === "publications" ? styles.activeTab : ""}`}
                onClick={() => handleTabChange("publications")}>
                Публікації
                </div>
              <div className={`${styles.saves} ${activeTab === "saves" ? styles.activeTab : ""}`}
                onClick={() => handleTabChange("saves")}>
                  Збережене
                  </div>
            </div>
            <div className={styles.foto}>
            {activeTab === "publications" ? (
                photos.length > 0 ? (
                  photos.map((photo, index) => (
                    <img key={index} src={photo} alt="Фото" className={styles.image} />
                  ))
                ) : (
                  <p>Завантаження фото...</p>
                )
              ) : (
                savedPhotos.length > 0 ? (
                  savedPhotos.map((photo, index) => (
                    <img key={index} src={photo} alt="Збережене фото" className={styles.image} />
                  ))
                ) : (
                  <p>Немає збережених фото</p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
