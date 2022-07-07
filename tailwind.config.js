/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		screens: {
			mobile: '320px',
			tablet: '810px',
			laptop: '1024px',
			desktop: '1280px',
		},
		fontFamily: {
			sans: ['Helvetica', 'Arial', 'sans-serif'],
			serif: ['ui-serif', 'Georgia'],
			mono: ['ui-monospace', 'SFMono-Regular'],
			display: ['Oswald'],
			body: ['Open Sans'],
			poppins: ['Poppins'],
		},
		extend: {
			colors: {
				merahTua: '#9B3131',
				biru: '#71AAD2',
				hijau: '#7EB47D',
				merahMuda: '#BD5050',
				unguTua: '#5860A9',
			},
		},
	},
	plugins: [],
};
