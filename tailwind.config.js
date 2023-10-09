/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				'primary': "#f1f1f1",
				'secondary': "#9f9f9f",
				'disabled': "#5d5d5d",
			},
			backgroundColor: {
				primary: "#010101",
				secondary: "#262627",
				active: "#4f4d6f",
			},
		},
	},
	plugins: [],
};
