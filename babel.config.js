module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            '@babel/plugin-proposal-decorators',
            {
                legacy: true,
            },
        ],
        [
            'babel-plugin-root-import',
            {
                paths: [
                    {
                        rootPathSuffix: './src',
                        rootPathPrefix: '~/',
                    },
                    {
                        rootPathSuffix: './',
                        rootPathPrefix: '!/',
                    },
                ],
            },
        ],
        [
            'module-resolver',
            {
                root: ['./'],
                alias: {
                    '~': './src',
                },
            },
        ],
    ],
};
