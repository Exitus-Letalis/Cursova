
import globalstyles from "../style/allstyle.module.scss";
import styles from "./settings.module.scss";
import { useContext } from 'react';
import { ThemeContext } from '../style/them'; 


const Settings = () =>{
    const { theme, setTheme } = useContext(ThemeContext);

    return(
        <>
        <div className={globalstyles.back}></div>
        <div className={styles.body}>
         <div className={styles.mainlayers}>
            <div className={styles.settingtext}>
                <h1 className={styles.h1}>Змінити тему</h1>
                <div className={styles.buttons}>
            <button className={styles.button1} onClick={() => setTheme('Світла')}>Світла</button>
      <button  className={styles.button2} onClick={() => setTheme('Темна')}>Темна</button>
      <button  className={styles.button3} onClick={() => setTheme('Синя')}>Синя</button>
      <button  className={styles.button4} onClick={() => setTheme('Червона')}>Червона</button>
      </div>
      <h2 className={styles.h2}>Поточна тема: {theme}</h2>
            </div>
         </div>
        </div>
        </>
    );

};

export default Settings;