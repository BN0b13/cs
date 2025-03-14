export const sectionTypes = [
    {
        type: 'app-slideshow',
        name: 'App Slideshow',
        requires: {
            shop: false
        }
    },
    {
        type: 'app-links',
        name: 'App Links',
        requires: {
            shop: false
        }
    },
    {
        type: 'product-slideshow',
        name: 'Product Slideshow',
        requires: {
            shop: true
        }
    },
    {
        type: 'app-information',
        name: 'App Information',
        requires: {
            shop: false
        }
    },
    // media section
    // testimonials
    // contact
];