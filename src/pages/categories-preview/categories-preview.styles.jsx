import styled from 'styled-components';

export const CategoriesPreviewContainer = styled.div`
    padding-top: 20px;
`;

export const Preview = styled.div`
  display: grid;
  ${params => params.mobileView ? 
    'grid-template-rows: repeat(4, 1fr);'
    :
    'grid-template-columns: repeat(4, 1fr);'
    }
  ${params => params.mobileView ? 
    'row-gap: 10px;'
    :
    'column-gap: 20px;'
    }
`;

export const CategoryCardContainer = styled.div`

`;