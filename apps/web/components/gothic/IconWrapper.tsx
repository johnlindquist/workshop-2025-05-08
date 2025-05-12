import type { LucideProps } from "lucide-react";
// apps/web/components/gothic/IconWrapper.tsx
import type React from "react";

type IconWrapperProps = {
  icon: React.ElementType<LucideProps>;
  size?: number;
  className?: string;
};

export const IconWrapper = ({ icon: Icon, size = 20, className = "" }: IconWrapperProps) => (
  <Icon size={size} className={`inline-block ${className}`} />
);
