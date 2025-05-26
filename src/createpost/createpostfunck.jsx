import { useRef, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const useCreatePost = () => {
  const fileInputRef = useRef();
  const [post, setPost] = useState({
    description: "",
    imageUrl: "",
    nickName: "",
  });

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  post.nickName = decodedToken.NickName;

  const navigate = useNavigate();

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      try {
        const formData = new FormData();
        const file = files[0];
        formData.append("FileUrl", file);

        const { data } = await axios.post(
          "http://localhost:8001/api/file-manager",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setPost((prev) => ({
          ...prev,
          imageUrl: `http://localhost:8001/Resources/${data.fileUrl}`,
        }));
      } catch (err) {
        alert("Помилка завантаження фотографії");
      }
    } else {
      if (name === "description" && value.length > 30) return;
      setPost((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const onSubmit = async () => {
    try {
      await axios.post("http://localhost:8002/api/posts", post);
    //  console.log("Congrats");
      navigate("/mainpage");
    } catch (err) {
      //console.warn(err);
    }
  };

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  return {
    post,
    fileInputRef,
    handleChange,
    onSubmit,
    handleDivClick,
  };
};