import {cn} from "../lib/utils"

type ButtonVariant = "Casual" | "Danger" | "Primary"

interface ButtonProps {
	onClick?: () => void;
	disabled?: boolean;
	children: string;
	className?: string
	variant?: ButtonVariant
}

export default function Button({ onClick, disabled = false, children, variant = "Casual", className = "" }: ButtonProps) {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={cn(
				`w-1/2 h-12 rounded transition duration-300 ease-in-out transform`,
				className,
				{
					'opacity-50 cursor-not-allowed': disabled,
					"hover:cursor-pointer hover:scale-102": !disabled,

					"bg-gray-500 hover:bg-gray-600 active:bg-gray-700": variant == "Casual",
					"bg-blue-500 hover:bg-blue-600 active:bg-blue-700": variant == "Primary",
					'bg-red-500 hover:bg-red-600 active:scale-97 active:bg-red-700': variant == "Danger"
				}
			)}
		>
			{children}
		</button>
	);
}