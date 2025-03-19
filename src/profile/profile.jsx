import React from "react";
import styles from "./profile.module.scss";

const Profile = () => {
  return (
    <div className={styles.body}>
      <div className={styles.mainlayers}>
        <div className={styles.upimage}></div>
        <div className={styles.maininfo}>
          <div className={styles.avatar}></div>
          <div className={styles.information}>
            <div className={styles.name}>@Slavedick</div>
            <div className={styles.infor}>Kalush</div>
          </div>
        </div>
        <div className={styles.redagbutton}>
          <div className={styles.buttonredagpros}>Редагувати профіль</div>
          <div className={styles.buttonlook}>Переглянути архів</div>
        </div>

        <div className={styles.prof}>
          <div className={styles.public}>
            <div className={styles.savepubl}>
              text(це верхня полоска з можливістю перемикання)
            </div>
            <div className={styles.foto}>
              Місце для фото(потрібно придумати алгоритм аби всі фото які
              додаються ставали у таблицю)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
