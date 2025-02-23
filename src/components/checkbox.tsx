interface Props {
	children: string,
	default?: boolean;
	onChecked?: (value: boolean) => void
}

export default function Checkbox({children, default: def = false, onChecked}: Props){
	return (
		<label className="flex items-center space-x-3">
          <input 
			type="checkbox" 
			defaultChecked={def} 
			className="form-checkbox h-5 w-5 text-gray-600" 
			onChange={(e) => {
				if(e.target && onChecked){
					onChecked((e.target as HTMLInputElement).checked)
				}
			}}
		  />
          <span className="text-gray-700 font-medium">{children}</span>
        </label>
	)
}