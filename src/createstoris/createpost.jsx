import React, { useRef, useState } from "react";
import globalstyles from "../style/allstyle.module.scss";
import styles from "./createstoris.module.scss";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Createstoris = () => {
  const fileInputRef = useRef();
  const [post ,setPost] = useState({
    description:"",
    imageUrl :"",
    nickName :""
  })
  const token = localStorage.getItem("token")
  const decodedToken = jwtDecode(token)
  post.nickName=decodedToken.NickName
  const navigate = useNavigate();

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;
  
    if (type === 'file') {
      try {
        const formData = new FormData();
        const file = files[0];
        formData.append('FileUrl', file);
  
        const { data } = await axios.post('http://localhost:8001/api/file-manager', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        setPost((prevProduct) => ({
          ...prevProduct,
          imageUrl: `http://localhost:8001/Resources/${data.fileUrl}`,
        }));
      } catch (err) {
        console.warn(err);
        alert('Помилка завантаження фотографії');
      }
    } else {
      if (name === "description" && value.length > 30) return; // обмеження
      setPost((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };
const onSubmit = async()=>{
  try{
       await axios.post('http://localhost:8002/api/posts',post)
      console.log("Congrats")
     navigate('/mainpage')
  }catch(err){
      console.warn(err)
  }
}
 

  const handleDivClick = () => {
    fileInputRef.current.click();
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
                {post.imageUrl ? (
                  <img
                    src={post.imageUrl}
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
              <div className={styles.text}>
                <input  className={styles.description}
                type="text"
                placeholder="Додайте опис(до 30 символів)"
                value={post.description}
                onChange={handleChange}
                name="description"
                />
                </div>
                <div className={styles.but}>
                <button onClick={onSubmit} >Поширити</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Createstoris;