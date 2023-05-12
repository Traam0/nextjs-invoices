import { Menu } from "@headlessui/react";
import { classNames } from "@/utils/classNames";
import Link from "next/link";

export function DropDownMenuItem({ children }: { children: JSX.Element }) {
  return <Menu.Item>{({ active }) => <>{children}</>}</Menu.Item>;
}
