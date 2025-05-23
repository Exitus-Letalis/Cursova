import React from "react";
import globalstyles from "../style/allstyle.module.scss";
import styles from "./createstoriss.module.scss";
import { useCreateStory } from "./createstorisfunck";

const Createstoris = () => {
  const {
    imageUrl,
    fileInputRef,
    handleChange,
    onSubmit,
    handleDivClick,
  } = useCreateStory();

  return (
    <>
      <div className={globalstyles.back}></div>
      <div className={styles.body}>
        <div className={styles.mainlayers}>
          <div className={styles.settingtext}>
            <div className={styles.createstoris}>
              Створення сторіс
              <div className={styles.foto} onClick={handleDivClick}>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="завантажене фото"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  "Вставте фото"
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleChange}
              />
              <div className={styles.text}></div>
              <button onClick={onSubmit} className={styles.but}>
                Поширити
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Createstoris;
