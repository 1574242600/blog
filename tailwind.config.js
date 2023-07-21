module.exports = {
    content: [
        './src/pages/**/*.{js,jsx,ts,tsx}',
        './src/components/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
        extend: {
            margin: {
                '1/4': '25%'
            },
            screens: {
                '2xl-m': { max: '1535px' },
                'xl-m': { max: '1279px' },
                'lg-m': { max: '1023px' },
                'md-m': { max: '767px' },
                'sm-m': { max: '639px' }
            }
        }
    },
    plugins: []
}
