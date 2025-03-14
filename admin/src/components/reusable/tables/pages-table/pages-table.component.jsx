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

const PagesTable = ({ 
    pages = [],
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
            {pages.length === 0 ?
                <Subtitle>No Pages To Display</Subtitle>
            :
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead cursor={'pointer'} onClick={() => sortColumn('title')}>
                                <ColumnContainer flexDirection={'row'}>
                                    Title
                                        {sortKey === 'title' && sortDirection === 'ASC' ?
                                                <FaAngleUp />
                                            :
                                                sortKey === 'title' && sortDirection === 'DESC' ?
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
                    {pages.map((page, index) => {
                        const formattedDate = new Date(page.createdAt).toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"numeric"});
                        
                        return (
                            <TableRow key={index} onClick={() => window.location = `${url}/content-management/pages/${page.id}`} cursor={'pointer'}>
                                <TableData>{page.title}</TableData>
                                <TableData>{formattedDate}</TableData>
                            </TableRow>
                    )})}
                    </TableBody>
                </Table>
            }
        </ColumnContainer>
    )
}

export default PagesTable;