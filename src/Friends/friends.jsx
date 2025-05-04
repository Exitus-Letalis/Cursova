import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"; // ⬅️ додано
import globalstyles from "../style/allstyle.module.scss";
import styles from "./friends.module.scss";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // ⬅️ додано

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Користувач не авторизований");

        const decoded = jwtDecode(token);
        const myNickName = decoded.NickName || decoded.nickname;
        if (!myNickName) throw new Error("Нікнейм не знайдено в токені");

        const userRes = await fetch(`http://localhost:8010/api/users/${myNickName}`);
        if (!userRes.ok) throw new Error("Не вдалося отримати дані користувача");
        const user = await userRes.json();

        const subscriptions = user.subscriptions || [];
        const subscribers = user.subscribers || [];

        const mutualNicknames = subscriptions.filter(nick => subscribers.includes(nick));

        const mutualFriendsData = await Promise.all(
          mutualNicknames.map(async (nick) => {
            try {
              const res = await fetch(`http://localhost:8010/api/users/${nick}`);
              if (!res.ok) return null;
              return await res.json();
            } catch {
              return null;
            }
          })
        );

        const validFriends = mutualFriendsData.filter(Boolean);
        setFriends(validFriends);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  const handleRemoveFriend = async (friendNickName) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Користувач не авторизований");

      const decoded = jwtDecode(token);
      const myNickName = decoded.NickName || decoded.nickname;
      if (!myNickName) throw new Error("Нікнейм не знайдено в токені");

      const response = await fetch("http://localhost:8004/api/users/unsubscribe", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          currentNickName: myNickName,
          targetNickName: friendNickName
        })
      });

      if (!response.ok) throw new Error("Не вдалося відписатись від користувача");

      setFriends(prev => prev.filter(f => f.nickName !== friendNickName));
    } catch (err) {
      setError(err.message);
    }
  };

  const filtered = friends.filter(friend =>
    friend.nickName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            ) : filtered.length === 0 ? (
              <p className={styles.emptyText}>У вас ще немає друзів</p>
            ) : (
              <div className={styles.friendslist}>
                {filtered.map((friend, index) => (
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
                        onClick={() => navigate(`/profile/${friend.nickName}`)} // ⬅️ переадресація
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
