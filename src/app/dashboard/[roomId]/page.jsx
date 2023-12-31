// Server Libraries
import path from "path";
import { promises as fs } from "fs";

// Next Libraries
import Link from "next/link";

// Server Components
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

// Client Components
import SlateContextProvider from "./SlateContext"; 

export default async function Page({ params, searchParams }) {
	const { roomId } = params;
	const { userName, avatar } = searchParams;

	const filePath = path.join(process.cwd(), "src", "data", "rooms.json");
	const fileData = await fs.readFile(filePath, "utf8");
	const rooms = JSON.parse(fileData);

	if (rooms.hasOwnProperty(roomId) === false) {
		return (
			<div className="flex flex-col items-center justify-center gap-2 h-screen">
				<h1 className="text-4xl">Room Not Found</h1>
				<div>Return to Home Page</div>
				<Link href="/" className="py-2 px-4 bg-secondary rounded-lg hover:bg-secondary hover:bg-opacity-80">Home</Link>
				<div className="absolute bottom-1 right-2 text-xl">Room ID: {roomId}</div>
			</div>
		);
	}

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
