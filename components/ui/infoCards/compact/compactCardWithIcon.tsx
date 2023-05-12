import { classNames } from "@/utils/classNames";
import { TablerIconsProps } from "@tabler/icons-react";
import React from "react";

type Icon = (props: TablerIconsProps) => JSX.Element;

interface CompactInfoCardWithIconProps {
  icon?: Icon;
  info: string | React.ReactNode;
  className?: string;
  icons?: Array<Icon | undefined>;
}

export function CompactInfoCardWithIcon({
  icon: Icon,
  icons,
  info,
  className,
}: CompactInfoCardWithIconProps): JSX.Element {
  return (
    <div
      className={classNames(
        "flex flex-col items-center justify-center gap-1 px-5 py-3 rounded-lg text-sm  min-w-[96px]",
        className ? className : ""
      )}
    >
      {Icon && icons === undefined && (
        <Icon size={28} stroke={1.5} className="drop-shadow" />
      )}
      {icons && Icon === undefined && (
        <div className="flex items-center gap-4">
          {icons.map(
            (Icon, index) =>
              Icon && <Icon key={index} size={25} stroke={1.5} className="drop-shadow" />
          )}{" "}
        </div>
      )}
      <div className="space-x-1">{info}</div>
    </div>
  );
}
