import React, { useState, useRef, useEffect } from "react";
import styles from "./sidebar.module.scss";
import { Link } from "react-router-dom"; // Імпортуємо Link
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import{useNavigate} from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  // Перевіряємо, чи поточний маршрут один з потрібних
  const isSidebarVisible = location.pathname !== "/";
  const [rSidebar, setRSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
    const nav=useNavigate();
    const exit =()=>{
      localStorage.removeItem("token");
      nav("/");
    }

 
//Функція для відкриття бокогового пошуку
const rightSisebar=()=>{
  setRSidebarOpen(!rSidebar);
};

  // Закриває dropdown при кліку поза ним
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isSidebarVisible) return null;
  return (
    <div className={styles.body}>
      <div className={styles.name}>
        <Link to="/mainpage" className={styles.mainlink}>
          CutieGram
        </Link>
      </div>
      <div className={styles.links}>
        <NavLink
          to="/mainpage"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.activeLink}` : styles.link
          }
        >
          <button className={styles.button} type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 35 35"
              fill="none"
            >
              <path
                d="M1 16L16 1L31 16"
                stroke="white"
                stroke-width="2"
                stroke-linejoin="round"
              />
              <path
                d="M27 12V31H5V12"
                stroke="white"
                stroke-width="2"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <span className={styles.text}>Головна сторінка</span>
        </NavLink>
        <NavLink
          to="/prof"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.activeLink}` : styles.link
          }
        >
          <button className={styles.button} type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 35 25"
              fill="none"
            >
              <path
                d="M16 2C8.28 2 2 8.28 2 16C2 23.72 8.28 30 16 30C23.72 30 30 23.72 30 16C30 8.28 23.72 2 16 2ZM8.924 25.67C9.053 21.874 12.173 18.823 16 18.823C19.827 18.823 22.947 21.873 23.076 25.67C21.089 27.127 18.647 28 16 28C13.353 28 10.911 27.127 8.924 25.67ZM16 16C14.343 16 12.995 14.652 12.995 12.995C12.995 11.338 14.343 9.99 16 9.99C17.657 9.99 19.005 11.338 19.005 12.995C19.005 14.652 17.657 16 16 16ZM24.89 24.031C24.205 20.789 21.788 18.18 18.655 17.221C20.062 16.334 21.005 14.777 21.005 12.995C21.005 10.235 18.76 7.99 16 7.99C13.24 7.99 10.995 10.235 10.995 12.995C10.995 14.777 11.938 16.334 13.345 17.221C10.212 18.18 7.795 20.789 7.11 24.031C5.184 21.902 4 19.09 4 16C4 9.383 9.383 4 16 4C22.617 4 28 9.383 28 16C28 19.09 26.816 21.902 24.89 24.031Z"
                fill="white"
              />
            </svg>
          </button>
          <span className={styles.text}>Профіль</span>
        </NavLink>
        <div
          className={styles.link}
          onClick={rightSisebar} // відкриття або закриття пошуку
        >
          <button className={styles.button} type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 35 25"
              fill="none"
            >
              <path
                d="M11.9997 22.6667C17.8907 22.6667 22.6663 17.891 22.6663 12C22.6663 6.10896 17.8907 1.33333 11.9997 1.33333C6.10864 1.33333 1.33301 6.10896 1.33301 12C1.33301 17.891 6.10864 22.6667 11.9997 22.6667Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20 20L30.6667 30.6667"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <span className={styles.text} onClick={rightSisebar}>Пошук</span>
        </div>
        {/*Пошук */}
        {rSidebar &&(
          <div className={styles.rsidebar}>
            <input className={styles.rinput} placeholder="Пошук" type="text"/>
            <div className={styles.usersearch}> тут буде список користувачів які автоматично утворють список по мірі написання в пошуку</div>
          </div>
        )}
        <NavLink
          to="/message"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.activeLink}` : styles.link
          }
        >
          <button className={styles.button} type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 35 25"
              fill="none"
            >
              <path
                d="M30 4.66666H2C1.46957 4.66666 0.960859 4.87737 0.585786 5.25244C0.210714 5.62752 0 6.13622 0 6.66666L0 25.3333C0 25.8638 0.210714 26.3725 0.585786 26.7475C0.960859 27.1226 1.46957 27.3333 2 27.3333H30C30.5304 27.3333 31.0391 27.1226 31.4142 26.7475C31.7893 26.3725 32 25.8638 32 25.3333V6.66666C32 6.13622 31.7893 5.62752 31.4142 5.25244C31.0391 4.87737 30.5304 4.66666 30 4.66666ZM29.5733 5.99999L16 16.4933L2.42667 5.99999H29.5733ZM1.33333 25.06V6.83999L11.6067 14.78L1.33333 25.06ZM2.27333 26L12.6667 15.6067L15.5867 17.8667C15.7032 17.9564 15.8462 18.0051 15.9933 18.0051C16.1404 18.0051 16.2834 17.9564 16.4 17.8667L19.3333 15.6067L29.7267 26H2.27333ZM30.6667 25.06L20.3933 14.78L30.6667 6.83999V25.06Z"
                fill="white"
              />
            </svg>
          </button>
          <span className={styles.text}>Повідомлення</span>
        </NavLink>
        <NavLink
          to="/friends"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.activeLink}` : styles.link
          }
        >
          <button className={styles.button} type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 35 25"
              fill="none"
            >
              <path
                d="M16 18C18.7614 18 21 15.7614 21 13C21 10.2386 18.7614 8 16 8C13.2386 8 11 10.2386 11 13C11 15.7614 13.2386 18 16 18Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M23 28C23 26.1435 22.2625 24.363 20.9497 23.0503C19.637 21.7375 17.8565 21 16 21C14.1435 21 12.363 21.7375 11.0503 23.0503C9.7375 24.363 9 26.1435 9 28H23Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M24 14C24.8523 14 25.6904 13.7821 26.4348 13.3671C27.1792 12.9521 27.8052 12.3537 28.2533 11.6287C28.7013 10.9037 28.9566 10.0762 28.9949 9.22474C29.0333 8.37332 28.8533 7.52624 28.4721 6.76393C28.091 6.00163 27.5213 5.34941 26.8172 4.8692C26.1131 4.38899 25.2979 4.09674 24.449 4.0202C23.6002 3.94367 22.7459 4.08537 21.9672 4.43188C21.1885 4.77838 20.5114 5.31817 20 6"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M25 24H31C31 22.1435 30.2625 20.363 28.9497 19.0503C27.637 17.7375 25.8565 17 24 17"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 6C11.4886 5.31817 10.8115 4.77838 10.0328 4.43188C9.25413 4.08537 8.39981 3.94367 7.55097 4.0202C6.70213 4.09674 5.88695 4.38899 5.18283 4.8692C4.4787 5.34941 3.90902 6.00163 3.52786 6.76393C3.14671 7.52624 2.96675 8.37332 3.00505 9.22474C3.04336 10.0762 3.29867 10.9037 3.74675 11.6287C4.19482 12.3537 4.82078 12.9521 5.56518 13.3671C6.30958 13.7821 7.14772 14 8 14"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8 17C6.14348 17 4.36301 17.7375 3.05025 19.0503C1.7375 20.363 1 22.1435 1 24H7"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <span className={styles.text}>Друзі</span>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.activeLink}` : styles.link
          }
        >
          <button className={styles.button} type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 35 27"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M23.3333 14.6667H8.66667C4.98467 14.6667 2 11.682 2 8.00001C2 4.31801 4.98467 1.33334 8.66667 1.33334H23.3333C27.0147 1.33334 30 4.31801 30 8.00001C30 11.682 27.0147 14.6667 23.3333 14.6667ZM23.3333 2.66668H8.66667C5.72133 2.66668 3.33333 5.05468 3.33333 8.00001C3.33333 10.9453 5.72133 13.3333 8.66667 13.3333H23.3333C26.2787 13.3333 28.6667 10.9453 28.6667 8.00001C28.6667 5.05468 26.2787 2.66668 23.3333 2.66668ZM8.66667 12C6.458 12 4.66667 10.2093 4.66667 8.00001C4.66667 5.79134 6.458 4.00001 8.66667 4.00001C10.8753 4.00001 12.6667 5.79134 12.6667 8.00001C12.6667 10.2093 10.8753 12 8.66667 12ZM8.66667 5.33334C7.194 5.33334 6 6.52734 6 8.00001C6 9.47268 7.194 10.6667 8.66667 10.6667C10.1393 10.6667 11.3333 9.47268 11.3333 8.00001C11.3333 6.52734 10.1393 5.33334 8.66667 5.33334ZM8.66667 17.3333H23.3333C27.0147 17.3333 30 20.3187 30 24C30 27.6813 27.0147 30.6667 23.3333 30.6667H8.66667C4.98467 30.6667 2 27.6813 2 24C2 20.3187 4.98467 17.3333 8.66667 17.3333ZM8.66667 29.3333H23.3333C26.2787 29.3333 28.6667 26.9453 28.6667 24C28.6667 21.0547 26.2787 18.6667 23.3333 18.6667H8.66667C5.72133 18.6667 3.33333 21.0547 3.33333 24C3.33333 26.9453 5.72133 29.3333 8.66667 29.3333ZM23.3333 20C25.542 20 27.3333 21.7913 27.3333 24C27.3333 26.2087 25.542 28 23.3333 28C21.1247 28 19.3333 26.2087 19.3333 24C19.3333 21.7913 21.1247 20 23.3333 20ZM23.3333 26.6667C24.806 26.6667 26 25.4727 26 24C26 22.5273 24.806 21.3333 23.3333 21.3333C21.8607 21.3333 20.6667 22.5273 20.6667 24C20.6667 25.4727 21.8607 26.6667 23.3333 26.6667Z"
                fill="white"
              />
            </svg>
          </button>
          <span className={styles.text}>Налаштування</span>
        </NavLink>
        <NavLink
          to="/createstoris"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.activeLink}` : styles.link
          }
        >
          <button className={styles.button} type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 35 25"
              fill="none"
            >
              <path
                d="M23.9295 2H8.06953C7.32693 2 6.61473 2.295 6.08963 2.8201C5.56453 3.3452 5.26953 4.05739 5.26953 4.8V27.2C5.26953 27.5677 5.34196 27.9318 5.48267 28.2715C5.62338 28.6112 5.82963 28.9199 6.08963 29.1799C6.34964 29.4399 6.65831 29.6462 6.99802 29.7869C7.33773 29.9276 7.70183 30 8.06953 30H23.9295C24.2972 30 24.6613 29.9276 25.001 29.7869C25.3408 29.6462 25.6494 29.4399 25.9094 29.1799C26.1694 28.9199 26.3757 28.6112 26.5164 28.2715C26.6571 27.9318 26.7295 27.5677 26.7295 27.2V4.8C26.7295 4.4323 26.6571 4.0682 26.5164 3.72849C26.3757 3.38877 26.1694 3.08011 25.9094 2.8201C25.6494 2.5601 25.3408 2.35385 25.001 2.21314C24.6613 2.07242 24.2972 2 23.9295 2ZM24.8695 27.2C24.8669 27.4476 24.7667 27.6841 24.5907 27.8582C24.4147 28.0324 24.1771 28.13 23.9295 28.13H8.06953C7.82195 28.13 7.58436 28.0324 7.40836 27.8582C7.23236 27.6841 7.13217 27.4476 7.12953 27.2V4.8C7.13217 4.55243 7.23236 4.3159 7.40836 4.14177C7.58436 3.96765 7.82195 3.86999 8.06953 3.87H23.9295C24.1771 3.86999 24.4147 3.96765 24.5907 4.14177C24.7667 4.3159 24.8669 4.55243 24.8695 4.8V27.2Z"
                fill="white"
              />
              <path
                d="M21.4399 15.07H16.9299V10.56C16.9299 10.3134 16.8319 10.0768 16.6575 9.9024C16.4831 9.72799 16.2465 9.63 15.9999 9.63C15.7532 9.63 15.5167 9.72799 15.3423 9.9024C15.1679 10.0768 15.0699 10.3134 15.0699 10.56V15.07H10.5599C10.3132 15.07 10.0767 15.168 9.90227 15.3424C9.72786 15.5168 9.62988 15.7534 9.62988 16C9.62988 16.2467 9.72786 16.4832 9.90227 16.6576C10.0767 16.832 10.3132 16.93 10.5599 16.93H15.0699V21.44C15.0699 21.6867 15.1679 21.9232 15.3423 22.0976C15.5167 22.272 15.7532 22.37 15.9999 22.37C16.2465 22.37 16.4831 22.272 16.6575 22.0976C16.8319 21.9232 16.9299 21.6867 16.9299 21.44V16.93H21.4399C21.6865 16.93 21.9231 16.832 22.0975 16.6576C22.2719 16.4832 22.3699 16.2467 22.3699 16C22.3699 15.7534 22.2719 15.5168 22.0975 15.3424C21.9231 15.168 21.6865 15.07 21.4399 15.07Z"
                fill="white"
              />
            </svg>
          </button>
          <span className={styles.text}>Створити допис</span>
        </NavLink>
      </div>
      <div className={styles.avatarWrapper} ref={dropdownRef}>
      <div className={styles.avatar}onClick={() => setIsDropdownOpen(!isDropdownOpen)}></div>
      {isDropdownOpen && (
          <div className={styles.dropdown}>
            <ul>
              <li onClick={exit}>Вийти</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
