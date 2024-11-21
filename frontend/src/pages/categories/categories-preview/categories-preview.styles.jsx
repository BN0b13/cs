import styled from 'styled-components';

import { setMobileView } from '../../../tools/mobileView';

export const CategoryCardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Preview = styled.div`
  display: grid;
  ${setMobileView() ? 
    'grid-template-rows: auto'
    :
    'grid-template-columns: repeat(4, 1fr);'
    }
    column-gap: 20px;
    row-gap: 50px;
`;

export const CategoriesPreviewTitle = styled.h4`
    text-align: ${setMobileView() ? 'center' : ''};
    color: #fff;
    cursor: pointer;
`;