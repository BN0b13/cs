import {
    FaAngleUp,
    FaAngleDown
} from 'react-icons/fa';

import { url } from '../../../../config/router';

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

const CategoriesTable = ({ 
    categories = [],
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
            {categories.length === 0 ?
             <Subtitle>No Categories to Display</Subtitle>
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
                            <TableHead cursor={'pointer'} onClick={() => sortColumn('type')}>
                                <ColumnContainer flexDirection={'row'}>
                                    Type
                                        {sortKey === 'type' && sortDirection === 'ASC' ?
                                                <FaAngleUp />
                                            :
                                                sortKey === 'type' && sortDirection === 'DESC' ?
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
                    {categories.map((category, index) => (
                            <TableRow key={index} onClick={() => window.location = `${url}/categories/${category.id}`} cursor={'pointer'}>
                                <TableData>{category.name}</TableData>
                                <TableData>{category.description}</TableData>
                                <TableData>{category.type}</TableData>
                            </TableRow>
                    ))}
                    </TableBody>
                </Table>
            }
        </ColumnContainer>
    )
}

export default CategoriesTable;