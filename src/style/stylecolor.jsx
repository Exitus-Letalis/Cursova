import React, { useState, useEffect } from "react";
import styles from "./tem.module.scss";

export default function Tem() {
  const [bgColor, setBgColor] = useState(() => {
    return localStorage.getItem("bgColor") || "#ffffff";
  });

  useEffect(() => {
    localStorage.setItem("bgColor", bgColor);
    document.documentElement.style.setProperty("--bg-color", bgColor); // Оновлюємо змінну для SCSS
  }, [bgColor]);

  const colors = ["#ffffff",  "#4285f4", "#9e47ff", "#000000"];

  const handleColorChange = (color) => {
    setBgColor(color);
  };

  return (
    <div className={styles.body}>
      <h1 className={styles.title}>Виберіть колір фону</h1>
      <div className={styles.colorbuttons}>
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => handleColorChange(color)}
            className={styles.colorbutton}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}
