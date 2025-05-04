import React from "react";
import styles from './mainstyle.module.scss';
import globalstyles from "../style/allstyle.module.scss";
import Stories from "./storis";

// Масив з даними постів
const posts = [
  {
    id: 1,
    username: '60 pls',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRC05-2sH4aKb9gG57MbT8a6af2npTMhvtuRHx89glHw&s&ec=72940545',
    postTime: '2025-04-26 12:00',
    content: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRC05-2sH4aKb9gG57MbT8a6af2npTMhvtuRHx89glHw&s&ec=72940545',
  },
  {
    id: 2,
    username: 'User2',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRC05-2sH4aKb9gG57MbT8a6af2npTMhvtuRHx89glHw&s&ec=72940545',
    postTime: '2025-04-26 13:00',
    content: 'https://bigzoo.com.ua/image/cache/catalog/Zoo%20products/universal%20feed/kormovaya_krysa_mysha2-750x750-product_thumb.jpg',
  },
  {
    id: 3,
    username: 'User3',
    avatar: 'https://www.interfax.ru/ftproot/photos/photostory/2019/07/09/week4_700.jpg',
    postTime: '2025-04-26 14:00',
    content: 'https://sviymed.com/content/images/27/480x393l50nn0/unyversalnyi-nabor-superpack-yz-3-kh-voshchanok-raznykh-razmerov-84993889505560.jpg',
  },
  {
    id: 3,
    username: 'User3',
    avatar: 'https://www.interfax.ru/ftproot/photos/photostory/2019/07/09/week4_700.jpg',
    postTime: '2025-04-26 14:00',
    content: 'https://sviymed.com/content/images/27/480x393l50nn0/unyversalnyi-nabor-superpack-yz-3-kh-voshchanok-raznykh-razmerov-84993889505560.jpg',
  },
  {
    id: 3,
    username: 'User3',
    avatar: 'https://www.interfax.ru/ftproot/photos/photostory/2019/07/09/week4_700.jpg',
    postTime: '2025-04-26 14:00',
    content: 'https://lh3.googleusercontent.com/proxy/ZsKNd3lTDbVGse-h6SoPWs5kAFULBV6hHTlvQpd-DPczQhRq5rP8R78GvOMAHFDxduwVEFtS2IC-IQUCy046iYBfDc52ADa68U41Qrr0AjNhCHIPq1ULoD_6lPIRu9Q',
  },
  {
    id: 3,
    username: 'User3',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgyLyUL85-gxiqRUbQ3bJjTjqY2jcVYL294gwNXJ-K3w&s&ec=72940545',
    postTime: '2025-04-26 14:00',
    content: 'ТУТ БУДЕ ПОСТ 3',
  },
  {
    id: 3,
    username: 'User3',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgyLyUL85-gxiqRUbQ3bJjTjqY2jcVYL294gwNXJ-K3w&s&ec=72940545',
    postTime: '2025-04-26 14:00',
    content: 'ТУТ БУДЕ ПОСТ 3',
  },
  {
    id: 3,
    username: 'User3',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgyLyUL85-gxiqRUbQ3bJjTjqY2jcVYL294gwNXJ-K3w&s&ec=72940545',
    postTime: '2025-04-26 14:00',
    content: 'ТУТ БУДЕ ПОСТ 3',
  },
  {
    id: 3,
    username: 'User3',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgyLyUL85-gxiqRUbQ3bJjTjqY2jcVYL294gwNXJ-K3w&s&ec=72940545',
    postTime: '2025-04-26 14:00',
    content: 'ТУТ БУДЕ ПОСТ 3',
  },
  {
    id: 3,
    username: 'User3',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgyLyUL85-gxiqRUbQ3bJjTjqY2jcVYL294gwNXJ-K3w&s&ec=72940545',
    postTime: '2025-04-26 14:00',
    content: 'ТУТ БУДЕ ПОСТ 3',
  },
  {
    id: 3,
    username: 'User3',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_d9hhIgpdv_vGbQPrjW02t1ZfHXVEJqOO-9fe0QzMOw&s&ec=72940545',
    postTime: '2025-04-26 14:00',
    content: 'ТУТ БУДЕ ПОСТ 3',
  },
  {
    id: 3,
    username: 'User3',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_d9hhIgpdv_vGbQPrjW02t1ZfHXVEJqOO-9fe0QzMOw&s&ec=72940545',
    postTime: '2025-04-26 14:00',
    content: 'ТУТ БУДЕ ПОСТ 3',
  },
  {
    id: 3,
    username: 'User3',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_d9hhIgpdv_vGbQPrjW02t1ZfHXVEJqOO-9fe0QzMOw&s&ec=72940545',
    postTime: '2025-04-26 14:00',
    content: 'ТУТ БУДЕ ПОСТ 3',
  }
];

const Main = () => {
  return (
    <>
      <div className={globalstyles.back}></div> {/* Фон */}
      <div className={styles.main}></div>
      <div className={styles.storis}><Stories /></div>
      <div className={styles.post}>
        {/* Генерація постів безпосередньо в .post */}
        {posts.map(post => (
          <div key={post.id} className={styles.postItem}>
            <div className={styles.userInfo}>
              <img src={post.avatar} alt={post.username} className={styles.avatar} />
              <div className={styles.nameTime}>
                <div className={styles.userName}>{post.username}</div>
                <div className={styles.postTime}>{post.postTime}</div>
              </div>
            </div>
            <div className={styles.postContent}>
              <img src={post.content} alt="Публікація" className={styles.postImage}/>
            </div>
            <div className={styles.likeitem}>
              <div className={styles.like}>
                <button className={styles.likebut}>
                  
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.66275 13.2135L9.82377 19.7065C11.0068 20.9532 12.9932 20.9532 14.1762 19.7065L20.3372 13.2135C22.5542 10.877 22.5543 7.08882 20.3373 4.75235C18.1203 2.41588 14.5258 2.41588 12.3088 4.75235V4.75235C12.1409 4.92925 11.8591 4.92925 11.6912 4.75235V4.75235C9.47421 2.41588 5.87975 2.41588 3.66275 4.75235C1.44575 7.08883 1.44575 10.877 3.66275 13.2135Z" stroke="white" stroke-width="1.5"/>
</svg>

                </button>
              </div>
              <div className={styles.send}>
                <button className={styles.sendbut}>
                  
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.7232 2.75895C20.6613 2.44624 21.5538 3.33873 21.2411 4.27684L16.1845 19.4467C15.8561 20.4318 14.5163 20.5631 14.0029 19.6603L10.9078 14.2172C10.6409 13.7478 10.2522 13.3591 9.78283 13.0922L4.33973 9.99712C3.437 9.4838 3.56824 8.14394 4.55342 7.81555L19.7232 2.75895Z" stroke="white" stroke-width="1.5"/>
<path d="M12.7852 11.2144L10.7852 13.2144" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                </button>
              </div>
              <div className={styles.comment}>
                <button className={styles.commentbut}>
                  
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.23903 20.0292L1.53188 19.7793H1.53188L2.23903 20.0292ZM3.77027 21.5605L4.02015 22.2676H4.02015L3.77027 21.5605ZM7.15817 20.7518L6.79451 21.4077L7.15817 20.7518ZM3.10104 16.5662L3.76804 16.2233L3.10104 16.5662ZM3.16731 17.4022L3.87446 17.6521L3.16731 17.4022ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM3.76804 16.2233C3.11751 14.9581 2.75 13.523 2.75 12H1.25C1.25 13.7671 1.67697 15.4367 2.43404 16.9092L3.76804 16.2233ZM2.94618 20.2791L3.87446 17.6521L2.46016 17.1523L1.53188 19.7793L2.94618 20.2791ZM3.52039 20.8533C3.16372 20.9793 2.82014 20.6358 2.94618 20.2791L1.53188 19.7793C0.985728 21.3249 2.47455 22.8138 4.02015 22.2676L3.52039 20.8533ZM6.04298 19.9619L3.52039 20.8533L4.02015 22.2676L6.54274 21.3762L6.04298 19.9619ZM12 21.25C10.3739 21.25 8.84798 20.8311 7.52184 20.0958L6.79451 21.4077C8.33751 22.2632 10.113 22.75 12 22.75V21.25ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 2.75C17.1086 2.75 21.25 6.89137 21.25 12H22.75C22.75 6.06294 17.9371 1.25 12 1.25V2.75ZM6.54274 21.3762C6.60823 21.3531 6.7001 21.3554 6.79451 21.4077L7.52184 20.0958C7.08623 19.8543 6.54889 19.7832 6.04298 19.9619L6.54274 21.3762ZM2.43404 16.9092C2.4814 17.0013 2.48243 17.0893 2.46016 17.1523L3.87446 17.6521C4.04633 17.1657 3.98714 16.6494 3.76804 16.2233L2.43404 16.9092Z" fill="white"/>
<circle cx="7.05078" cy="12.0498" r="1.25" fill="white"/>
<circle cx="12.0508" cy="12.0498" r="1.25" fill="white"/>
<circle cx="17.0508" cy="12.0498" r="1.25" fill="white"/>
</svg>

                </button>
              </div>
              <div className={styles.saveitem}>
                <button className={styles.savebut}>
                  
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 7C5 4.79086 6.79086 3 9 3H15C17.2091 3 19 4.79086 19 7V20.1683C19 20.9595 18.1248 21.4373 17.4592 21.0095L13.0815 18.1953C12.4227 17.7717 11.5773 17.7717 10.9185 18.1953L6.54076 21.0095C5.87525 21.4373 5 20.9595 5 20.1683V7Z" stroke="white" stroke-width="1.5"/>
<path d="M9 8.5H15" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Main;
