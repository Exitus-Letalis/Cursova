import React, {useEffect, useState} from "react";
import globalstyles from "../style/allstyle.module.scss";
import styles from "./message.module.scss";


const Message = () =>{


    return(
        <>
        <div className={globalstyles.back}></div>
        <div className={styles.body}>
         <div className={styles.mainlayers}>
            <div className={styles.settingtext}>
                <div>пустушка</div>
            </div>
         </div>
        </div>
        </>
    );

};

export default Message;