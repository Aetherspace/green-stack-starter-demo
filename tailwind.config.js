const { plugin } = require('twrnc');

module.exports = {
    plugins: [
        plugin(({ addUtilities }) => {
            addUtilities({
                'roboto': {
                    fontFamily: 'Roboto',
                },
                'roboto-light': {
                    fontFamily: 'RobotoLight',
                    fontWeight: '300',
                },
                'roboto-bold': {
                    fontFamily: 'RobotoBold',
                    fontWeight: '700',
                },
                'roboto-black': {
                    fontFamily: 'RobotoBlack',
                    fontWeight: '900',
                }
            })
        })
    ]
}
