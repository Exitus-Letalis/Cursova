import React from 'react';
import { Link } from 'react-router-dom';
import styles from './log.module.scss';
import lock from '../lock.png';
import user from '../user.png';
 


const Log = () => {
    return (
      <div className={styles.Body}>
        <div className={styles.Wrap}>
          <h1 className={styles.h1}>CutieGram</h1>
          <div className={styles.box}>
            <input className={styles.input} type='text' placeholder='Username' required/>
            <img  className={styles.userpng} src={user}/>
          </div>
          <div className={styles.box}>
            <input className={styles.input} type='password' placeholder='Password' required/>
            <img  className={styles.lockpng} src={lock}/>
          </div>
          <div className={styles.remember}>
          <label className={styles.label}><input type='checkbox'/>Запам'ятати мене </label>
          <a  className={styles.a} href="#">Забули пароль? </a>
          </div>
          <button className={styles.button} type='submit' class="btn">Увійти</button>
        </div>
        <div className={styles.registr}>
            <p>Не маєте аккаунту? 
              <Link className={styles.rega} 
              to="/reg">
                Зареєструватися
                </Link></p>
          </div>
      </div>
    );
  };
  
  export default Log;
  