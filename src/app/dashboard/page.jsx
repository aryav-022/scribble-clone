// Server Libraries
import path from "path";
import { promises as fs } from "fs";

// Server Components
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

// Client Components
import SlateContextProvider from "./SlateContext"; 

export default async function Page({ searchParams }) {
	const { roomId, userName } = searchParams;

	const filePath = path.join(process.cwd(), "src", "data", "rooms.json");
	const fileData = await fs.readFile(filePath, "utf8");
	const rooms = JSON.parse(fileData);
	const players = rooms[roomId].players;
	const currPlayer = players.find((player) => player.userName === userName);

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<SlateContextProvider>
				<Navbar roomId={roomId} currPlayer={currPlayer} />
				<Sidebar room={rooms[roomId]} userName={currPlayer.userName} />
			</SlateContextProvider>
			<div className="absolute bottom-1 right-2 text-xl">Room ID: {roomId}</div>
		</div>
	);
}
