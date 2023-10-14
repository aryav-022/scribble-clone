// Libraries
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";

// Components
import AvatarInput from "./components/AvatarInput";
import CopyButton from "./components/CopyButton";

export default async function Home() {
	const roomId = uuidv4();

	async function handleSubmit(formData) {
		"use server";

		const userName = formData.get("userName");
		const avatar = formData.get("avatar");
		const joinRoomId = formData.get("joinRoomId");

		if (joinRoomId) {
			redirect(`/room/${joinRoomId}?userName=${userName}&avatar=${avatar}`);
		} else {
			redirect(`/room/${roomId}?userName=${userName}&avatar=${avatar}`);
		}
	}

	return (
		<div className="relative h-screen w-screen overflow-x-hidden overflow-y-auto">
			<main className="p-8">
				<h1 className="w-fit text-5xl mx-auto max-sm:text-4xl">Scribble Clone</h1>

				<form action={handleSubmit} className="flex flex-wrap justify-center gap-16 mt-16 max-sm:gap-4 max-sm:mt-4">
					{/* Profile Section */}
					<div className="flex flex-col gap-4 p-8 w-fit rounded-3xl bg-secondary bg-opacity-70 max-sm:scale-90">
						<h1 className="text-3xl">Profile</h1>
						<div className="flex items-center max-sm:flex-col max-sm:items-start">
							<label htmlFor="userName" className="text-xl mr-4 after:content-['*'] after:text-red-400">
								Username
							</label>
							<input
								type="text"
								name="userName"
								id="userName"
								placeholder="Enter Username"
								required
								autoComplete="on"
								className="py-2 px-4 bg-secondary bg-opacity-80 rounded"
							/>
						</div>
						<div className="flex gap-2 items-center">
							<div htmlFor="avatar" className="text-xl">
								Your Avatar
							</div>
							<AvatarInput />
						</div>
					</div>

					{/* Join Room Section */}
					<div className="flex flex-col gap-6 p-6 bg-secondary bg-opacity-70 rounded-3xl w-fit max-sm:scale-75">
						<div className="flex flex-col gap-1">
							<label htmlFor="joinRoomId" className="text-xl">Join Room</label>
							<input
								type="text"
								name="joinRoomId"
								id="joinRoomId"
								placeholder="Enter Room Id"
								className="text-lg rounded-xl bg-primary bg-opacity-40 py-2 px-4"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<h1 className="text-xl">Create Room</h1>
							<CopyButton content={roomId} />
						</div>
						<button
							type="submit"
							className="py-2 px-1 bg-primary bg-opacity-40 rounded-lg hover:bg-opacity-60"
						>
							Join
						</button>
					</div>
				</form>
			</main>

			{/* Background Images */}
			<img
				src="https://api.dicebear.com/7.x/big-smile/svg"
				alt=""
				className="block absolute bottom-0 left-0 h-64 w-64 -rotate-12 -z-10 max-md:h-40 max-md:w-40 max-sm:hidden"
			/>
			<img
				src="https://api.dicebear.com/7.x/big-smile/svg?seed=jake&flip=true"
				alt=""
				className="block absolute bottom-0 right-0 h-64 w-64 rotate-12 -z-10 max-md:w-40 max-sm:hidden"
			/>
		</div>
	);
}
