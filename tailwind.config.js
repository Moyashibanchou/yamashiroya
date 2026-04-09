/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0055AA',
                },
                brand: {
                    dark: '#1A4A38',   /* Deep green */
                    light: '#2B5740',
                },
                accent: {
                    coral: '#E58989', /* Coral pink */
                    light: '#EBF2EE'
                }
            },
            fontFamily: {
                sans: ['Noto Sans JP', 'sans-serif'],
                serif: ['Noto Serif JP', 'serif'],
                hand: ['Yuji Syuku', 'Yuji Mai', 'Noto Serif JP', 'serif'],
            }
        },
    },
    plugins: [],
}
