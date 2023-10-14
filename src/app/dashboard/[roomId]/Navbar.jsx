// Client Components
import Chat from "./Chat";
import Tools from "./Tools";

export default async function Navbar({ roomId, currPlayer }) {
	return (
		<div className="absolute top-0 right-0 flex items-center justify-end px-4 py-2 gap-8 bg-transparent">
			<Tools />
			<Chat currPlayer={currPlayer} />
		</div>
	);
}
