import {
  FaAngleUp,
  FaAngleDown
} from 'react-icons/fa';

import { url } from '../../../../config';

import {
  ColumnContainer,
  Subtitle,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow
} from '../../../../styles/component.styles';

const RafflesTable = ({
  raffles = [],
  sortKey = '',
  setSortKey = () => {},
  sortDirection = '',
  setSortDirection = () => {},
  reloadTable = async () => {}}) => {

  const sortColumn = async (key) => {
    if(key === sortKey) {
        if(sortDirection === 'ASC') {
            setSortDirection('DESC');
            
            return await reloadTable(true);
        }

        if(sortDirection === 'DESC') {
            setSortDirection('');
            
            return await reloadTable(true);
        }
        
        setSortDirection('ASC');

        return await reloadTable(true);
    } else {
        setSortKey(key);
        setSortDirection('ASC');

        return await reloadTable(true);
    }
  }

    return (
      <ColumnContainer>
        {raffles.length === 0 ? 
          <Subtitle>No Raffles to display.</Subtitle>
        :
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead cursor={'pointer'} onClick={() => sortColumn('name')}>
                  <ColumnContainer flexDirection={'row'}>
                      Name
                        {sortKey === 'name' && sortDirection === 'ASC' ?
                                <FaAngleUp />
                            :
                                sortKey === 'name' && sortDirection === 'DESC' ?
                                    <FaAngleDown />
                                :
                                    <ColumnContainer 
                                        minHeight={'1em'} 
                                        minWidth={'1em'}
                                    >
                                    </ColumnContainer>
                        }
                  </ColumnContainer>
                </TableHead>
                <TableHead cursor={'pointer'} onClick={() => sortColumn('description')}>
                  <ColumnContainer flexDirection={'row'}>
                      Description
                        {sortKey === 'description' && sortDirection === 'ASC' ?
                                <FaAngleUp />
                            :
                                sortKey === 'description' && sortDirection === 'DESC' ?
                                    <FaAngleDown />
                                :
                                    <ColumnContainer 
                                        minHeight={'1em'} 
                                        minWidth={'1em'}
                                    >
                                    </ColumnContainer>
                        }
                  </ColumnContainer>
                </TableHead>
                <TableHead cursor={'pointer'} onClick={() => sortColumn('createdAt')}>
                  <ColumnContainer flexDirection={'row'}>
                      Date
                        {sortKey === 'createdAt' && sortDirection === 'ASC' ?
                                <FaAngleUp />
                            :
                                sortKey === 'createdAt' && sortDirection === 'DESC' ?
                                    <FaAngleDown />
                                :
                                    <ColumnContainer 
                                        minHeight={'1em'} 
                                        minWidth={'1em'}
                                    >
                                    </ColumnContainer>
                        }
                  </ColumnContainer>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {raffles.map((product, index) => {
                const formattedDate = new Date(product.createdAt).toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"numeric"});

                return (
                  <TableRow key={index}>
                    <TableData>
                    <a href={`${url}/raffles/${product.id}`}>
                    { product.name }
                    </a>
                    </TableData>
                    <TableData>
                    <a href={`${url}/categories/${product?.Category?.id || product['Category.id']}`}>
                    { product?.Category?.name || product['Category.name']}
                    </a>
                    </TableData>
                    <TableData>
                    { product.description }
                    </TableData>
                    <TableData>
                    { formattedDate }
                    </TableData>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        }
      </ColumnContainer>
    );
}

export default RafflesTable;