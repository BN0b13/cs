import { pagesConfig } from '../config/cms';

export default class CMSTool {
    processHeaderNavigation = (nav) => {
        return nav.filter(item => pagesConfig[item.permission].active);
    }

    spaCheck = () => {
        return Object.values(pagesConfig).filter(page => page.active).length === 1;
    };
}