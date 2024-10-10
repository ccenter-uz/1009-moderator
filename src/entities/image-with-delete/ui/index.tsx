import { Tooltip, Button, Image } from "antd";
import { FC, useState } from "react";
import { FaTrash } from "react-icons/fa";

interface ImageWithDeleteProps {
  key: string | number;
  src: string;
  alt?: string;
  onDelete: () => void;
}

export const ImageWithDelete: FC<ImageWithDeleteProps> = ({
  key,
  src,
  alt,
  onDelete,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      key={key}
      style={{
        position: "relative",
        display: "inline-block",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={src}
        alt={alt}
        style={{
          width: 120,
          height: 120,
          objectFit: "cover",
          borderRadius: "6px",
        }}
        preview={true}
      />
      {hovered && (
        <Tooltip title="Delete">
          <Button
            shape="circle"
            icon={<FaTrash />}
            onClick={onDelete}
            style={{
              width: 30,
              height: 30,
              position: "absolute",
              top: 5,
              right: 5,
            }}
          />
        </Tooltip>
      )}
    </div>
  );
};
