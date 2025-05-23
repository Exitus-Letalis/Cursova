import React from "react";
import { useNavigate } from "react-router-dom";
import globalstyles from "../style/allstyle.module.scss";
import styles from "./friends.module.scss";
import { useFriends } from "./friendsfunck";

const Friends = () => {
  const {
    friends,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    handleRemoveFriend,
  } = useFriends();

  const navigate = useNavigate();

  return (
    <>
      <div className={globalstyles.back}></div>
      <div className={styles.body}>
        <div className={styles.mainlayers}>
          <div className={styles.settingtext}>
            <div className={styles.friendsearch}>
              <input
                className={styles.search}
                type="text"
                placeholder="Пошук"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {loading ? (
              <p className={styles.emptyText}>Завантаження...</p>
            ) : error ? (
              <p className={styles.emptyText}>{error}</p>
            ) : friends.length === 0 ? (
              <p className={styles.emptyText}>У вас ще немає друзів</p>
            ) : (
              <div className={styles.friendslist}>
                {friends.map((friend, index) => (
                  <div key={index} className={styles.friends}>
                    <div className={styles.friendsfoto}>
                      <img
                        src={friend.imageUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                        alt={friend.nickName}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          objectFit: "cover"
                        }}
                      />
                    </div>
                    <div className={styles.Nickname}>{friend.nickName}</div>
                    <div className={styles.friendsmeesage}>{friend.email}</div>
                    <div className={styles.mainbuttons}>
                      <button className={styles.buttons}>Повідомлення</button>
                      <button
                        className={styles.buttons}
                        onClick={() => navigate(`/profile/${friend.nickName}`)}
                      >
                        Профіль
                      </button>
                      <button
                        className={styles.buttons}
                        onClick={() => handleRemoveFriend(friend.nickName)}
                      >
                        Видалити
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Friends;
