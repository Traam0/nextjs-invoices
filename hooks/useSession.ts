/** @format */

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { SESSION_OBJECT } from "@/utils/types";

export function useSession() {
	return useQuery(["session"], getSession, {
		staleTime: Infinity,
		refetchOnWindowFocus: false,
		retry: false,
	});
}

async function getSession(): Promise<SESSION_OBJECT | null> {
	try {
		const { status, data: res } = await axios.get("/api/auth/session", {
			withCredentials: true,
		});

		return res.user;
	} catch (err) {
		return null;
	}
}
