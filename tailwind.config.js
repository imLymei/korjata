/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				'primary-one-300': '#00d176',
				'primary-one-200': '#00a65e',
				'primary-one-100': '#007844',
				'primary-two-300': '#225edd',
				'primary-two-200': '#1a48aa',
				'primary-two-100': '#143782',
				ascent: '#789fdd',
			},
		},
	},
	plugins: [],
};
