/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                slate: {
                    850: '#151e2e',
                    900: '#0f172a',
                },
                agri: {
                    green: '#10b981',
                    light: '#d1fae5',
                    dark: '#047857'
                }
            }
        },
    },
    plugins: [],
}
