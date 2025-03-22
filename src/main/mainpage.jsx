import React from "react";
import styles from './mainstyle.module.scss';
import Tem from "../style/stylecolor";

const Main= () =>{



return(
    <div className={styles.body}>
        
        <div className={styles.mainlayers}>
            
            <div className={styles.storis}> Тут будуть знаходитись сторіс   </div>
            <div className={styles.post}>Місце для посту(включно коментарі,аватарки...)

            </div>
        </div>
        
    </div>

)



}






export default Main;