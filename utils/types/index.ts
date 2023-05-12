import { TablerIconsProps } from "@tabler/icons-react";

declare interface USER {
	_id: string;
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	gender: "male" | "female";
	verified: boolean;
	role: "type.admin" | "type.operator";
	createdAt: string;
	updatedAt: string;
	__v: 0;
}

declare interface SESSION_OBJECT {
	id: string;
	email: string;
	first_name: string;
	last_name: string;
	phone?: string;
	role: "type.admin" | "type.A" | "type.B";
}

declare interface navItemsProps {
	name: string;
	icon: (props: TablerIconsProps) => JSX.Element;
	to: string;
	sub?: navItemsProps[];
}

declare interface Client {
	_id: string;
	name: string;
	ICE?: string;
	type: string;
	phone: string;
	address?: string;
	website?: string;
}

declare interface Invoice {
	_id: string;
	issuer: string;
	client_id: string;
	client_name: string;
	client_ice?: string;
	client_address?: string;
	client_type: string;
	client_phone?: string;
	client_website?: string;
	items: Item[];
	TVA: number;
	total: number;
	totalTTC: number;
	avance: number;
	rest: number;
	payed: boolean;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

declare interface Item {
	product: string;
	description?: string;
	type: string;
	quantity: number;
	price: number;
	total: number;
}

declare interface Analytics {
	client_count: number;
	invoicesCount: number;
	totalIncome: number;
	pendingIncome: number;
	incomePerMonth: { year: number; month: number; value: number }[];
	clientsPerMonth: { year: number; month: number; value: number }[];
	averageIncome: number;
}

export type {
	USER,
	navItemsProps,
	SESSION_OBJECT,
	Client,
	Invoice,
	Item,
	Analytics,
};
