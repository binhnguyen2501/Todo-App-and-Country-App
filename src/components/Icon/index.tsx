import React from "react";
import IcomoonReact from "icomoon-react";
import iconSet from "./selection.json";

interface IconProps {
  color?: string;
  size?: number | string;
  icon: string;
  className?: string;
}

const Icon: React.FC<IconProps> = (props) => {
  const { color, size = "100%", icon, className = "" } = props;
  return (
    <IcomoonReact
      className={className}
      iconSet={iconSet}
      color={color}
      size={size}
      icon={icon}
    />
  );
};

export default Icon;
