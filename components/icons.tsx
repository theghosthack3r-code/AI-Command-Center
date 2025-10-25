import React from 'react';
import { icons } from 'lucide-react';

const toPascalCase = (str: string) =>
  str.replace(/(^\w|-\w)/g, (text) => text.replace(/-/, "").toUpperCase());

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: keyof typeof icons;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, className = 'w-5 h-5', ...props }) => {
  const LucideIcon = icons[toPascalCase(name) as keyof typeof icons];

  if (!LucideIcon) {
    // Fallback icon or null
    return null;
  }

  return <LucideIcon className={className} {...props} />;
};
