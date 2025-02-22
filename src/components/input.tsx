import { cn } from "../lib/utils";

interface Props {
	className?: string;
	placeholder?: string;
	value?: string;
	onChange?: (e: Event) => void;
	disabled?: boolean;
}

export default function Input({className, placeholder, value, onChange, disabled = false}: Props){
	return (
		<input
			className={cn(
				`border border-gray-400 placeholder-gray-600 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-900 transition duration-300 ease-in-out transform focus:scale-101"`, 
				className, 
				{
				"border-gray-300 placeholder-gray-300 cursor-not-allowed": disabled
				}
			)}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			disabled={disabled}
		/>
	)
}