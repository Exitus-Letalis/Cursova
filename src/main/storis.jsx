import React, { useEffect, useState, useRef } from "react";
import styles from "../main/storis.module.scss";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Stories = ({ onOpenStoryModal }) => {
  const [stories, setStories] = useState([]);
  const storiesRef = useRef(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Токен не знайдено");

        const decoded = jwtDecode(token);
        const myNickName = decoded.NickName || decoded.nickname;
        if (!myNickName) throw new Error("Нікнейм не знайдено в токені");
      //  console.log("Мій нікнейм:", myNickName);

        const subscriptionsRes = await axios.get(`http://localhost:8010/api/users/${myNickName}`);
        const subscriptions = subscriptionsRes.data.subscriptions || [];
      //  console.log("Підписки:", subscriptions);

        const allStoriesDetails = [];

        for (const nick of subscriptions) {
          try {
            const userStoriesRes = await axios.get(`http://localhost:8003/api/users/${nick}/stories`);
         //   console.log("Отримані дані від API:", userStoriesRes.data);
            const storyIds = userStoriesRes.data;
          //  console.log(`Отримані storyId для ${nick}:`, storyIds);

            if (Array.isArray(storyIds)) {
              for (const storyIdObject of storyIds) {
                const actualStoryId = storyIdObject?.storyId; 
                if (!actualStoryId) {
             //     console.warn(`Недійсний ID сторіс отримано для ${nick}:`, storyIdObject);
                  continue;
                }

                try {
                  const storyDetailsRes = await axios.get(`http://localhost:8003/api/stories/${actualStoryId}`);
                  if (storyDetailsRes.data && storyDetailsRes.data.storyImageUrl) {
                    allStoriesDetails.push(storyDetailsRes.data);
                  } else {
               //     console.warn(`Не вдалося отримати деталі або немає URL для сторіс ${actualStoryId} від ${nick}:`, storyDetailsRes.data);
                  }
                } catch (err) {
              //    console.warn(`Помилка при отриманні деталей сторіс ${actualStoryId} від ${nick}:`, err.message);
                }
              }
            } else {
            //  console.warn(`Отримано недійсний формат ID сторіс для ${nick}:`, userStoriesRes.data);
            }
          } catch (error) {
          //  console.warn(`Помилка при отриманні ID сторіс для ${nick}:`, error.message);
          }
        }

       // console.log("Отримані деталі сторіс:", allStoriesDetails);
        setStories(allStoriesDetails);
      } catch (err) {
      //  console.error("Помилка при завантаженні сторіс:", err);
      }
    };

    fetchStories();
  }, []);

  const scrollLeft = () => {
    if (storiesRef.current) storiesRef.current.scrollLeft -= 200;
  };

  const scrollRight = () => {
    if (storiesRef.current) storiesRef.current.scrollLeft += 200;
  };

  const handleStoryClick = (story) => {
   // console.log("Клікнуто на сторіс:", story);
    onOpenStoryModal(story);
  };

  return (
    <div className={styles["storis-wrapper"]}>
      {stories.length > 9 && (
        <button className={`${styles["scroll-btn"]} ${styles["left"]}`} onClick={scrollLeft}>◀</button>
      )}
      <div className={styles.storis} ref={storiesRef}>
        {stories.map((story) => (
          <div key={story.storyId} className={styles.storyItem} onClick={() => handleStoryClick(story)}>
            <img
              src={story.storyImageUrl}
              alt={`Сторіс ${story.creatorNickName}`}
              className={styles.storyImg}
            />
          </div>
        ))}
      </div>
      {stories.length > 9 && (
        <button className={`${styles["scroll-btn"]} ${styles["right"]}`} onClick={scrollRight}>▶</button>
      )}
    </div>
  );
};

export default Stories;