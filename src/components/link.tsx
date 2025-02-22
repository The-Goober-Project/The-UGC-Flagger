import { cn } from "../lib/utils"

interface Props {
	url: string,
	className?: string,
	children: string
}

export default function Link({className = "", url, children}: Props){
	return (
		<a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn("text-blue-400 hover:underline", className)}
        >
          {children}
        </a>
	)
}