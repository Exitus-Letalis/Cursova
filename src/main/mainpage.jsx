import React from "react";
import styles from './mainstyle.module.scss';
import globalstyles from "../style/allstyle.module.scss";
import Stories from "./storis";
import Tem from "../style/stylecolor";

const Main= () =>{



return(
    <>
     <div className={globalstyles.back}></div> {/* Фон буде окремим елементом */}
    <div className={styles.body}>
        <div className={styles.mainlayers}>
            <Stories/>
            <div className={styles.post}>Місце для посту(включно коментарі,аватарки...)

            </div>
        </div>
        
    </div>
</>
)



}






export default Main;