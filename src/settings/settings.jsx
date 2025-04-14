import React, {useEffect, useState} from "react";
import globalstyles from "../style/allstyle.module.scss";
import styles from "./settings.module.scss";


const Settings = () =>{


    return(
        <>
        <div className={globalstyles.back}></div>
        <div className={styles.body}>
         <div className={styles.mainlayers}>
            <div className={styles.settingtext}>
                <div>Зміна стилю</div>
            </div>
         </div>
        </div>
        </>
    );

};

export default Settings;