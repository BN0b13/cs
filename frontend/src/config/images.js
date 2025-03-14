export const imageRouter = {
    app: {
        background: {
            name: 'background',
            type: 'fill',
            path: require('../assets/img/custom/background.jpeg')
        },
        soldOut: {
            name: 'sold-out',
            type: 'fill',
            path: require('../assets/img/sold-out.png')
        }
    },
    logos: {
        logo: {
            name: 'logo',
            type: 'square',
            path: require('../assets/img/custom/logos/logo.png')
        },
        logoText: {
            name: 'logo-text',
            type: 'rectangle',
            path: require('../assets/img/custom/logos/logo-text.png')
        },
        logoTextMobile: {
            name: 'logo-text-mobile',
            type: 'square',
            path: require('../assets/img/custom/logos/logo-text-mobile.png')
        }
    },
    giveaways: {
        logo: {
            name: 'logo',
            type: 'square',
            path: require('../assets/img/custom/giveaways/logo.png')
        },
    },
    about: {
        profile: {
            name: 'logo',
            type: 'square',
            path: require('../assets/img/custom/logos/logo.png')
        }
    },
    welcome: {
        welcome: {
            background: {
                name: 'background',
                type: 'fill',
                path: require('../assets/img/custom/welcome/welcome/background.webp')
            }
        },
        shop: {
            background: {
                name: 'background',
                type: 'fill',
                path: require('../assets/img/custom/welcome/shop/background.webp')
            },
            profile: {
                name: 'profile',
                type: 'square',
                path: require('../assets/img/custom/welcome/shop/profile.webp')
            }
        }
    }
};