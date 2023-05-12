/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./layouts/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			aspectRatio: {
				"video-portrait": "10 / 16",
			},
			colors: {
				primary: "#F5E7D6",
				secondary: "#FFD8C2",
				accent: "#9984D4",
				dark: "#222222",
				blue: {
					vitsa: "#8093F1",
				},
				pink: {
					orchid: "#F6C0D0",
					lavendar: "#d0a5c0",
				},
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},

			borderRadius: {
				"4xl": "2rem",
				"5xl": "2.5rem",
			},
			animation: {
				compass: "compass_rotate 2s alternate infinite",
			},
			keyframes: {
				compass_rotate: {
					"0%": { transform: "rotate(45deg)" },
					"30%, 50%, 70%": { transform: "rotate(230deg)" },
					"40%, 60%, 80%": { transform: "rotate(240deg)" },
					"100%": { transform: "rotate(245deg)" },
				},
			},
		},
	},
	plugins: [require("tailwind-scrollbar"), require("@tailwindcss/forms")],
};

//
