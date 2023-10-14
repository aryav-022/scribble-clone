export default async function Card({ avatar, userName }) {
	return (
		<div className="relative flex flex-col items-center justify-end h-full aspect-square p-4 rounded-xl bg-secondary">
			<img src={`${process.env.NEXT_PUBLIC_AVATAR_API}?seed=${avatar}`} alt="" className="absolute block h-[100%-1rem] aspect-square -top-4" />
			<div className="text-xl h-7 line-clamp-1 overflow-ellipsis">{userName}</div>
		</div>
	);
}
