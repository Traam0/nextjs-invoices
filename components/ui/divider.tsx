import { TablerIconsProps } from "@tabler/icons-react";

interface deviderProps {
  label: string;
  icon?: (props: TablerIconsProps) => JSX.Element;
}

export function Divider({ label, icon: Icon }: deviderProps): JSX.Element {
  return (
    <div className="relative w-10/12 mx-auto">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-500" />
      </div>
      <div className="relative flex justify-center">
        <span className="px-2 bg-white text-base font-medium tracking-wider text-black flex items-center gap-2">
          {Icon && <Icon size={18} />} {label}
        </span>
      </div>
    </div>
  );
}
