"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function JoinForm({ randomRoomId }) {
	const router = useRouter();

	const roomIdRef = useRef(null);
	const userNameRef = useRef(null);
	const avatarRef = useRef(null);
	const copyBtnRef = useRef(null);

	function copyToClipboard() {
		copyBtnRef.current.classList.remove("after:hidden");
		setTimeout(() => {
			copyBtnRef.current.classList.add("after:hidden");
		}, 2000);
		navigator.clipboard.writeText(randomRoomId);
	}

	function joinRoom() {
		const roomId = roomIdRef.current.value || randomRoomId;
		const userName = userNameRef.current.value;

		if (userName === "") {
			userNameRef.current.focus();
			return;
		}

		router.push(`/waiting-room?roomId=${roomId}&userName=${userName}`);
	}

	function changeAvatar() {
		avatarRef.current.src = `https://api.dicebear.com/7.x/big-smile/svg?seed=${Math.random()}`;
	}

	return (
		<div className="flex flex-wrap mt-16 justify-center gap-16">
			{/* Profile Section */}
			<div className="flex flex-col gap-4 p-8 w-fit rounded-3xl bg-secondary bg-opacity-70 max-sm:scale-90">
				<h1 className="text-3xl">Profile</h1>
				<div className="flex items-center max-sm:flex-col max-sm:items-start">
					<label htmlFor="username" className="text-xl mr-4 after:content-['*'] after:text-red-400">
						Username
					</label>
					<input
						ref={userNameRef}
						type="text"
						id="username"
						name="userName"
						placeholder="Enter Username"
						required
						className="py-2 px-4 bg-secondary bg-opacity-80 rounded"
					/>
				</div>
				<div className="flex gap-2 items-center">
					<label htmlFor="avatar" className="text-xl">Your Avatar</label>
					<img
						ref={avatarRef}
						src={`https://api.dicebear.com/7.x/big-smile/svg?seed=${Math.random()}`}
						alt=""
						height={128}
						width={128}
						className="mr-4"
					/>
					<button onClick={changeAvatar}>
						<svg
							className="fill-primary h-8 aspect-square -scale-x-100 cursor-pointer"
							xmlns="http://www.w3.org/2000/svg"
							height="1em"
							viewBox="0 0 512 512"
						>
							<path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" />
						</svg>
					</button>
				</div>
			</div>

			{/* Room Section */}
			<div className="flex flex-col gap-6 p-6 bg-secondary bg-opacity-70 rounded-3xl w-fit max-sm:scale-90">
				<div className="flex flex-col gap-1">
					<h1 className="text-xl">Join Room</h1>
					<input
						ref={roomIdRef}
						type="text"
						name="roomId"
						id="roomId"
						placeholder="Enter Room Id"
						className="text-lg rounded-xl bg-primary bg-opacity-40 py-2 px-4"
					/>
				</div>
				<div className="flex flex-col gap-1">
					<h1 className="text-xl">Create Room</h1>
					<div className="">
						<button
							ref={copyBtnRef}
							onClick={copyToClipboard}
							className="relative flex w-full gap-2 items-center text-opacity-80 hover:text-opacity-100 text-lg text-disabled bg-primary bg-opacity-40 px-4 py-2 rounded-xl after:absolute after:content-['copied!'] after:text-primary after:bottom-0 after:right-0 after:text-sm after:bg-primary after:bg-opacity-30 after:py-1 after:px-2 after:rounded-md after:hidden"
						>
							{randomRoomId}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="fill-disabled"
								height="1em"
								viewBox="0 0 448 512"
							>
								<path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z" />
							</svg>
						</button>
					</div>
				</div>
				<button
					className="py-2 px-1 bg-primary bg-opacity-40 rounded-lg hover:bg-opacity-60"
					onClick={joinRoom}
				>
					Join
				</button>
			</div>
		</div>
	);
}
