import profileImg from "../../assets/profile.avif";
import profileAnimated from "../../assets/profile(animated).webp";

export default function ProfilePhoto({ size = "100%" }) {
  return (
    <div className="profile-photo" style={{ width: size }}>
      <img
        src={profileImg}
        alt="Srinidhi — UX Designer"
        className="profile-photo__static"
      />
      <img
        src={profileAnimated}
        alt="Srinidhi — UX Designer (animated)"
        className="profile-photo__animated"
      />
    </div>
  );
}
