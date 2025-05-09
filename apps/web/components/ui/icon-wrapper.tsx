import type React from "react";

interface IconWrapperProps {
  icon: React.ElementType;
  size?: number;
  className?: string;
}

// Helper component for icons
const IconWrapper = ({ icon: Icon, size = 20, className = "" }: IconWrapperProps) => (
  <Icon size={size} className={`inline-block ${className}`} />
);

export default IconWrapper;
