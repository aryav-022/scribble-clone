"use client";

import { useRef, useEffect } from "react";

export default function Chat({ currPlayer }) {
	const speakRef = useRef(null);
	const timeRef = useRef(null);

	function handleKeyDown(event) {
		if (event.key === "Enter") {
			speakRef.current.textContent = event.target.value;
			speakRef.current.classList.remove("hidden");
			setTimeout(() => {
				speakRef.current.textContent = "";
				speakRef.current.classList.add("hidden");
			}, 1000);
			event.target.value = "";
		}
	}

	useEffect(() => {
		let time = 60;
		const interval = setInterval(() => {
			timeRef.current.textContent = time;
			time--;
			if (time === -1) {
				clearInterval(interval);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="flex items-center gap-2">
			<div className="relative">
				<img
					src={`${process.env.NEXT_PUBLIC_AVATAR_API}?seed=${currPlayer.avatar}`}
					alt=""
					className="inline-block h-16 w-16"
				/>
                <div
                    ref={speakRef}
                    className="absolute hidden top-1/2 left-full bg-secondary px-2 py-1 rounded-lg max-w-[240px] whitespace-nowrap overflow-hidden"
                ></div>
			</div>
			<input
				type="text"
				placeholder="Guess"
				className="bg-secondary px-2 py-1 text-lg rounded"
				onKeyDown={handleKeyDown}
			/>
			<div ref={timeRef} className="grid place-items-center h-12 w-12 text-xl rounded-full bg-secondary">
				60
			</div>
		</div>
	);
}
