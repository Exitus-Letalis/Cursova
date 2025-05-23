import React from "react";
import globalstyles from "../style/allstyle.module.scss";
import styles from "./createpost.module.scss";
import { useCreatePost } from "./createpostfunck";

const Createpost = () => {
  const {
    post,
    fileInputRef,
    handleChange,
    onSubmit,
    handleDivClick,
  } = useCreatePost();

  return (
    <>
      <div className={globalstyles.back}></div>
      <div className={styles.body}>
        <div className={styles.mainlayers}>
          <div className={styles.settingtext}>
            <div className={styles.createstoris}>
              Створення допису
              <div className={styles.foto} onClick={handleDivClick}>
                {post.imageUrl ? (
                  <img
                    src={post.imageUrl}
                    alt="завантажене фото"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
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
              <div className={styles.text}>
                <input
                  className={styles.description}
                  type="text"
                  placeholder="Додайте опис(до 30 символів)"
                  value={post.description}
                  onChange={handleChange}
                  name="description"
                />
              </div>
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

export default Createpost;