import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            colors: {
                primary: '#7C1A22',
                secondary: '#E5B82C',
                cream: '#FAF8F2',
                accent: '#0F5132',
                darktext: '#2D2D2D',
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                playfair: ['Playfair Display', 'serif'],
            },
        },
    },

    plugins: [forms],
};
