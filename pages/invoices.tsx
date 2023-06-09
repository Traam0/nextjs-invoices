import { Input, Select, SelectWithSearch } from "@/components/forms";
import Layout from "@/layouts/layout";
import { useForm } from "@mantine/form";
import {
	IconFileInvoice,
	IconLetterCaseToggle,
	IconRefresh,
	IconSwitchVertical,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Head from "next/head";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSession, useToggle } from "@/hooks";
import { useRouter } from "next/router";
import { Dialog } from "@headlessui/react";
import { Divider } from "@/components/ui";
import { StatusCodes } from "http-status-codes";
import { IconPlus } from "@tabler/icons-react";
import { Client, Invoice, Item } from "@/utils/types";
import { GenerateInvoice } from "@/components/pdf";

export default function Projects(): JSX.Element {
	const session = useSession();
	const router = useRouter();
	const [items, setItems] = useState<Item[]>([]);
	const [avance, setAvance] = useState<number>(0);
	const [tva, setTVA] = useState<number>(0.2);
	const [clientDialogOpen, toggleClientDialogOpen] = useToggle(false);

	const form = useForm({
		initialValues: {
			product: "",
			description: "",
			type: "Produit",
			quantity: 1,
			price: 0,
			paymentMethod: "cash",
			clientId: "Client Passage",
		},
		validate: {
			product: (val) =>
				val ? (val.length > 5 ? null : "Too Short") : "Title required",
			paymentMethod: (val) =>
				["cash", "tpe", "transfer", "check"].includes(val.toLocaleLowerCase())
					? null
					: "invalid payment method",
			type: (val) =>
				["service", "produit"].includes(val.toLocaleLowerCase())
					? null
					: "invalid type",
			price: (val) => (val <= 0 ? "Prix Invalide" : null),
			quantity: (val) => (val <= 0 ? "Quantite Invalide" : null),
		},
	});

	const clientForm = useForm({
		initialValues: {
			name: "",
			ICE: "",
			address: "",
			phone: "",
			website: "",
			clientType: "Client Passage",
		},
	});

	function handleSubmit(): void {
		setItems((prev) => [
			...prev,
			{
				product: form.values.product,
				description: form.values.description,
				type: form.values.type,
				quantity: form.values.quantity,
				price: form.values.price,
				total: form.values.price * form.values.quantity,
			},
		]);
	}

	function createInvoice(callBack?: Function): void {
		// const client = clients.data?.find((c) => c.name === form.values.clientId);
		const client =
			form.values.clientId === "Client Passage"
				? {
						_id: " ",
						name: "Client Passage",
						ICE: "",
						address: "",
						type: "Client Passage",
						phone: "",
						website: "",
				  }
				: clients.data?.find((c) => c.name === form.values.clientId);
		console.log(client);
		if (items.length > 0) {
			axios
				.post(
					"/api/invoices/create",
					{
						client_id: client?._id,
						client_name: client?.name,
						client_ice: client?.ICE,
						client_address: client?.address,
						client_type: client?.type,
						client_phone: client?.phone,
						client_website: client?.website,
						items: items,
						TVA: tva,
						total: items.reduce((prev, curr) => curr.total + prev, 0),
						avance: avance,
						payed: false,
					},

					{ withCredentials: true }
				)
				.then(({ status, data: res }) => {
					toast.success("invoice created successfully");
					console.log(res);
					if (callBack) callBack(res, "");
				})
				.catch((err: AxiosError) => {
					console.log(err);
					toast.error("bruuh :')");
				});
		} else {
			form.validate();
			toast.error("Ajouter des produits!");
		}
	}

	const clients = useQuery<Client[]>(
		["clients"],
		async function (): Promise<Client[]> {
			try {
				const { data: res } = await axios.get<{ clients: Client[] }>(
					"/api/client",
					{
						withCredentials: true,
					}
				);

				return res.clients;
			} catch {
				console.log("client get failed clientSide");
				return [];
			}
		},
		{
			staleTime: 1000 * 60 * 5,
			refetchOnWindowFocus: true,
		}
	);

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
				<title>Billify </title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/logo.png" />
			</Head>

			<Dialog
				open={clientDialogOpen}
				onClose={toggleClientDialogOpen}
				className="fixed inset-0 bg-black/40 flex justify-center items-center"
			>
				<Dialog.Panel className="bg-white px-4 py-6 rounded-md max-w-2xl">
					<Dialog.Title className="py-1">
						<span className="inline-flex gap-2 items-center text-3xl font-semibold font-sans">
							Client
						</span>
					</Dialog.Title>
					{/* <Dialog.Description>
						This will permanently deactivate your account
					</Dialog.Description> */}
					<div className="w-full">
						<form
							onSubmit={(e) => {
								e.preventDefault();
								axios
									.post(
										"/api/client/add",
										{
											name: clientForm.values.name,
											enterprise_name: clientForm.values.name,
											ICE: clientForm.values.ICE,
											address: clientForm.values.address,
											phone: clientForm.values.phone,
											website: clientForm.values.website,
											type: clientForm.values.clientType,
										},
										{ withCredentials: true }
									)
									.then(({ data, status }) => {
										if (status === StatusCodes.CREATED) {
											toast.success(`Client ~${data?._id} created`);
											clients.refetch();
											clientForm.reset();
										}
									})
									.catch((error: AxiosError<{ message: string }>) => {
										console.log(error);
										switch (error.response?.status) {
											case StatusCodes.CONFLICT:
												return toast.error(
													(error?.response?.data?.message as string) ??
														"Client Deja existe"
												);
											case StatusCodes.BAD_REQUEST:
												return toast.error("BAD_REQUEST");
											default:
												return toast.error("Quelque chose s'est mal passé");
										}
									})
									.finally(() => {});
							}}
						>
							<div className="row py-4 flex justify-start gap-2 flex-wrap items-start">
								<Input
									label="Nom Clinet"
									type="text"
									placeholder="Nom Client"
									className="w-full md:w-fit"
									{...clientForm.getInputProps("name")}
								/>
								<Input
									label="ICE"
									type="text"
									placeholder="Nm ICE"
									className="w-full md:w-fit"
									{...clientForm.getInputProps("ICE")}
								/>

								<SelectWithSearch
									label="Type Client"
									className="flex flex-col w-full md:w-fit"
									options={["Entreprise", "Passage", "Fidel"]}
									selected={clientForm.values.clientType}
									{...clientForm.getInputProps("clientType")}
								/>
								<Input
									label="address"
									type="text"
									placeholder="address Client"
									className="w-full md:w-fit"
									{...clientForm.getInputProps("address")}
								/>
								<Input
									label="website"
									type="text"
									placeholder="example.com"
									className="w-full md:w-fit"
									{...clientForm.getInputProps("website")}
								/>
								<Input
									label="phone"
									type="text"
									placeholder="+212506060606"
									className="w-full md:w-fit"
									{...clientForm.getInputProps("phone")}
								/>
							</div>
							<button className="w-full mb-2 font-medium bg-orange-100 text-orange-600 ring-2 ring-offset-2 ring-secondary py-2 rounded-lg  focus:ring-4 focus:outline-none hover:bg-orange-50 hover:text-orange-600">
								Ajouter Client
							</button>
						</form>
						<Divider label="Ou choisire un" />
						<SelectWithSearch
							label="client"
							selected={form.values.clientId}
							options={
								clients.data
									? clients.data?.length > 0
										? [
												"Client Passage",
												...clients.data.map((client: Client) => client.name),
										  ]
										: ["Client Passage"]
									: ["Client Passgae"]
							}
							{...form.getInputProps("clientId")}
							position="top"
						/>
						{/* <SelectWithSearchLablesAndValues
							label="Client"
							position="top"
							options={
								clients.data
									? clients.data.length > 0
										? [
												{ label: "Client Passgae", value: "" },
												...clients.data.map((client) => {
													return {
														label: client.name,
														value: client._id,
													};
												}),
										  ]
										: [form.values.clientId]
									: [form.values.clientId]
							}
							selected={form.values.clientId}
							{...form.getInputProps("clientId")}
						/> */}
					</div>
				</Dialog.Panel>
			</Dialog>

			<form
				className="select-none flex flex-col gap-3 px-7  bg-gradient-to-r from-orange-50/80 to-slate-50  rounded-xl shadow-md  py-4 space-y-2 h-full w-full overflow-x-hidden"
				onSubmit={form.onSubmit(() => {
					handleSubmit();
				})}
			>
				<div className="row flex justify-start gap-4 flex-wrap items-start">
					<Input
						label="Produit"
						{...form.getInputProps("product")}
						type="text"
						placeholder="Nom Prouduit"
						className="w-full md:w-fit"
					/>

					<SelectWithSearch
						label="Type Produit"
						className="flex flex-col w-full md:w-fit"
						options={["Service", "Produit"]}
						selected={form.values.type}
						{...form.getInputProps("type")}
					/>

					<Input
						icon={<IconLetterCaseToggle stroke={1} />}
						label="Description"
						{...form.getInputProps("description")}
						type="text"
						className="w-full md:w-fit"
						placeholder="description"
					/>
					<Input
						// icon={<IconLetterCaseToggle stroke={1} />}
						label="Qauntite"
						{...form.getInputProps("quantity")}
						type="number"
						className="w-full md:w-fit"
						placeholder="0 Unit"
					/>
					<Input
						// icon={<IconLetterCaseToggle stroke={1} />}
						label="Prix"
						{...form.getInputProps("price")}
						type="number"
						className="w-full md:w-fit"
						placeholder="00.00 DH"
					/>

					<Select
						label="Payment Method"
						selected={form.values.paymentMethod}
						options={["cash", "check", "transfer", "tpe"]}
						className="rounded-md px-4 py-2 focus:outline-2 focus:outline-accent outline outline-1 outline-gray-400 w-full"
						{...form.getInputProps("paymentMethod")}
					/>
				</div>

				<div className="flex items-start gap-4 w-full">
					<button className="w-full mb-1 font-medium bg-orange-100 text-orange-700 ring-2 ring-offset-2 ring-secondary py-2 rounded-lg  focus:ring-4 focus:outline-none hover:bg-orange-50 hover:text-orange-700">
						Ajouter produit
					</button>
					<div>
						<button
							type="button"
							className="flex items-center gap-2  mb-1 px-6 font-medium bg-orange-100 text-orange-700 ring-2 ring-offset-2 ring-secondary py-2 rounded-lg min-w-fit focus:ring-4 focus:outline-none hover:bg-orange-50 hover:text-orange-700"
							onClick={toggleClientDialogOpen}
						>
							Client <IconPlus size={20} />
						</button>
						<div className="text-xs w-full text-center pt-1 font-medium">
							{form.values.clientId}{" "}
							{/* {JSON.stringify(
								clients.data?.find((i) => i.name === form.values.clientId)
							)} */}
						</div>
					</div>
				</div>
				<section
					role="tablist"
					className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2 scrollbar-none h-full"
				>
					<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
						<thead className="text-xs text-gray-700 uppercase bg-primary dark:bg-gray-700 dark:text-gray-400 sticky top-0">
							<tr>
								<th scope="col" className="px-6 py-3 uppercase">
									Line
								</th>
								<th scope="col" className="px-6 py-3 uppercase max-h-fit">
									produit
								</th>

								<th scope="col" className="px-6 py-3 uppercase max-h-fit">
									description
								</th>

								<th scope="col" className="px-6 py-3">
									<div className="flex items-center gap-2">
										Type <IconSwitchVertical size={14} />
									</div>
								</th>
								<th scope="col" className="px-6 py-3 uppercase">
									<div className="flex items-center gap-2">
										Prix
										<IconSwitchVertical size={14} />
									</div>
								</th>
								<th scope="col" className="px-6 py-3 uppercase">
									<div className="flex items-center gap-2">
										quantité
										<IconSwitchVertical size={14} />
									</div>
								</th>

								<th scope="col" className="px-6 py-3 uppercase">
									valeur
								</th>
								<th scope="col" className="px-6 py-3 uppercase">
									Action
								</th>
							</tr>
						</thead>

						<tbody>
							{items.length > 0 ? (
								items.map((item, index) => (
									<Row
										{...item}
										key={index}
										line={index}
										handleDelete={() => {
											setItems(items.filter((_, i) => index !== i));
										}}
									/>
								))
							) : (
								<tr className="w-full">
									<td colSpan={9}>
										<div className="px-16 py-12 text-center flex flex-col justify-center items-center gap-2 font-medium uppercase tracking-wider font-mono text-4xl select-none">
											ajouter des produits
											<IconRefresh size={28} className="cursor-pointer" />
										</div>
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</section>
				<div className="flex items-center justify-between gap-2">
					<div className="flex gap-2 items-center">
						<Input
							// icon={<IconLetterCaseToggle stroke={1} />}
							label="Avance"
							value={avance}
							onChange={(e) => setAvance(Number(e.target.value))}
							type="number"
							className="w-full md:w-fit"
							placeholder="00.00 DH"
						/>
						<Input
							// icon={<IconLetterCaseToggle stroke={1} />}
							label="TVA"
							value={tva * 100}
							onChange={(e) =>
								setTVA(() => {
									const value = parseInt(e.target.value);
									if (value < 0) return 0;
									if (value > 100) return 1;
									return value / 100;
								})
							}
							type="number"
							className="w-full md:w-fit"
							placeholder="00.00 DH"
						/>
					</div>

					<div className="flex  justify-end gap-12">
						<GenerateInvoice handleClick={createInvoice} variation="avance" />
						<GenerateInvoice handleClick={createInvoice} variation="devis" />
						<GenerateInvoice handleClick={createInvoice} variation="" />
					</div>
				</div>
				<div className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 w-full flex justify-between pb-1 pt-4 px-12 gap-1.5 rounded-md shadow-sm box-border">
					<div></div>
					<div className="flex flex-col gap-.5 min-w-[175px]">
						<div className="text-base font-medium text-black flex gap-12 justify-between">
							<div>Total HT:</div>
							<div className="text-end">
								{Number(
									items.reduce((prev, curr) => curr.total + prev, 0)
								).toFixed(2)}{" "}
								DH
							</div>
						</div>
						<div className="text-base font-medium text-black flex gap-12 justify-between">
							<div>TVA: ({tva * 100} %)</div>
							<div className="text-end flex gap-1">
								{Number(
									items.reduce((prev, curr) => curr.total + prev, 0) * tva
								).toFixed(2)}{" "}
								DH
							</div>
						</div>
						<div className="text-base font-medium text-black flex gap-12 justify-between">
							<div>Total TTC:</div>
							<div className="text-end">
								{Number(
									items.reduce((prev, curr) => curr.total + prev, 0) +
										items.reduce((prev, curr) => curr.total + prev, 0) * tva
								).toFixed(2)}{" "}
								DH
							</div>
						</div>
						<div className="text-base font-medium text-black flex gap-12 justify-between">
							<div>Avance:</div>{" "}
							<div className="text-end">
								{Number(avance ?? 0).toFixed(2)} DH
							</div>
						</div>
						<div className="text-base font-medium text-black flex gap-12 justify-between">
							<div>rest:</div>{" "}
							<div className="text-end">
								{Number(
									items.reduce((prev, curr) => curr.total + prev, 0) +
										items.reduce((prev, curr) => curr.total + prev, 0) * tva -
										avance
								).toFixed(2)}{" "}
								DH
							</div>
						</div>
					</div>
				</div>
			</form>
		</Layout>
	);
}

function Row({
	line,
	product,
	description,
	quantity,
	price,
	total,
	type,
	handleDelete,
}: { line: number; handleDelete: () => void } & Item): JSX.Element {
	return (
		<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 even:bg-orange-50/60">
			<th
				scope="row"
				className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
			>
				{line + 1}
			</th>
			<th
				scope="row"
				className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
			>
				{product}
			</th>
			<td className="px-6 py-4 text-black">
				{description ? description : "Pas de description"}
			</td>
			<td className="px-6 py-4 text-black">{type}</td>
			<td className="px-6 py-4 text-black">{price} DH</td>
			<td className="px-6 py-4 text-black">{quantity}</td>
			<td className="px-6 py-4 text-black">{total} DH</td>
			<td className="px-6 py-4 text-black flex justify-center w-full gap-7">
				<span
					className="text-red-500 text-base cursor-pointer"
					onClick={() => {
						handleDelete();
					}}
				>
					delete
				</span>
			</td>
		</tr>
	);
}
