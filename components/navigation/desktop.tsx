import { useState } from "react";
import {
	IconUser,
	IconSettings,
	IconSwitchHorizontal,
	TablerIconsProps,
	IconDashboard,
	IconDeviceFloppy,
	IconListDetails,
	IconUsersGroup,
	IconCoins,
	IconLogout,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import { classNames } from "@/utils/classNames";
import Image from "next/image";
import axios from "axios";
import { useSession, useToggle } from "@/hooks";

interface Tabs {
	label: string;
	Icon: (props: TablerIconsProps) => JSX.Element;
	dest: string;
	disabled: boolean;
	active: boolean;
	onClick: () => void;
	sub?: [];
}

const tabs: Omit<Tabs, "onClick">[] = [
	{
		label: "Dashboard",
		Icon: IconDashboard,
		dest: "/dashboard",
		disabled: false,
		active: true,
	},
	{
		label: "Invoices",
		Icon: IconListDetails,
		dest: "/invoices",
		disabled: false,
		active: false,
	},
	// {
	// 	label: "Clients",
	// 	Icon: IconUsersGroup,
	// 	dest: "/clients",
	// 	disabled: false,
	// 	active: false,
	// },
	// {
	// 	label: "Expenses",
	// 	Icon: IconCoins,
	// 	dest: "/expenses",
	// 	disabled: true,
	// 	active: false,
	// },
	// {
	// 	label: "sauvguard",
	// 	Icon: IconDeviceFloppy,
	// 	dest: "/saved",
	// 	disabled: true,
	// 	active: false,
	// },
];

export function DesktopNavigation({ className }: { className: string }) {
	const router = useRouter();
	const active = router.asPath;
	const [expanded, toggleExpanded] = useToggle(false);
	const session = useSession();
	return (
		<nav
			className={classNames(
				"flex flex-col items-center gap-8  bg-primary text-black py-12 px-3 rounded-tr-md rounded-br-md w-fit duration-150 ease-in-out",
				className ? className : ""
			)}
		>
			<div>
				<Image
					src={"/logo_b.png"}
					className={classNames(
						"h-auto cursor-pointer object-cover",
						expanded ? "w-36" : "w-14"
					)}
					width={500}
					height={300}
					alt=""
				/>
			</div>
			<div className="flex flex-col items-center gap-5 select-none">
				{tabs.map((e, index) => (
					<div
						key={index}
						className={classNames(
							"relative group md:cursor-pointer flex justify-start w-full text gap-2 items-center rounded-3xl bg-slate-50/20 p-1",
							e.disabled
								? "text-gray-400"
								: e.dest === active
								? "text-orange-600"
								: "text-gray-800"
						)}
						onClick={() => {
							if (e.disabled) return;

							router.push(e.dest);
						}}
					>
						<e.Icon size={26} stroke={1.25} />
						{expanded ? (
							<div className={classNames(expanded ? "text-base" : "text-xs")}>
								{e.label}
							</div>
						) : (
							<div
								className={classNames(
									"absolute w-auto px-2 py-1 min-w-max z-10 left-[110%] bottom-[20%] rounded-[8px] text-white bg-gray-700/60 font-bold  transition-all duration-100 scale-0 group-hover:scale-100 origin-left not-italic",
									expanded ? "hidden" : "text-sm"
								)}
							>
								{e.label}
							</div>
						)}
					</div>
				))}
			</div>

			<div className="mt-auto flex flex-col items-center gap-5">
				<div
					className="flex justify-start items-center w-full gap-2 lg:cursor-pointer relative group"
					onClick={() => toggleExpanded()}
				>
					<IconSwitchHorizontal size={26} stroke={1.25} />
					{expanded ? (
						<div className="text-xs">Expand</div>
					) : (
						<div className="absolute w-auto px-2 py-1 min-w-max z-10 left-[110%] bottom-[20%] rounded-[8px] text-white bg-gray-700/60 text-xs font-bold transition-all duration-100 scale-0 group-hover:scale-100 origin-left not-italic">
							Expand
						</div>
					)}
				</div>
				{session.data?.id ? (
					<div>
						<div
							className="flex justify-start items-center w-full text-red-600 gap-2 lg:cursor-pointer relative group"
							onClick={() => {
								axios
									.post("/api/auth/logout", {}, { withCredentials: true })
									.then(({ status, data: res }) => {
										session.refetch();
									});
							}}
						>
							<IconLogout size={26} stroke={1.25} />
							{expanded ? (
								<div className="text-xs">Logout</div>
							) : (
								<div className="absolute w-auto px-2 py-1 min-w-max z-10 left-[110%] bottom-[20%] rounded-[8px] text-white bg-gray-700/60 text-xs font-bold transition-all duration-100 scale-0 group-hover:scale-100 origin-left not-italic">
									Logout
								</div>
							)}
						</div>
					</div>
				) : (
					<></>
				)}
				{/* <div
					className={classNames(
						"flex justify-start items-center w-full gap-2 md:cursor-pointer relative group",
						"/profile/settings" === active ? "text-orange-600" : "text-gray-800"
					)}
					onClick={() => {
						if (session.data?.id) {
							router.push("/profile/settings");
						} else {
							router.push("/auth/login");
						}
					}}
				>
					<IconSettings size={26} stroke={1.25} />
					{expanded ? (
						<div className="text-xs">Settings</div>
					) : (
						<div className="absolute w-auto px-2 py-1 min-w-max z-10 left-[110%] bottom-[20%] rounded-[8px] text-white bg-gray-700/60 text-xs font-bold transition-all duration-100 scale-0 group-hover:scale-100 origin-left not-italic">
							Settings
						</div>
					)}
				</div> */}

				{/* <div
					className={classNames(
						"flex justify-start items-center w-full gap-2 md:cursor-pointer relative group",
						"/profile" === active ? "text-600" : "text-gray-800"
					)}
					onClick={() => {
						if (session.data?.id) {
							router.push("/profile");
						} else {
							router.push("/auth/login");
						}
					}}
				>
					<IconUser size={26} stroke={1.25} />
					{expanded ? (
						<div className="text-xs">Profile</div>
					) : (
						<div className="absolute w-auto px-2 py-1 min-w-max z-10 left-[110%] bottom-[20%] rounded-[8px] text-white bg-gray-700/60 text-xs font-bold transition-all duration-100 scale-0 group-hover:scale-100 origin-left not-italic">
							Profile
						</div>
					)}
				</div> */}
			</div>
		</nav>
	);
}
