import React,{useState} from 'react';

import cn from 'classnames';
import styles from './index.module.scss';
import { Log } from './Login/login';
import { Reg } from  './Regis/reg'

export function Auth() {

    const [LoginorRegis, setIsLogin] = useState({
        LoginorRegis:true,
    });
  return (
    <section
      className={cn(styles.loginSection,  'login')}>

      <div className={styles.loginContainer}>
        <div className={styles.loginForm}>
          <div className={styles.formWrapper}>
            <div className={styles.formHeader}>
              <nav className={styles.tabsContainer}>
                <p className={LoginorRegis?styles.loginTab: styles.registrationTab}onClick={()=> setIsLogin(false)} disabled={!LoginorRegis}>Вхід</p>
                <p className={LoginorRegis?styles.registrationTab: styles.loginTab}onClick={()=> setIsLogin(true)} disabled={LoginorRegis}>Реєстрація</p>
              </nav>
              <div className={styles.tabDivider} />
            </div>
            {!LoginorRegis?(<Log/>):(<Reg/>)}
          </div>

          <p className={styles.passwordRecovery_box}>
            <span className={styles.passwordRecovery}>
              <span className={styles.passwordRecovery_span0}>Забули пароль? </span>
              <span className={styles.passwordRecovery_span1}>Відновити</span>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

