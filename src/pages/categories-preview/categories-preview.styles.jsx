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
  ${setMobileView() ? 
    'row-gap: 10px;'
    :
    'column-gap: 20px;'
    }
`;

export const CategoryCardContainer = styled.div`

`;