import React, { useEffect, useState, useRef } from "react";
import styles from "../main/storis.module.scss";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const storiesRef = useRef(null);

  useEffect(() => {
    // Генеруємо 25 рандомних фото
    const randomPhotos = Array.from({ length: 15 }, (_, index) => ({
      id: index,
      imageUrl: `https://picsum.photos/200/300?random=${index}`,
    }));

    setStories(randomPhotos);
  }, []);

  // Функції для прокрутки
  const scrollLeft = () => {
    if (storiesRef.current) {
      storiesRef.current.scrollLeft -= 200; // Крок прокрутки
    }
  };

  const scrollRight = () => {
    if (storiesRef.current) {
      storiesRef.current.scrollLeft += 200;
    }
  };

  return (
    <div className={styles["storis-wrapper"]}>
      {stories.length > 9 && (
        <button className={`${styles["scroll-btn"]} ${styles["left"]}`} onClick={scrollLeft}>
          ◀
        </button>
      )}

      <div className={styles.storis} ref={storiesRef}>
        {stories.map((story) => (
          <div key={story.id} className={styles.storyItem}>
            <img src={story.imageUrl} alt="Сторіс" className={styles.storyImg} />
          </div>
        ))}
      </div>
      {stories.length > 9 && (
        <button className={`${styles["scroll-btn"]} ${styles["right"]}`} onClick={scrollRight}>
          ▶
        </button>
      )}
    </div>
  );
};

export default Stories;
