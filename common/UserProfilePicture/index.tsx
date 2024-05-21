import React, { useState } from 'react';
import styles from "./UserProfilePic.module.css"
import { LoginUser } from '@/models/types/loginUser.type';

export const UserProfilePic = ({ user }: {user : LoginUser}) => {
  const [imgSrc, setImgSrc] = useState(user?.profilepic || "https://avatar.iran.liara.run/public");

  const handleError = () => setImgSrc("https://avatar.iran.liara.run/public");

  return (
    <img
      className={`${styles.user_profile_pic_desktop}`}
      src={imgSrc}
      alt="profile-pic"
      onError={handleError}
      style={{
        border:
          user?.planType === "Gold"
            ? "3.25px solid #FFB800"
            : user?.planType === "Silver"
              ? "3.25px solid #A8A8A8"
              : user?.planType === "Bronze"
                ? "3.25px solid #CD7F32"
                : "none",
        borderRadius: "50%",
        width: "42px",
        height: "42px",
      }}
    />
  );
};

