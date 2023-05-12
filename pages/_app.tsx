import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { useRef } from "react";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
	const querryClient = useRef(new QueryClient());

	return (
		<QueryClientProvider client={querryClient.current}>
			<Hydrate state={pageProps.dehydratedState}>
				<NextNProgress height={5} color="#fca311" stopDelayMs={220} />
				<Component {...pageProps} />
			</Hydrate>
		</QueryClientProvider>
	);
}
