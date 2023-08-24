import styled from 'styled-components';

import { setMobileView } from '../../tools/mobileView';

export const CategoriesPreviewContainer = styled.div`
    padding: 10px;
`;

export const Preview = styled.div`
  display: grid;
  ${setMobileView() ? 
    'grid-template-rows: repeat(4, 1fr);'
    :
    'grid-template-columns: repeat(4, 1fr);'
    }
    column-gap: 20px;
    row-gap: 50px;
`;

export const CategoryCardContainer = styled.div`

`;