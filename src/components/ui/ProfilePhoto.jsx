import libraryPhoto from "../../assets/5.png";

// The library picture, shown whole (no cropping).
export default function ProfilePhoto({ size = "100%" }) {
  return (
    <div className="profile-photo" style={{ width: size }}>
      <img src={libraryPhoto} alt="Srinidhi reading in a library" />
    </div>
  );
}
