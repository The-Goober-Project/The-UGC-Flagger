import { cn } from "../lib/utils";

interface Props {
	className?: string;
	placeholder?: string;
	value?: string;
	onChange?: (e: Event) => void;
}

export default function Input({className, placeholder, value, onChange}: Props){
	return (
		<input
			className={cn(`border border-gray-400 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-900 transition duration-300 ease-in-out transform focus:scale-101"`, className)}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	)
}