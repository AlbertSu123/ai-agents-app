module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: ['class', 'class'],
	plugins: [require('tailwindcss-safe-area'), require('tailwindcss-animate')],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			colors: {
				'custom-primary': '#FFFFFF',
				'custom-accent': '#666666',
				background: {
					DEFAULT: '#111111',
					foreground: '#FFFFFF',
				},
				primary: {
					DEFAULT: '#FFFFFF',
					foreground: '#111111',
				},
				secondary: {
					DEFAULT: '#333333',
					foreground: '#FFFFFF',
				},
				border: '#333333',
				input: '#333333',
				ring: '#666666',
			},
			fontFamily: {
				sans: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
				mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
			},
			boxShadow: {
				custom: 'none',
			},
		},
	},
}
