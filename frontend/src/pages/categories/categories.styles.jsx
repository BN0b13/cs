import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const CategoriesTitle = styled.h4`
    text-align: start;
    margin-top: 10px;
`;

export const CategoriesLink = styled(Link)`
    cursor: pointer;
    text-decoration: none;
    color: ${props => props.theme.text};
    margin: auto;
`;