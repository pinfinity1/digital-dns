import {defaultPlugins, defineConfig} from '@hey-api/openapi-ts';


export default defineConfig({
    input: 'https://test.samanii.com/swagger/v1/swagger.json',
    output: {
        format: 'prettier',
        lint: 'eslint',
        path: './src/client',
    },
    plugins: [
        ...defaultPlugins,
        '@hey-api/client-axios',
        '@hey-api/schemas',
        {
            dates: true,
            name: '@hey-api/transformers',
        },
        {
            enums: 'typescript',
            name: '@hey-api/typescript',
        },
        {
            name: '@hey-api/sdk',
            transformer: true,
        },
        '@tanstack/react-query',
    ],
});