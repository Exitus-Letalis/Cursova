import React, { useRef, useState } from "react";
import globalstyles from "../style/allstyle.module.scss";
import styles from "./RedagProf.module.scss";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const RedagProf = () => {
  const fileInputRef = useRef();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const nickFromToken = decodedToken.NickName;

  const [profile, setProfile] = useState({
    nickName: nickFromToken,
    description: "",
    imageUrl: "",
    birthDate: "",
  });

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = async (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        const formData = new FormData();
        formData.append("FileUrl", file);

        try {
          const { data } = await axios.post("http://localhost:8001/api/file-manager", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          setProfile((prev) => ({
            ...prev,
            imageUrl: `http://localhost:8001/Resources/${data.fileUrl}`,
          }));
        } catch (error) {
          alert("Помилка завантаження фото");
        }
      }
    } else {
      setProfile((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    const updatedProfile = {
      nickName: profile.nickName,
      imageUrl: profile.imageUrl,
      birthDate: profile.birthDate,
      description: profile.description,
    };

    try {
      const response = await axios.patch("http://localhost:8004/api/profiles", updatedProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert("Профіль оновлено!");
      setProfile((prev) => ({
        ...prev,
        ...updatedProfile,
      }));
    } catch (err) {
      alert("Не вдалося оновити профіль");
    }
  };

  return (
    <>
      <div className={globalstyles.back}></div>
      <div className={styles.body}>
        <div className={styles.mainlayers}>
          <div className={styles.settingtext}>
            <div className={styles.formBlock}>
              <h2>Редагування профілю</h2>

              <label>Змінити фото:</label>
              <div className={styles.foto} onClick={handleDivClick}>
                {profile.imageUrl ? (
                  <img
                    src={profile.imageUrl}
                    alt="завантажене фото"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  "Натисніть для вибору зображення"
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleChange}
              />

              <label>Нікнейм:</label>
              <input
                name="nickName"
                value={profile.nickName}
                className={styles.input}
                disabled
              />

              <label>Опис:</label>
              <textarea
                name="description"
                value={profile.description}
                onChange={handleChange}
                className={styles.textarea}
                placeholder="До 40 символів"
              />

              <label>Дата народження:</label>
              <input
                type="date"
                name="birthDate"
                value={profile.birthDate}
                onChange={handleChange}
                className={styles.input}
              />

              <button className={styles.saveButton} onClick={handleSubmit}>
                Зберегти зміни
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RedagProf;
