import { Image, Transformation } from "cloudinary-react";

export function UserProfile({ userId, className }) {
  return (
    <Image
      className={className}
      publicId={`animesports/${userId}`}
      width="0.1"
      alt="user"
    >
      <Transformation defaultImage="user_default.svg" />
    </Image>
  );
}
