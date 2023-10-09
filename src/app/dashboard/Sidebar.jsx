import Card from "../components/Card";

export default async function Sidebar({ room, userName }) {
	return (
		<div className="absolute h-screen left-0 px-4 py-2 bg-transparent overflow-auto">
            {
                room.players.map((player, index) => (
                    player.userName !== userName && 
                    <div key={index} className="h-36 my-2">
                        <Card avatar={player.avatar} userName={player.userName} />
                    </div>
                ))
            }
		</div>
	);
}
