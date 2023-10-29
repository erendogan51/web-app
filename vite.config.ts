import {resolve} from 'path'
import {defineConfig} from 'vite'

/** @type {import('vite').UserConfig} */
export default defineConfig({
    base: '',

    root: './',

    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, './index.html'),
                pokemon: resolve(__dirname, './src/pokemon/index.html'),
            },
        },
    },

    publicDir: 'public',

    assetsInclude: ['assets'],

    server: {
        port: 3000,
        open: true,
    },
});