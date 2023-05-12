import { useToggle } from "@/hooks";
import Head from "next/head";
import { DesktopNavigation } from "@/components/navigation";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Layout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<>
			<Head>
				<title>Stage</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="bg-slate-50 h-screen  overflow-hidden flex ">
				<DesktopNavigation className="h-full w-fit" />

				<div className="md:pt-10 md:pb-8 md:px-10 overflow-y-scroll scrollbar-thin w-full h-full relative">
					{children}
				</div>
				<Toaster />
			</main>
			<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
		</>
	);
}
