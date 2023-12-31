import { type Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				table: 'rgba(130, 119, 141, 0.2)',
				whitegreen: '#72e9af',
				whitepurple: '#B176EB',
				paidgreenfg: '#148F43',
				declinedredbg: '#FFEBEB',
				declinedredfg: '#CC5A5D',
				pendingyellowbg: '#FEF5E6',
				pendingyellowfg: '#DFA62E',
				darkpurple: '#82778D'
			},
			boxShadow: {
				default: '0 0 6px 3px'
			}
		}
	},
	plugins: []
} satisfies Config;
