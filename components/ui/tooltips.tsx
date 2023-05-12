import { TablerIconsProps } from "@tabler/icons-react";

interface toolTipProps {
  label: string;
  el: React.ReactNode;
}

export function ToolTip({ label, el }: toolTipProps): JSX.Element {
  return (
    <div className="relative group lg:cursor-pointer">
      {el}
      <div className="absolute w-auto px-2 py-1 min-w-max z-10 left-[110%] bottom-[20%] rounded-[8px] text-white bg-gray-700/60 text-xs font-bold transition-all duration-100 scale-0 group-hover:scale-100 origin-left not-italic">
        {label}
      </div>
    </div>
  );
}

interface IconWithToolTipProps {
  icon: (props: TablerIconsProps) => JSX.Element;
  label: string;
  onClick?: () => void;
}

export function IconWithToolTip({
  icon: Icon,
  label,
}: IconWithToolTipProps): JSX.Element {
  return (
    <div className="relative group lg:cursor-pointer">
      <Icon className="text-gray-800 " size={28} stroke={1.25} />
      {/* <div className="hidden 2xl:block">{e.label}</div> */}
      <div className="absolute w-auto px-2 py-1 min-w-max z-10 left-[110%] top-0 rounded-[8px] text-white bg-gray-700/60 text-xs font-bold transition-all duration-100 scale-0 group-hover:scale-100 origin-left not-italic">
        {label}
      </div>
    </div>
  );
}
