import React, {useEffect, useState} from "react";
import globalstyles from "../style/allstyle.module.scss";
import styles from "./RedagProf.module.scss";
const Redagprof = () =>{



    ///{
  //"nickName": "string",
  //"imageUrl": "string",
  //"birthDate": "string",
 // "description": "string"
//}
    return(
        <>
        <div className={globalstyles.back}></div>
        <div className={styles.body}>
         <div className={styles.mainlayers}>
            <div className={styles.settingtext}>
                <div>Змінити фото</div>
                <div>Змінити ім'я</div>
                <div>Змінити дату народження</div>
                <div>Змінити опис</div>
            </div>
         </div>
        </div>
        </>
    );

};

export default Redagprof;