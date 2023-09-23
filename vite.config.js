import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

const resources = (str) => `resources/${str}`;
const pages = (str) => resources(`js/pages/${str}`);

export default defineConfig({
    plugins: [
        laravel({
            input: [
                resources('css/app.css'),
                resources('js/app.js'),
                pages('users/users_list_view.tsx'),
            ],
            refresh: true,
        }),
    ],
});
