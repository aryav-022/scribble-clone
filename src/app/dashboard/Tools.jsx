"use client";

import { useState, useRef, useEffect } from "react";
import { useSlate } from "./SlateContext";

export default function Tools() {
	const [isDisabled, setIsDisabled] = useState(false);
	const slate = useSlate();
	const toolsRef = useRef(null);

	function toggleSidebar() {
		console.log("toggleSidebar");
	}

	const keyMap = ["Pan", "Pencil", "Eraser"];

	function changeTool(key) {
        if (isDisabled) return;
		
		slate.setTool(keyMap[key - 1]);

		const tools = toolsRef.current.children;

		for (let i = 1; i < tools.length - 1; i++) {
			const tool = tools[i];
			if (i === key) {
				tool.classList.add("bg-active");
			} else {
				tool.classList.remove("bg-active");
			}
		}
	}

    function disableTools() {
        if (isDisabled) return;

        const tools = toolsRef.current.children;

        for (let i = 1; i < tools.length - 1; i++) {
            const tool = tools[i];
            tool.classList.remove("text-secondary");
            tool.classList.add("text-disabled");
            tool.disabled = true;
        }

        setIsDisabled(true);
    }

    function enableTools() {
        if (!isDisabled) return;

        const tools = toolsRef.current.children;

        for (let i = 1; i < tools.length - 1; i++) {
            const tool = tools[i];
            tool.classList.remove("text-disabled");
            tool.classList.add("text-secondary");
            tool.disabled = false;
        }

        setIsDisabled(false);
    }

	useEffect(() => {
		console.log("slate changed");

		function helper(e) {
			const key = e.key;
			if (key < "1" || key > "2") return;
			changeTool(parseInt(key));
		}

		window.addEventListener("keydown", helper);

		return () => {
			window.removeEventListener("keydown", helper);
		}
	}, [slate]);

	return (
		<section ref={toolsRef} className="h-fit bg-secondary rounded-lg">
			<button
				id="sidebar"
				data-tool="Hide/Show Sidebar"
				className="relative border-r-disabled bg-transparent fill-disabled m-1 pr-3 px-2 py-2 border-r after:absolute after:top-full after:left-1/2 after:z-20 after:p-1 after:text-white after:content-[attr(data-tool)] after:text-[10px] after:bg-secondary after:rounded-md after:whitespace-nowrap after:hidden hover:after:block"
                disabled
				onClick={toggleSidebar}
			>
				<svg
					className="h-6 aspect-square"
					xmlns="http://www.w3.org/2000/svg"
					height="1em"
					viewBox="0 0 448 512"
				>
					<path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
				</svg>
			</button>

			<button
				id="pan"
				data-tool="Pan"
				className="relative border-none p-2 bg-transparant m-1 cursor-pointer rounded-md text-secondary bg-active after:absolute after:top-full after:left-1/2 after:z-20 after:p-1 after:text-white after:content-[attr(data-tool)] after:text-[10px] after:bg-secondary after:rounded-md after:whitespace-nowrap after:hidden hover:after:block"
				onClick={() => changeTool(1)}
			>
				<svg
					className="h-6 aspect-square"
					aria-hidden="true"
					focusable="false"
					role="img"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<g strokeWidth="1.25">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
						<path d="M8 13v-7.5a1.5 1.5 0 0 1 3 0v6.5"></path>
						<path d="M11 5.5v-2a1.5 1.5 0 1 1 3 0v8.5"></path>
						<path d="M14 5.5a1.5 1.5 0 0 1 3 0v6.5"></path>
						<path d="M17 7.5a1.5 1.5 0 0 1 3 0v8.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7a69.74 69.74 0 0 1 -.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47"></path>
					</g>
				</svg>
				<div className="absolute text-[8px] z-10 px-[5px] py-0.5 rounded-[5px] right-0 bottom-0">1</div>
			</button>

			<button
				id="pencil"
				data-tool="Pencil"
				className="relative border-none p-2 bg-transparant m-1 cursor-pointer rounded-md text-secondary after:absolute after:top-full after:left-1/2 after:z-20 after:p-1 after:text-white after:content-[attr(data-tool)] after:text-[10px] after:bg-secondary after:rounded-md after:whitespace-nowrap after:hidden hover:after:block"
				onClick={() => changeTool(2)}
			>
				<svg
					className="h-6 aspect-square"
					aria-hidden="true"
					focusable="false"
					role="img"
					viewBox="0 0 20 20"
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<g strokeWidth="1.25">
						<path
							clipRule="evenodd"
							d="m7.643 15.69 7.774-7.773a2.357 2.357 0 1 0-3.334-3.334L4.31 12.357a3.333 3.333 0 0 0-.977 2.357v1.953h1.953c.884 0 1.732-.352 2.357-.977Z"
						></path>
						<path d="m11.25 5.417 3.333 3.333"></path>
					</g>
				</svg>
				<div className="absolute text-[8px] z-10 px-[5px] py-0.5 rounded-[5px] right-0 bottom-0">2</div>
			</button>

			<button
				id="eraser"
				data-tool="Eraser"
				className="relative border-none p-2 bg-transparant m-1 rounded-md text-disabled after:absolute after:top-full after:left-1/2 after:z-20 after:p-1 after:text-white after:content-[attr(data-tool)] after:text-[10px] after:bg-secondary after:rounded-md after:whitespace-nowrap after:hidden hover:after:block"
				onClick={() => changeTool(3)}
				disabled
			>
				<svg
					className="h-6 aspect-square"
					aria-hidden="true"
					focusable="false"
					role="img"
					viewBox="0 0 24 24"
					fill="none"
					strokeWidth="2"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<g strokeWidth="1.5">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
						<path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3"></path>
						<path d="M18 13.3l-6.3 -6.3"></path>
					</g>
				</svg>
				<div className="absolute text-[8px] z-10 px-[5px] py-0.5 rounded-[5px] right-0 bottom-0">3</div>
			</button>
		</section>
	);
}
