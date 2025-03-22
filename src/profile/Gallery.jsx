/*import React, { useEffect, useState } from "react";
import axios from "axios";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/photos")
      .then((response) => setPhotos(response.data))
      .catch((error) => console.error("Помилка завантаження фото:", error));
  }, []);

  return (
    <div className="gallery">
      {photos.map((photo, index) => (
        <img key={index} src={photo.image_url} alt={`Фото ${index + 1}`} />
      ))}
    </div>
  );
};

export default Gallery;
*/

