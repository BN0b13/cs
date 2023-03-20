import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const CategoryPreviewLink = styled(Link)`
cursor: pointer;
text-decoration: none;
`;

export const CategoryPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

export const Title = styled(Link)`
  font-size: 28px;
  margin-bottom: 25px;
  cursor: pointer;
  text-decoration: none;
`;

export const CategoryPreviewTitle = styled.h2`
    text-align: start;
    margin: 2vh 0;
`;

export const Preview = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
`;

export const PreviewMobile = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  row-gap: 10px;
`;