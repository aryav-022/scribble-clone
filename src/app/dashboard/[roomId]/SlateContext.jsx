"use client";

import Slate from "../../../libraries/Slate";
import { createContext, useContext, useEffect, useState, useRef } from "react";

const SlateContext = createContext();

export function useSlate() {
	return useContext(SlateContext);
}

export default function SlateContextProvider({ children }) {
	const canvasRef = useRef(null);
	const [slate, setSlate] = useState(null);

	useEffect(() => {
		if (slate) return;
		const canvas = canvasRef.current;
		setSlate(new Slate(canvas));
	}, [slate]);

	return (
		<SlateContext.Provider value={slate}>
			<canvas ref={canvasRef} className="block cursor-grab touch-none">
				Your browser does not support the canvas element.
			</canvas>

			{children}
		</SlateContext.Provider>
	);
}
