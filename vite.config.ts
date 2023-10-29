import {resolve} from 'path'
import {defineConfig} from 'vite'

/** @type {import('vite').UserConfig} */
export default defineConfig({
    // Base URL for your application (e.g., '/my-app/' or an absolute URL like 'https://example.com/')
    base: '',

    // Root directory for your project
    root: './',

    // Build output directory
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, './index.html'),
                pokemon: resolve(__dirname, './src/pokemon/index.html'),
            },
        },
    },

    // Public directory (files in this directory are copied to the build output)
    publicDir: 'public',

    // Include additional files in the build (e.g., icons, fonts, etc.)
    assetsInclude: ['assets'],

    // Define your Vite plugins here
    plugins: [],

    // Configure the development server
    server: {
        port: 3000, // The port to run the development server
        open: true, // Automatically open the app in your default browser
    },
});