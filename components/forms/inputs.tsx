import { classNames } from "@/utils/classNames";
import { IconExclamationCircle } from "@tabler/icons-react";

interface inputProps {
	label: string;
	error?: string;
	description?: string;
	onChange?: (val: any) => void;
	onFocus?: () => void;
	onBlur?: () => void;
	value: any;
	type: string;
	placeholder?: string;
	icon?: JSX.Element;
	className?: string;
}

export function Input({
	label,
	description,
	error,
	icon,
	className,
	...rest
}: inputProps): JSX.Element {
	return (
		<div
			className={classNames("flex flex-col gap-2", className ? className : "")}
		>
			<label className="block text-md font-medium text-gray-700 capitalize">
				{label}
			</label>
			<div className="flex flex-col gap-1">
				{description && <p className="text-sm text-gray-500">{description}</p>}
				<div className="relative">
					{icon && (
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							{icon}
						</div>
					)}
					<input
						{...rest}
						// className="shadow-sm focus:ring-orange-400 focus:border-orange-400 block w-full sm:text-sm border-gray-300 rounded-md pl-10"
						className={classNames(
							"shadow-sm block w-full sm:text-sm  rounded-md  py-2.5",
							icon ? 'pl-10': 'pl-3',
							error
								? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
								: "focus:ring-orange-400 focus:border-orange-400 border-gray-300"
						)}
						// aria-describedby="email-description"
					/>
					{error && (
						<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
							<IconExclamationCircle
								className="h-5 w-5 text-red-500"
								aria-hidden="true"
							/>
						</div>
					)}
				</div>
				{error && (
					<p className="text-sm text-red-600" id="email-error">
						{error}
					</p>
				)}
			</div>
		</div>
	);
}
