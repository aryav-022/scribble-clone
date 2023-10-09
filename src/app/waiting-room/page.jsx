// Server Libraries
import fs from "fs";
import path from "path";
import Link from "next/link";

// Components
import Card from "../components/Card";

export default async function Page({ searchParams }) {
	const { roomId, userName } = searchParams;

	const rooms = JSON.parse(fs.readFileSync(path.join(process.cwd(), "src/data", `rooms.json`)));
	const players = rooms[roomId].players;

	return (
		<main className="flex flex-col gap-4 p-8">
			<h1 className="text-5xl">Waiting Room</h1>
			<div className="flex items-center gap-8">
				<h2 className="text-3xl">Room ID: {roomId}</h2>
				<Link
					href={`${process.env.BASE_URL}/dashboard?roomId=${roomId}&userName=${userName}`}
					className="h-full px-4 py-2 bg-lime-700 hover:bg-lime-800 rounded-lg text-xl"
				>
					Start
				</Link>
			</div>
			<div className="grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] mt-12 gap-x-4 gap-y-8">
				{players.map((player) => (
					<Card key={player.id} avatar={player.avatar} userName={player.userName} />
				))}
			</div>
		</main>
	);
}
