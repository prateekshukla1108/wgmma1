/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                nvidia: {
                    DEFAULT: '#76b900',
                    dark: '#5a8f00',
                    glow: '#91ff00'
                },
                chip: {
                    900: '#0a0a0c',
                    800: '#141418',
                    700: '#1e1e24',
                    border: '#333333'
                }
            },
            fontFamily: {
                mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', "Liberation Mono", "Courier New", 'monospace'],
            }
        },
    },
    plugins: [],
}
