"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function JoinForm() {
	const router = useRouter();

	const roomIdRef = useRef(null);
	const userNameRef = useRef(null);
	const copyToClipboardBtnRef = useRef(null);
	const avatarRef = useRef(null);

	function copyToClipboard() {
		copyToClipboardBtnRef.current.innerHTML = "Copied!";
		navigator.clipboard.writeText(randomRoomId);
	}

	function joinRoom() {
		const roomId = roomIdRef.current.value || copyToClipboardBtnRef.current.textContent;
		const userName = userNameRef.current.value;
        
        if (userName === "") {
            userNameRef.current.focus();
            return;
        }

		router.push(`/waiting-room?roomId=${roomId}&userName=${userName}`);
	}

	useEffect(() => {		
		const randomRoomId = parseInt(Math.random() * 1e5);
		avatarRef.current.src = `https://api.dicebear.com/7.x/big-smile/svg?seed=${randomRoomId}`;
		copyToClipboardBtnRef.current.textContent = randomRoomId;
	}, []);

	return (
		<div className="flex flex-wrap mt-16 justify-center gap-16">
			{/* Profile Section */}
			<div className="flex flex-col gap-4 p-8 rounded-3xl w-fit bg-secondary bg-opacity-70 max-sm:scale-90">
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
				<div className="flex flex-col gap-2">
					<label htmlFor="username" className="text-xl mr-4">
						Avatar
					</label>
					<div className="flex items-center max-sm:flex-col">
						<img
							ref={avatarRef}
							src="https://api.dicebear.com/7.x/big-smile/svg"
							alt=""
							className="block h-16 w-16 rounded-full mr-4"
						/>
						<input
							type="file"
							className="block w-full text-sm text-secondary
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-secondary file:text-primary
                                hover:file:bg-secondary hover:file:bg-opacity-80
                                file:cursor-pointer
                            "
						/>
					</div>
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
							onClick={copyToClipboard}
							className="flex w-full justify-between items-center text-opacity-80 hover:text-opacity-100 text-lg text-disabled bg-primary bg-opacity-40 px-4 py-2 rounded-xl"
							>
							<span ref={copyToClipboardBtnRef}></span>
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
