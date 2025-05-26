import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const fetchPostsForSubscriptions = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Користувач не авторизований");
  
    const decoded = jwtDecode(token);
    const myNickName = decoded.NickName || decoded.nickname;
    if (!myNickName) throw new Error("Нікнейм не знайдено в токені");
  
    const subscriptionsRes = await axios.get(`http://localhost:8010/api/users/${myNickName}`);
    const subscriptions = subscriptionsRes.data.subscriptions || [];
  
    if (subscriptions.length === 0) return [];
  
    const allPosts = await Promise.all(
      subscriptions.map(async (nick) => {
        try {
          const userPostsRes = await axios.get(`http://localhost:8002/api/users/${nick}/posts`);
          const userPosts = userPostsRes.data || [];
  
          const detailedPosts = await Promise.all(
            userPosts.map(async (post) => {
              try {
                const postRes = await axios.get(`http://localhost:8002/api/posts/${post.postId}`);
                const postData = postRes.data;
            
                const userProfileRes = await axios.get(`http://localhost:8010/api/users/${postData.creatorNickName}`);
                const avatarUrl = userProfileRes.data.imageUrl || 'default-avatar.jpg';
                return {
                  ...postData,
                  creatorAvatarUrl: avatarUrl,
                  descriptions: postData.descriptions , 
                };
                
              } catch (error) {
                
                console.error("Помилка при обробці поста:", error);
                return null;
              }
            })
          );
  
          return detailedPosts.filter(Boolean);
        } catch (error) {
          console.error(`Помилка при отриманні постів для ${nick}:`, error);
          return [];
        }
      })
    );
  
    return allPosts.flat();
  };
  