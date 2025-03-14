const maxScreenWidthMobile = 880;
const maxScreenWidthTablet = 1240;


export const setMobileView = () => {
    if(window.innerWidth >= maxScreenWidthMobile) {
        return false;
    }
    return true;
}

export const setTabletView = () => {
    if(window.innerWidth > maxScreenWidthTablet || window.innerWidth < maxScreenWidthMobile) {
        return false;
    }
    return true;
}