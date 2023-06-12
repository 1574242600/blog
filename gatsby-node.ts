exports.onCreateWebpackConfig = ({ actions }: { actions: any }) => {
    actions.setWebpackConfig({
        devtool: process.env.develop ? 'source-map' : false
    })
}
