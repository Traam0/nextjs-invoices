import { IconDashboard, IconList, IconUser } from "@tabler/icons-react";

interface MobileNavigationProps {
  className?: string;
}

type Tabs = {
  label: string;
  Icon: any;
  dest: string;
  clickEvent: () => void;
  index: number;
};

const tabs: Omit<Tabs, "clickEvent" | "index">[] = [
  { label: "Home", Icon: IconDashboard, dest: "/" },
  { label: "Wishlist", Icon: IconList, dest: "/wishlist" },
  { label: "History", Icon: IconUser, dest: "/history" },
];

export function MobileNavigation({ className }: MobileNavigationProps) {
  return <></>;
}
