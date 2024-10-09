module.exports = {
    branches: [
        '+([0-9])?(.{+([0-9]),x}).x',
        {
            name: 'development',
            channel: false,
        },
        {
            name: 'main',
            channel: 'main',
            prerelease: 'main',
        },
    ],
    plugins: [
        [
            '@semantic-release/commit-analyzer',
            {
                preset: 'conventionalcommits',
                releaseRules: [
                    {
                        breaking: true,
                        release: 'major',
                    },
                    {
                        type: 'feat',
                        release: 'minor',
                    },
                    {
                        type: 'fix',
                        release: 'patch',
                    },
                    {
                        type: 'docs',
                        scope: 'README',
                        release: 'patch',
                    },
                    {
                        type: 'chore',
                        release: 'patch',
                    },
                ],
                parserOpts: {
                    noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING'],
                },
            },
        ],
        '@semantic-release/release-notes-generator',
        [
            '@semantic-release/npm',
            {
                npmPublish: false,
            },
        ],
        '@semantic-release/gitlab',
    ],
};
