import IconWrapper from "@/components/ui/icon-wrapper";
import type React from "react";

interface NavItemProps {
  icon: React.ElementType;
  text: string;
  isActive: boolean;
  onClick: () => void;
  colors: Record<string, string>; // Consider a more specific type for colors
}

// Sidebar Navigation Item Component
const NavItem: React.FC<NavItemProps> = ({ icon: Icon, text, isActive, onClick, colors }) => (
  <li className="my-1">
    <button
      type="button"
      onClick={onClick} // preventDefault is not needed for button type onClick
      className={`flex items-center w-full py-3 px-4 rounded-r-full transition-all duration-200 ease-in-out group
                        ${isActive ? colors.sidebarActive : `${colors.textSecondary} ${colors.sidebarHover} hover:text-stone-100`}
                        font-['EB_Garamond',_serif] text-sm font-medium`}
    >
      <IconWrapper
        icon={Icon}
        size={20}
        className={`mr-5 transition-colors ${isActive ? "text-red-200" : `${colors.iconColor} group-hover:text-stone-100`}`}
      />
      <span className="truncate">{text}</span>
    </button>
  </li>
);

export default NavItem;
