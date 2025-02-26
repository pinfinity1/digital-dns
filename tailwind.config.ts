import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			colors: {
  				white: '#FFF',
  				black: '#000',
  				'pr-lb-60': '#3A6669',
  				'pr-lb-65': '#488084',
  				'pr-lb-70': '#57999E',
  				'pr-lb-80': '#6EABAF',
  				'pr-lb-90': '#89BABE',
  				'pr-lb-95': '#A3C9CC',
  				'pr-lb-97': '#BDD9DB',
  				'pr-lb-99': '#D8E8E9',
  				'white-shade-90': '#F2F7F8',
  				'white-shade-95': '#E4EFF1',
  				'grey-shade-10': '#070C0D',
  				'grey-shade-11': '#0E181B',
  				'grey-shade-15': '#152428',
  				'grey-shade-20': '#1C3035',
  				'grey-shade-30': '#4C4C4D',
  				'grey-shade-35': '#59595A',
  				'grey-shade-40': '#656567',
  				'grey-shade-60': '#98989A',
  				'grey-shade-70': '#B3B3B3',
  				'grey-shade-75': '#BFBFBF'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
