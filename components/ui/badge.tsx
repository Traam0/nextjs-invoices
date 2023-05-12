import { IconX } from "@tabler/icons-react";
import { classNames } from "@/utils/classNames";

interface badgeProps {
  label: string;
  bg: string;
  text: string;
  size?: "sm" | "lg";
  iconColor?: string;
  handleRemove: any;
}

export function Badge({
  label,
  bg,
  size,
  iconColor,
  handleRemove,
  text = "current",
}: badgeProps): JSX.Element {
  if (size === "lg") {
    return (
      <div
        className={classNames(
          "inline-flex rounded-full min-w-fit items-center py-2 pl-3 pr-2 text-sm font-medium ",
          `bg-${bg} text-${text}`
        )}
      >
        {label}
        <button
          type="button"
          className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-current outline-none"
        >
          <span className="sr-only">remove {label}</span>
          <IconX className={`text-${iconColor}`} onClick={handleRemove} />
        </button>
      </div>
    );
  }

  return (
    <div
      className={classNames(
        "inline-flex items-center py-0.5 pl-2 pr-0.5 rounded-full text-xs font-medium",
        `bg-${bg} text-${text}`
      )}
    >
      {label}
      <button
        type="button"
        className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-current outline-none"
      >
        <span className="sr-only">remove {label}</span>
        <IconX className={`text-${iconColor}`} onClick={handleRemove} />
      </button>
    </div>
  );
}
