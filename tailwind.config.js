module.exports = {
  mode: 'jit',
	purge: [
		'./**/*.html',
    './*.html'
	],
  theme: {
		fontFamily: {
			sans: ['Inter', 'sans-serif'],
		},
    extend: {},
  },
  variants: {
    extend: {
			textColor: ['visited'],
		},
  },
  plugins: [],
}
