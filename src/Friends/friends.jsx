import React, {useEffect, useState} from "react";
import globalstyles from "../style/allstyle.module.scss";
import styles from "./friends.module.scss";


const Friends = () =>{


    return(
        <>
        <div className={globalstyles.back}></div>
        <div className={styles.body}>
         <div className={styles.mainlayers}>
            <div className={styles.settingtext}>
                <div>Тут буде список друзів</div>
            </div>
         </div>
        </div>
        </>
    );

};

export default Friends;