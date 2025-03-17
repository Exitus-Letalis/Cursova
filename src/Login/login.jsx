import React, { useState } from 'react';

import styles from './log.module.scss';  // Стилі для Log компонента
import lock from './lock.png';
import user from './user.png';
import modal from './reg2.module.scss';
import { Link } from 'react-router-dom';



const Log = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  

  return (
    <div className={styles.Body}>
      <div className={styles.Wrap}>
        <h1 className={styles.h1}>CutieGram</h1>
       
        <div className={styles.box}>
          <input className={styles.input} type='text' placeholder='Username' required />
          <img className={styles.userpng} src={user} />
        </div>
        <div className={styles.box}>
          <input className={styles.input} type='password' placeholder='Password' required />
          <img     className={styles.lockpng} src={lock} />
        </div>
        <div className={styles.remember}>
          <label className={styles.label}><input type='checkbox' />Запам'ятати мене </label>
          <a className={styles.a} href="#">Забули пароль? </a>
        </div>
        <Link to='/mainpage'>
        <button className={styles.button} type='submit' >Увійти</button>
        </Link>
      </div>
      <div className={styles.registr}>
        <p >Не маєте аккаунту? </p> 
        <p onClick={handleModalOpen} className={styles.rega}>Зареєструватися</p>
      </div>
      
      {/* Модальне вікно */}
      {isModalVisible && (
        <div className={styles.modal2}>
          <div className={styles.modalContent2}>
          <h1 className={styles.h1}>CutieGram</h1>
            {/* Кнопка для закриття */}
            <button className={styles.close2} onClick={handleModalClose}>&times;</button>
              <form>
                <div className={styles.box}>
                  <input className={styles.input} 
                    type='text' 
                    placeholder='Username' 
                    required/>
                </div>
                <div className={styles.box}>
                  <input className={styles.input} 
                    type='password' 
                    placeholder='Password' 
                    required/>
                </div>
                <div className={styles.box}>
                  <input className={styles.input} 
                    type='Email' 
                    placeholder='Email' 
                    required/>
                </div>
                    <button className={styles.button} type='submit' >Зареєструватися</button>
              </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Log;


