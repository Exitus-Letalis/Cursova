import React, { useState, useEffect } from "react";
import styles from "./log.module.scss"; 
import lock from "./lock.png";
import user from "./user.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Log = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [userDataregis, setUserDataregis] = useState({ nickName: "", email: "", password: "" });
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/mainpage"); 
    }
  }, [navigate]);


  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 
  const handleChangeRegis = (e) => {
    const { name, value } = e.target;
    setUserDataregis((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


const handleRegisSubmit = (e) => {
  e.preventDefault();
  axios
    .post('http://localhost:8010/api/auth/register', userDataregis)
    .then((res) => {
      console.log('Відповідь сервера:', res.data); 
      const token = res.data;  
      console.log("Отриманий токен:", token);  
      if (token) {
        localStorage.setItem("token", token);  
        navigate("/mainpage");  
      } else {
        alert("Помилка: Токен не отримано");  
      }
    })
    .catch((err) => {
      console.error("Помилка реєстрації", err);
      alert("Помилка тестової реєстрації");
    });
};

const handleLoginSubmit = (e) => {
  e.preventDefault();
  axios
    .post('http://localhost:8010/api/auth/login', userData)
    .then((res) => {
      console.log('Відповідь сервера:', res.data);  // Вивести всю відповідь
      const token = res.data.token;  // Витягнути сам токен
      console.log("Отриманий токен:", token);  // Логування токену
      if (token) {
        localStorage.setItem("token", token);  // Зберегти тільки токен
        navigate("/mainpage");  // Перехід на головну сторінку
      } else {
        alert("Помилка: Токен не отримано");  // Якщо токен відсутній
      }
    })
    .catch((err) => {
      console.error("Помилка логіну", err);
      alert("Помилка входу тестового логіну");
    });
};

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  return (
    <div className={styles.bodys}>
      <form className={styles.wrap} onSubmit={handleLoginSubmit}>
        <h1 className={styles.h1}>CutieGram</h1>

        <div className={styles.box}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChangeLogin}
            value={userData.email}
            required
          />
           <svg className={styles.userpng} 
            style={{color: 'var(--text-color)'}}
            viewBox="0 0 96 96" 
            xmlns="http://www.w3.org/2000/svg">
              <path d="M69.3677,51.0059a30,30,0,1,0-42.7354,0A41.9971,41.9971,0,0,0,0,90a5.9966,5.9966,0,0,0,6,6H90a5.9966,5.9966,0,0,0,6-6A41.9971,41.9971,0,0,0,69.3677,51.0059ZM48,12A18,18,0,1,1,30,30,18.02,18.02,0,0,1,48,12ZM12.5977,84A30.0624,30.0624,0,0,1,42,60H54A30.0624,30.0624,0,0,1,83.4023,84Z"
              fill="currentColor"
              />
              
              </svg>
           </div>
        <div className={styles.box}>
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChangeLogin}
            value={userData.password}
            required
          />
          <svg 
           className={styles.lockpng}
           height="23px" version="1.1" viewBox="0 0 16 23" width="16px" 
            style={{color: 'var(--text-color)'}} >
                  <path 
                  d="M14,7 L13,7 L13,5 C13,2.2 10.8,0 8,0 C5.2,0 3,2.2 3,5 L3,7 L2,7 C0.9,7 0,7.9 0,9 L0,19 C0,20.1 0.9,21 2,21 L14,21 C15.1,21 16,20.1 16,19 L16,9 C16,7.9 15.1,7 14,7 L14,7 Z M8,16 C6.9,16 6,15.1 6,14 C6,12.9 6.9,12 8,12 C9.1,12 10,12.9 10,14 C10,15.1 9.1,16 8,16 L8,16 Z M11.1,7 L4.9,7 L4.9,5 C4.9,3.3 6.3,1.9 8,1.9 C9.7,1.9 11.1,3.3 11.1,5 L11.1,7 L11.1,7 Z" id="Shape"
                   fill="currentColor"
                  />
                  </svg>
        
        
        </div>
        <button className={styles.button} type="submit">
          Увійти
        </button>
      </form>

      <div className={styles.registr}>
        <p>Не маєте аккаунту? </p>
        <p onClick={handleModalOpen} className={styles.rega}>
          Зареєструватися
        </p>
      </div>

 
      {isModalVisible && (
        <div className={styles.modal2}>
          <div className={styles.modalContent2}>
            <h1 className={styles.h1}>CutieGram</h1>
       
            <button className={styles.close2} onClick={handleModalClose}>
              &times;
            </button>
            <form onSubmit={handleRegisSubmit}>
              <div className={styles.box}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Username"
                  name="nickName"
                  onChange={handleChangeRegis}
                  value={userDataregis.nickName}
                  required
                />
              </div>
              <div className={styles.box}>
                <input
                  className={styles.input}
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChangeRegis}
                  value={userDataregis.password}
                  required
                />
              </div>
              <div className={styles.box}>
                <input
                  className={styles.input}
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChangeRegis}
                  value={userDataregis.email}
                  required
                />
              </div>
              <button className={styles.button} type="submit">
                Зареєструватися
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Log;
