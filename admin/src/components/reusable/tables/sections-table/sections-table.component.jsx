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

const Sections = ({
    sections = [],
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
            {sections.length === 0 ?
                <Subtitle>No Sections To Display</Subtitle>
            :
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead onClick={() => sortColumn('type')}>
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
                            <TableHead onClick={() => sortColumn('position')}>
                                <ColumnContainer flexDirection={'row'}>
                                    Position
                                        {sortKey === 'position' && sortDirection === 'ASC' ?
                                                <FaAngleUp />
                                            :
                                                sortKey === 'position' && sortDirection === 'DESC' ?
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
                            <TableHead onClick={() => sortColumn('createdAt')}>
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
                    {sections.map((section, index) => {
                        const formattedDate = new Date(section.createdAt).toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"numeric"});
                        
                        return (
                            <TableRow key={index} onClick={() => window.location = `${url}/content-management/sections/${section.id}`} cursor={'pointer'}>
                                <TableData>{section.type}</TableData>
                                <TableData>{section.position}</TableData>
                                <TableData>{formattedDate}</TableData>
                            </TableRow>
                    )})}
                    </TableBody>
                </Table>
            }
        </ColumnContainer>
    )
}

export default Sections;