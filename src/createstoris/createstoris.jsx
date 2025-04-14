import React, { useRef, useState } from "react";
import globalstyles from "../style/allstyle.module.scss";
import styles from "./createstoris.module.scss";
import axios from "axios";

const Createstoris = () => {
  const [photo, setPhoto] = useState(null);
  const [prew, setPrew] = useState(null);
  const[description, setDescription] = useState(null);
  const fileInputRef = useRef(null);

  const upPhoto = async()=>{
    if (!photo || !description) return;

    const formData = new FormData();
    formData.append("imageUrl", photo); 
    formData.append("description", description);
    try{
        const response = await axios.post("Вставати АПІ", formData);

        console.log("Надіслано", response.data);}
        catch(er){
            console.error("Помилка", er);
        }
  };
 

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setPhoto(file);
      setPrew(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className={globalstyles.back}></div>
      <div className={styles.body}>
        <div className={styles.mainlayers}>
          <div className={styles.settingtext}>
            <div className={styles.createstoris}>
                Створення допису
              <div className={styles.foto} onClick={handleDivClick}>
                {prew ? (
                  <img
                    src={prew}
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
                onChange={handleFileChange}
              />
              <div className={styles.text}>
                <input  className={styles.description}
                type="text"
                placeholder="Додайте опис"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
                </div>
                <button onClick={upPhoto} className={styles.but}>Поширити</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Createstoris;
