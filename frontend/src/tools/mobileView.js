const maxScreenWidthMobile = 880;
const maxScreenWidthTablet = 1240;


export const setMobileView = () => {
    if(window.screen.width >= maxScreenWidthMobile) {
        return false;
    }
    return true;
}

export const setTabletView = () => {
    if(window.screen.width > maxScreenWidthTablet || window.screen.width < maxScreenWidthMobile) {
        return false;
    }
    return true;
}