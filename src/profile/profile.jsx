import React from "react";
import styles from './profile.module.scss';


const Profile= () =>{



return(
    <div className={styles.body}>
        <div className={styles.mainlayers}>
            <div className={styles.upimage}></div>
            <div className={styles.avatar}></div>
                    <div className={styles.redagbutton}>
                        <div className={styles.buttonredagpros}>Редагувати профіль</div>
                        <div className={styles.buttonlook}>Переглянути архів</div>
                    </div>
            <div className={styles.prof}>
                <div className={styles.name}>Name</div>
                <div className={styles.infor}>Inform</div>
            </div>
            <div className={styles.public}>
                <div className={styles.savepubl}>
                    text
                </div>
                <div className={styles.foto}>
                    Місце для фото
                </div>
            </div>
        </div>
    </div>

)



}






export default Profile;