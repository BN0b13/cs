export const setMobileView = () => {
    if(window.screen.width > 500) {
        return false;
    }
    return true;
}