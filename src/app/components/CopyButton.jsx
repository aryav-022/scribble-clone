"use client";

export default function CopyButton({ content }) {
    let timeout = null;

	function copyToClipboard(e) {
		navigator.clipboard.writeText(content);
		e.target.classList.remove("after:hidden");

        if (timeout) {
            clearTimeout(timeout);
        }

		timeout = setTimeout(() => {
			e.target.classList.add("after:hidden");
		}, 1500);
	}

	return (
		<button
            type="button"
			className="relative block w-max text-lg text-center cursor-pointer rounded-xl box-border bg-primary bg-opacity-40 py-2 px-4 text-disabled focus:outline-none hover:text-secondary transition-colors after:absolute after:content-['copied!'] after:bg-secondary after:px-2 after:text-sm after:rounded after:bottom-0 after:right-0 after:hidden"
			onClick={copyToClipboard}
		>
			{content}
		</button>
	);
}
