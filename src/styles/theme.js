import { setMobileView, setTabletView } from "../tools/mobileView";

// Text Color

export const textColorLight = '#fff';
export const textColorDark = '#000';

// Background Color

export const backgroundOpacityPages = '#000';
// export const backgroundOpacityPages = 'rgba(0,0,0, 0.9)';
export const backgroundOpacityLight = 'rgba(255,255,255, 0.6)';
export const backgroundOpacityDark = 'rgba(0,0,0, 0.6)';

// SVG Color

export const svgColorLight = 'filter: invert(99%) sepia(14%) saturate(5%) hue-rotate(260deg) brightness(112%) contrast(100%)';

//Height

export const headerHeight = '8vh';
export const bodyHeight = '80vh';
export const footerHeight = '12vh';

// Slideshow

export const slideshowDimensions = setMobileView() ? '200px' : setTabletView() ? '300px' : '600px';
export const componentSlideshowHeight = setMobileView() ? '260px' : setTabletView() ? '280px' : '350px';
export const componentSlideshowWidth = setMobileView() ? '200px' : setTabletView() ? '200px' : '230px';
export const slideshowSpanText = setMobileView() ? '15px' : '25px';