/* This example requires Tailwind CSS v2.0+ */
import {
	ChangeEvent,
	Dispatch,
	Fragment,
	SetStateAction,
	useState,
} from "react";
import { Listbox, Transition, Combobox } from "@headlessui/react";
import { IconCheck, IconSelector } from "@tabler/icons-react";
import { classNames } from "@/utils/classNames";
import { useDebounce } from "@/hooks";

interface selectProps {
	options: string[];
	placeHolder?: string;
	label: string;
	className?: string;
	position?: "top" | "bottom";
	onChange: any;
	selected: string;
	value: string;
}

export function Select({ options, label, selected, ...props }: selectProps) {
	return (
		<div className="w-full md:w-fit flex-grow">
			<Listbox value={selected} onChange={props.onChange}>
				{({ open }) => (
					<>
						<Listbox.Label className="block text-sm font-medium text-gray-700">
							{label}
						</Listbox.Label>
						<div className="mt-[0.6rem] relative">
							<Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent  sm:text-sm">
								<span className="block truncate py-[3px] uppercase">
									{selected}
								</span>
								<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
									<IconSelector
										className="h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
								</span>
							</Listbox.Button>

							<Transition
								show={open}
								as={Fragment}
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm border-gray-300 ">
									{options.map((option, index) => (
										<Listbox.Option
											key={index}
											className={({ active }) =>
												classNames(
													active ? "text-white bg-accent" : "text-gray-900",
													"cursor-default select-none relative py-2 pl-3 pr-9"
												)
											}
											value={option}
										>
											{({ selected, active }) => (
												<>
													<span
														className={classNames(
															selected ? "font-semibold" : "font-normal",
															"block truncate uppercase"
														)}
													>
														{option}
													</span>

													{selected ? (
														<span
															className={classNames(
																active ? "text-white" : "text-indigo-600",
																"absolute inset-y-0 right-0 flex items-center pr-4"
															)}
														>
															<IconCheck
																className="h-5 w-5"
																aria-hidden="true"
															/>
														</span>
													) : null}
												</>
											)}
										</Listbox.Option>
									))}
								</Listbox.Options>
							</Transition>
						</div>
					</>
				)}
			</Listbox>
		</div>
	);
}

export function SelectWithSearch({
	options,
	placeHolder,
	label,
	className,
	position,
	onChange,
	selected,
}: selectProps) {
	const [throttledQuery, setThrottledQuery] = useState<string>("");
	const query = useDebounce<string>(throttledQuery);
	// const [selectedOption, setSelectedOption] = useState<string>();

	const queryResult: string[] =
		query === ""
			? options
			: options.length > 0
			? options.filter((option) =>
					option.toLocaleLowerCase().includes(query.toLocaleLowerCase())
			  )
			: [];

	return (
		<Combobox
			as="div"
			value={selected}
			onChange={onChange}
			className={classNames(className as string, "gap-2")}
		>
			<Combobox.Label className="block text-sm font-medium text-gray-700 ">
				{label}
			</Combobox.Label>
			<div className="relative mt-1">
				<Combobox.Input
					className="w-full rounded-md border border-gray-300 bg-white py-2.5 pl-3 pr-10 shadow-sm focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary sm:text-sm"
					onChange={(event) => setThrottledQuery(event.target.value)}
					placeholder={placeHolder}
				/>
				<Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
					<IconSelector className="h-5 w-5 text-gray-400" aria-hidden="true" />
				</Combobox.Button>

				{options.length > 0 && (
					<Combobox.Options
						className={classNames(
							"absolute z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-secondary ring-opacity-5 focus:outline-none sm:text-sm",
							position === "top" ? "bottom-full mb-3" : "top-full mt-3"
						)}
					>
						{queryResult.map((option, index) => (
							<Combobox.Option
								key={index}
								value={option}
								className={({ active }) =>
									classNames(
										"relative cursor-default select-none py-2 pl-3 pr-9",
										active ? "bg-blue-vitsa text-white" : "text-gray-900"
									)
								}
							>
								{({ active, selected }) => (
									<>
										<span
											className={classNames(
												"block truncate",
												selected
													? "font-semibold text-blue-vista bg-blue-vista"
													: "text-black"
											)}
										>
											{option}
										</span>

										{selected && (
											<span
												className={classNames(
													"absolute inset-y-0 right-0 flex items-center pr-4",
													active ? "text-white" : "text-black"
												)}
											>
												<IconCheck className="h-5 w-5" aria-hidden="true" />
											</span>
										)}
									</>
								)}
							</Combobox.Option>
						))}
					</Combobox.Options>
				)}
			</div>
		</Combobox>
	);
}

interface SelectWithSearchLablesAndValuesProps
	extends Omit<selectProps, "options" | "selected"> {
	options: { label: string; value: string }[];
	selected: { label: string; value: string };
}

export function SelectWithSearchLablesAndValues({
	options,
	placeHolder,
	label,
	className,
	position,
	onChange,
	selected,
}: SelectWithSearchLablesAndValuesProps) {
	const [throttledQuery, setThrottledQuery] = useState<string>("");
	const query = useDebounce<string>(throttledQuery);
	// const [selectedOption, setSelectedOption] = useState<string>();

	const queryResult: typeof options =
		query === ""
			? options
			: options.length > 0
			? options.filter((option) =>
					option.label.toLocaleLowerCase().includes(query.toLocaleLowerCase())
			  )
			: [];

	return (
		<Combobox
			as="div"
			value={selected}
			onChange={onChange}
			className={classNames(className as string, "gap-2")}
		>
			<Combobox.Label className="block text-sm font-medium text-gray-700 ">
				{label}
			</Combobox.Label>
			<div className="relative mt-1">
				<Combobox.Input
					className="w-full rounded-md border border-gray-300 bg-white py-2.5 pl-3 pr-10 shadow-sm focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary sm:text-sm"
					onChange={(event) => setThrottledQuery(event.target.value)}
					placeholder={placeHolder}
				/>
				<Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
					<IconSelector className="h-5 w-5 text-gray-400" aria-hidden="true" />
				</Combobox.Button>

				{options.length > 0 && (
					<Combobox.Options
						className={classNames(
							"absolute z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-secondary ring-opacity-5 focus:outline-none sm:text-sm",
							position === "top" ? "bottom-full mb-3" : "top-full mt-3"
						)}
					>
						{queryResult.map((option, index) => (
							<Combobox.Option
								key={index}
								value={option}
								className={({ active }) =>
									classNames(
										"relative cursor-default select-none py-2 pl-3 pr-9",
										active ? "bg-blue-vitsa text-white" : "text-gray-900"
									)
								}
							>
								{({ active, selected }) => (
									<>
										<span
											className={classNames(
												"block truncate",
												selected
													? "font-semibold text-blue-vista bg-blue-vista"
													: "text-black"
											)}
										>
											{option.label}
										</span>

										{selected && (
											<span
												className={classNames(
													"absolute inset-y-0 right-0 flex items-center pr-4",
													active ? "text-white" : "text-black"
												)}
											>
												<IconCheck className="h-5 w-5" aria-hidden="true" />
											</span>
										)}
									</>
								)}
							</Combobox.Option>
						))}
					</Combobox.Options>
				)}
			</div>
		</Combobox>
	);
}
