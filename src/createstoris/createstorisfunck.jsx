import { useRef, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const useCreateStory = () => {
  const fileInputRef = useRef();
  const [imageUrl, setImageUrl] = useState("");

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const nickName = decodedToken.NickName;

  const navigate = useNavigate();

  const handleChange = async (e) => {
    const { type, files } = e.target;

    if (type === "file") {
      try {
        const formData = new FormData();
        const file = files[0];
        formData.append("FileUrl", file);

        const { data } = await axios.post("http://localhost:8001/api/file-manager", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setImageUrl(`http://localhost:8001/Resources/${data.fileUrl}`);
      } catch (err) {
        console.warn(err);
        alert("Помилка завантаження фотографії");
      }
    }
  };

  const onSubmit = async () => {
    if (!imageUrl) {
      alert("Будь ласка, додайте фото");
      return;
    }

    try {
      const payload = {
        storyImageUrl: imageUrl,
        creatorNickName: nickName,
      };

      const { data } = await axios.post("http://localhost:8003/api/stories", payload);
      console.log("Сторіс ID:", data.storiesId);
      navigate("/mainpage");
    } catch (err) {
      console.warn("Помилка при надсиланні сторіс:", err);
      alert("Не вдалося створити сторіс");
    }
  };

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  return {
    imageUrl,
    fileInputRef,
    handleChange,
    onSubmit,
    handleDivClick,
  };
};
