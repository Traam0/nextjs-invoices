import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/layouts/layout";
import { useSession } from "@/hooks";
import { Analytics, SESSION_OBJECT } from "@/utils/types";
import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import {
	IconChartPie,
	IconChevronDown,
	IconChevronUp,
	IconClipboard,
	IconHourglassLow,
	IconLock,
	IconLogout,
	IconMinus,
	IconUser,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import _ from "lodash";
import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { deleteCookie, removeCookies } from "cookies-next";
import { toast } from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";
import { pad } from "@/utils/helpers";
import { classNames } from "@/utils/classNames";

const AreaChart = dynamic(() => import("@/components/charts/AreaChart"), {
	ssr: false,
});

const months = [
	"janvier",
	"fevrier",
	"mars",
	"avril",
	"mai",
	"juin",
	"juillet",
	"aout",
	"septembre",
	"octobre",
	"novembre",
	"decembre",
];

export default function Home(): JSX.Element {
	const [client, setClient] = useState(true);
	const router = useRouter();
	const session = useSession();

	const analytics = useQuery(
		["analytics"],
		async function (): Promise<Analytics | undefined> {
			try {
				const { status, data: res } = await axios.get<Analytics>(
					"/api/users/analytics",
					{
						withCredentials: true,
					}
				);
				return res;
			} catch {
				return undefined;
			}
		},
		{ staleTime: Infinity, refetchOnWindowFocus: false }
	);

	const clientGrowth: number = (function (): number {
		if (analytics.data) {
			const [secondLast, last] = [
				analytics.data.clientsPerMonth[
					analytics.data.clientsPerMonth.length - 2
				],
				analytics.data.clientsPerMonth[
					analytics.data.clientsPerMonth.length - 1
				],
			];
			return Number((last.value * 100) / secondLast.value);
		}

		return Number(0);
	})();

	const incomeGrowth: number = (function (): number {
		if (analytics.data) {
			const [secondLast, last] = [
				analytics.data.incomePerMonth[analytics.data.incomePerMonth.length - 2],
				analytics.data.incomePerMonth[analytics.data.incomePerMonth.length - 1],
			];
			return last.value - secondLast.value <= 0
				? -100 + (last.value * 100) / secondLast.value
				: (last.value * 100) / secondLast.value;
		}

		return 100;
	})();

	if (!session.isFetching && !session.isLoading) {
		if (!session.data) {
			router.replace("/auth/login");
		}
	}

	if (session.isFetching || session.isLoading || !session.data) {
		return (
			<Layout>
				<div className="absolute inset-0 flex items-center justify-center z-50 bg-black/20">
					<div className="pulse-out " />
				</div>
			</Layout>
		);
	}

	return (
		<Layout>
			<Head>
				<title>DashBoard</title>
			</Head>
			<div className="space-y-3">
				<div className="font-semibold text-5xl font-mono tracking-wider upper ">
					DASHBOARD.
				</div>
				<WelcomeCard user={session.data as SESSION_OBJECT} />

				<section className="flex justify-evenly gap-8 flex-wrap w-full py-6">
					<div className="rounded-xl shadow-lg min-w-[300px] p-2 px-4 bg-white font-mono select-none">
						<div className="flex justify-between">
							<h2 className="font-medium text-2xl text-gray-600/60 uppercase tracking-wide">
								Clients
							</h2>
							<div className="flex items-center gap-1 text-lg text-[#38b000] font-medium">
								{clientGrowth}%
								{Math.floor(clientGrowth) === 100 ? (
									<IconMinus size={32} stroke={2} />
								) : clientGrowth < 0 ? (
									<IconChevronDown size={32} stroke={2} />
								) : (
									<IconChevronUp size={32} stroke={2} />
								)}
							</div>
						</div>
						<div className="text-4xl font-sans font-light px-2 py-4">
							{pad((analytics.data?.client_count as number) ?? 0, 2)}{" "}
							<span className="text-2xl font-normal capitalize">clients</span>
						</div>
						<div className="flex items-center font-sans decoration-1 underline underline-offset-4 unde text-lg justify-between capitalize">
							<Link href={"#"} className="px-1">
								voir tous les clients.
							</Link>
							<div
								className={classNames(
									"p-1 rounded-md  cursor-pointer",
									clientGrowth < 0
										? "bg-red-500/40"
										: Math.ceil(clientGrowth) === 100
										? "bg-amber-500/40"
										: "bg-sky-400/30",
									"drop-shadow-2xl shadow-md"
								)}
							>
								<IconUser
									className={classNames(
										clientGrowth < 0
											? "text-red-600"
											: Math.ceil(clientGrowth) === 100
											? "text-amber-500"
											: "text-sky-500"
									)}
									stroke={1.75}
									size={28}
								/>
							</div>
						</div>
					</div>

					<div className="rounded-xl shadow-lg min-w-[300px] p-2 px-4 bg-white font-mono select-none">
						<div className="flex justify-between">
							<h2 className="font-medium text-2xl text-gray-600/60 uppercase tracking-wide">
								revenu
							</h2>
							<div
								className={classNames(
									"flex items-center gap-1 text-lg font-medium",
									incomeGrowth < 0
										? "text-red-600"
										: Math.ceil(incomeGrowth) === 100
										? "text-amber-500/40"
										: "text-[#38b000]"
								)}
							>
								{Number(incomeGrowth).toFixed(2)}%
								{Math.floor(incomeGrowth) === 100 ? (
									<IconMinus size={32} stroke={2} />
								) : incomeGrowth < 0 ? (
									<IconChevronDown size={32} stroke={2} />
								) : (
									<IconChevronUp size={32} stroke={2} />
								)}
							</div>
						</div>
						<div className="text-4xl font-sans font-light px-2 py-4">
							{pad((analytics.data?.totalIncome as number) ?? 0, 2)}{" "}
							<span className="text-2xl font-medium">DH</span>
						</div>
						<div className="flex items-center font-sans decoration-1 underline underline-offset-4 unde text-lg justify-between capitalize">
							<Link href={"#"} className="px-1">
								voir les revenus.
							</Link>
							<div
								className={classNames(
									"p-1 rounded-md  cursor-pointer",
									incomeGrowth < 0
										? "bg-red-500/40"
										: Math.ceil(incomeGrowth) === 100
										? "bg-amber-500/40"
										: "bg-[#38b000]/30",
									"drop-shadow-2xl shadow-md"
								)}
							>
								<IconChartPie
									className={classNames(
										incomeGrowth < 0
											? "text-red-600"
											: Math.ceil(incomeGrowth) === 100
											? "text-amber-500"
											: "text-[#38b000]"
									)}
									stroke={1.75}
									size={28}
								/>
							</div>
						</div>
					</div>

					<div className="rounded-xl shadow-lg min-w-[300px] p-2 px-4 bg-white font-mono select-none">
						<div className="flex justify-between">
							<h2 className="font-medium text-2xl text-gray-600/60 uppercase tracking-wide">
								Nbr facture.
							</h2>
						</div>
						<div className="text-4xl font-sans font-light px-2 py-4">
							{pad((analytics.data?.invoicesCount as number) ?? 0, 2)}{" "}
							<span className="text-2xl font-normal capitalize">factures</span>
						</div>
						<div className="flex items-center font-sans decoration-1 underline underline-offset-4 unde text-lg justify-between capitalize">
							<Link href={"#"} className="px-1">
								details .
							</Link>
							<div className="p-1 rounded-md bg-indigo-400/40 cursor-pointer">
								<IconClipboard
									className="text-indigo-600"
									stroke={1.75}
									size={28}
								/>
							</div>
						</div>
					</div>

					<div className="rounded-xl shadow-lg min-w-[300px] p-2 px-4 bg-white font-mono select-none">
						<div className="flex justify-between">
							<h2 className="font-medium text-2xl text-gray-600/60 uppercase tracking-wide">
								revenus en attente.
							</h2>
						</div>
						<div className="text-4xl font-sans font-light px-2 py-4">
							{pad(analytics.data?.pendingIncome as number, 2)}{" "}
							<span className="text-2xl font-medium">DH</span>
						</div>
						<div className="flex items-center font-sans decoration-1 underline underline-offset-4 unde text-lg justify-between capitalize">
							<Link href={"#"} className="px-1">
								details.
							</Link>
							<div className="p-1 rounded-md bg-yellow-400/40 cursor-pointer">
								<IconHourglassLow
									className="text-yellow-600"
									stroke={1.75}
									size={28}
								/>
							</div>
						</div>
					</div>
				</section>

				<section className=" shadow-lg px-4 py-6 bg-white rounded-lg w-full h-fit">
					{analytics.data && analytics.data?.incomePerMonth.length > 0 ? (
						<AreaChart
							marker={analytics.data.averageIncome}
							labels={analytics.data.incomePerMonth?.map(
								(month) => `${month.month}-${month.year}`
							)}
							data={[
								{
									name: "revenu",
									data: [
										...analytics?.data.incomePerMonth.map(
											(month) => month.value
										),
									],
								},
							]}
						/>
					) : (
						<AreaChart
							labels={months}
							data={[
								{
									name: "revenu",
									data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
								},
								// {
								// 	name: "dépenses",
								// 	data: [-8640, -9600, -30500, -0],
								// },
							]}
						/>
					)}
				</section>
			</div>
		</Layout>
	);
}

interface WelcomeCardProps {
	user: SESSION_OBJECT;
}

function WelcomeCard({ user }: WelcomeCardProps): JSX.Element {
	const session = useSession();
	return (
		<div className="bg-white rounded-lg py-4 px-8 drop-shadow-sm shadow-md w-full flex items-center justify-between ">
			<div className="flex items-center gap-4">
				<div className="bg-violet-400/60 select-none cursor-pointer text-violet-500  rounded-full w-14 aspect-square p-2 grid place-items-center text-xl tracking-wide font-medium">
					{String(user?.first_name[0] + user?.last_name[0]).toUpperCase()}
				</div>
				<div className="">
					<h2 className="font-medium text-2xl capitalize">
						bienvenue de retour:{" "}
						<span className="font-normal text-2xl capitalize">
							{`${user?.last_name} ${user?.first_name}`} .
						</span>
					</h2>
					<h3>
						Content de vous voir de retour! Votre tableau de bord est
						opérationnel et prêt 🔥.
					</h3>
				</div>
			</div>

			<div className="flex items-center gap-6 justify-end w-fit">
				{/* <button
					type="button"
					className="flex gap-2 justify-center items-center text-base px-3 py-1 rounded-lg border-transparent outline-transparent text-[#E9B90C] ring-2 ring-offset-2 ring-[#E9B90C] hover:text-white hover:bg-[#E9B90C] duration-150 ease-out"
				>
					<IconLock size={20} stroke={1.5} aria-hidden="true" />
					Lock
				</button> */}
				<button
					type="button"
					className="flex gap-2 justify-center items-center text-base px-3 py-2 rounded-lg border-transparent outline-transparent text-red-500 ring-2 ring-offset-2 ring-red-500 hover:text-white hover:bg-red-500 duration-150 ease-out"
					onClick={() => {
						axios
							.post("/api/auth/logout", {}, { withCredentials: true })
							.then((res) => {
								toast.success("Logged out successfully");
								session.refetch();
							})
							.catch((error: AxiosError) => {
								toast.error(
									(error.response?.data as string) ?? "Manually Clear cookies"
								);
							});
					}}
				>
					<IconLogout size={20} stroke={1.5} aria-hidden="true" />
					Se déconnecter
				</button>
			</div>
		</div>
	);
}
