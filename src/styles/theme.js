import { setMobileView, setTabletView } from "../tools/mobileView";

//Height

export const headerHeight = '8vh';
export const bodyHeight = '80vh';
export const footerHeight = '12vh';

// Slideshow

export const slideshowDimensions = setMobileView() ? '200px' : setTabletView() ? '300px' : '600px';
export const componentSlideshowHeight = setMobileView() ? '260px' : setTabletView() ? '280px' : '350px';
export const componentSlideshowWidth = setMobileView() ? '200px' : setTabletView() ? '200px' : '230px';
export const slideshowSpanText = setMobileView() ? '15px' : '25px';