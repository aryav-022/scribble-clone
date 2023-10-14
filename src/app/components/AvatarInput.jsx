"use client";

import { useRef, useEffect } from "react";

export default function AvatarInput() {
	const avatarInput = useRef();
	const avatarButton = useRef();

	function generateSeed() {
		const alphabet = "abcdefghijklmnopqrstuvwxyz";
		const size = Math.floor(Math.random() * 5) + 5; // Random Number between 5 and 10
		let seed = "";

		for (let i = 0; i < size; i++) {
			seed += alphabet[Math.floor(Math.random() * alphabet.length)];
		}

		return seed;
	}

	function generateAvatar() {
		const seed = generateSeed();
		avatarButton.current.style.backgroundImage = `url(https://api.dicebear.com/7.x/big-smile/svg?seed=${seed})`;
		avatarInput.current.value = seed;
	}

	useEffect(generateAvatar, []);

	return (
		<>
			<button
				type="button"
				className="h-32 aspect-square bg-no-repeat"
				ref={avatarButton}
				onClick={generateAvatar}
			></button>
			<input type="hidden" name="avatar" id="avatar" required ref={avatarInput} />
		</>
	);
}
