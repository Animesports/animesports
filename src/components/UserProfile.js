import { Image, Transformation } from "cloudinary-react";

export function UserProfile({ userId, className, ...rest }) {
  return (
    <Image
      className={className}
      publicId={`animesports/${userId}`}
      width="0.1"
      alt="user"
      {...rest}
    >
      <Transformation defaultImage="user_default.svg" />
    </Image>
  );
}
