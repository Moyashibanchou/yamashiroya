/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
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
            }
        },
    },
    plugins: [],
}
