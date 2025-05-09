import type { LucideProps } from "lucide-react";
// apps/web/components/gothic/NavItem.tsx
import type React from "react";
import { IconWrapper } from "./IconWrapper";

type NavItemProps = {
  icon: React.ElementType<LucideProps>;
  text: string;
  isActive: boolean;
  onClick: () => void;
  colors: Record<string, string>;
};

export const NavItem = ({ icon: Icon, text, isActive, onClick, colors }: NavItemProps) => (
  <li className="my-1">
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center w-full px-4 py-2 rounded transition-colors ${isActive ? colors.activeBg : colors.inactiveBg} ${isActive ? colors.activeText : colors.inactiveText} font-['EB_Garamond',_serif] text-sm font-medium`}
    >
      <IconWrapper icon={Icon} size={18} className="mr-2" />
      {text}
    </button>
  </li>
);
