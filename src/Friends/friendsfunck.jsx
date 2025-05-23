import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const useFriends = () => {
  const [friends, setFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const filteredFriends = friends.filter(friend =>
    friend.nickName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    friends: filteredFriends,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    handleRemoveFriend,
  };
};
