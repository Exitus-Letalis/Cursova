import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import globalstyles from "../style/allstyle.module.scss";
import styles from "./message.module.scss";

const Message = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Користувач не авторизований");

        const decoded = jwtDecode(token);
        const myNickName = decoded.NickName || decoded.nickname;
        if (!myNickName) throw new Error("Нікнейм не знайдено в токені");

        const res = await fetch(`http://localhost:8010/api/users/${myNickName}`);
        if (!res.ok) throw new Error("Не вдалося отримати дані користувача");

        const user = await res.json();
        const subscriptions = user.subscriptions || [];
        const subscribers = user.subscribers || [];

        const mutuals = subscriptions.filter(n => subscribers.includes(n));

        const mutualFriendsData = await Promise.all(
          mutuals.map(async (nick) => {
            try {
              const res = await fetch(`http://localhost:8010/api/users/${nick}`);
              if (!res.ok) return null;
              const data = await res.json();
              return {
                id: nick,
                name: nick,
                photo: data.imageUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                message: "Останнє повідомлення тут (тимчасове)"
              };
            } catch {
              return null;
            }
          })
        );

        setFriends(mutualFriendsData.filter(Boolean));
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  return (
    <>
      <div className={globalstyles.back}></div>
      <div className={styles.body}>
        <div className={styles.mainlayers}>
          <div className={styles.settingtext}>
            <div className={styles.friendslist}>
              {loading ? (
                <p>Завантаження...</p>
              ) : friends.length === 0 ? (
                <div className={styles.emptyState}>
                  <img src="/images/empty-messages.png" alt="Немає повідомлень" />
                  <p>У вас ще немає повідомлень</p>
                  <button onClick={() => alert("Знайдіть друзів, щоб написати повідомлення!")}>
                    Знайти друзів
                  </button>
                </div>
              ) : (
                friends.map((friend) => (
                  <div key={friend.id} className={styles.friends}>
                    <div className={styles.friendsfoto}>
                      <img
                        src={friend.photo}
                        alt={friend.name}
                        style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                      />
                    </div>
                    <div className={styles.Nickname}>{friend.name}</div>
                    <div className={styles.friendsmeesage}>{friend.message}</div>
                    <div className={styles.mainbuttons}>
                      <button className={styles.buttons}>Повідомлення</button>
                      <button className={styles.buttons}>Профіль</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
