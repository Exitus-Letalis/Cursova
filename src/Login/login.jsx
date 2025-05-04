import React, { useState, useEffect } from "react";
import styles from "./log.module.scss"; // Стилі для Log компонента
import lock from "./lock.png";
import user from "./user.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Log = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [userDataregis, setUserDataregis] = useState({ nickName: "", email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false); // Стейт для чекбокса
  const navigate = useNavigate();

  // Перевірка при завантаженні, чи є токен у localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/mainpage"); // Якщо токен є, перенаправляємо на головну сторінку
    }
  }, [navigate]);

  // Обробник змін для форми логіну
  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Обробник змін для форми реєстрації
  const handleChangeRegis = (e) => {
    const { name, value } = e.target;
    setUserDataregis((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Обробник для чекбокса "Запам'ятати мене"
  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  // Обробка форми реєстрації
  const handleRegisSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8010/api/auth/register', userDataregis)
      .then((res) => {
        console.log('Успішно:', res.data);
        alert("Успішна тестова реєстрація");
        localStorage.setItem("token", res.data.token);
        navigate("/mainpage");
      })
      .catch((err) => {
        console.error("Помилка реєстрації", err);
        alert("Помилка тестової реєстрації");
      });
  };

  // Обробка форми логіну
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8010/api/auth/login', userData)
      .then((res) => {
        console.log('Успішно:', res.data);
        alert("Успішний тестовий логін");
        if (rememberMe) {
          localStorage.setItem("token", res.data.token);
        }
        navigate("/mainpage");
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
    <div className={styles.Body}>
      {/* Форма логіну */}
      <form className={styles.Wrap} onSubmit={handleLoginSubmit}>
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
          <img className={styles.userpng} src={user} />
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
          <img className={styles.lockpng} src={lock} />
        </div>
        <div className={styles.remember}>
          <label className={styles.label}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            Запам'ятати мене
          </label>
          <a className={styles.a} href="#">
            Забули пароль?
          </a>
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

      {/* Модальне вікно для реєстрації */}
      {isModalVisible && (
        <div className={styles.modal2}>
          <div className={styles.modalContent2}>
            <h1 className={styles.h1}>CutieGram</h1>
            {/* Кнопка для закриття */}
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
