export default function TitleCard(){
	return (
		<div className="flex space-x-4 bg-gray-200 rounded-md justify-center text-center items-center w-1/2 h-1/6">
			<img
				src="https://cdn.thegoober.xyz/files/logo.png"
				alt="The Goober Project Logo"
				className="w-16 h-16 md:w-24 md:h-24"
			/>

			<div className="text-center md:text-left">
				<h1 className="text-xl md:text-2xl font-bold">The UGC Tracker</h1>
				<p className="text-sm md:text-base">A ROBLOX UGC Blacklister</p>
			</div>
		</div>
	)
}