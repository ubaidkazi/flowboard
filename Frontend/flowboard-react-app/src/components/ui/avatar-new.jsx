import { useState } from "react";
import styles from "../../styles/Avatar.module.css";

const colors = [
  "#2563eb",
  "#0dbeddb7",
  "#ea580c",
  "#9333ea",
  "#dc2626",
  "#0891b2",
];

const sizes = {
  small: 36,
  large: 48,
  xlarge: 85,
};

export default function Avatar({ fullName, userId, variant = "small" }) {
  const [imageError, setImageError] = useState(false);


  // if () {
  //   return (
  //     <div className={styles.avatar}>
  //       ?
  //     </div>
  //   );
  // }

  const imgSrc = `http://localhost:8080/user/${userId}/profile-picture`;


  const initials = fullName
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const backgroundColor = colors[userId % colors.length];

  const dimension = sizes[variant];

  const imageStyle = {
    width: dimension,
    height: dimension,
    backgroundColor,
  };

  if (userId && !imageError) {
    return (
      <img
        src={imgSrc}
        alt={fullName}
        className={styles.avatar}
        style={imageStyle}
        onError={() => setImageError(true)}
      />
    );
  }

  return (
    <div
      className={`${styles.avatar} ${styles["avatar-fallback"]}`}
      style={imageStyle}
    >
      {initials}
    </div>

  );
}