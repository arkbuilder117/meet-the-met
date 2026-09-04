import { Box, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getObjectsPage, type MetObject } from '../../api/api.js';
import ObjectListItem from './ObjectListitem.js';
import { PAGE_COUNT } from '../../../../lib/constants.js';

interface Props {
    total: number;
    page: number;
    setSelectedObject: React.Dispatch<React.SetStateAction<MetObject>>;
    departmentId?: number;
    title?: string;
}

export default function ObjectsList({
    total,
    page,
    departmentId,
    title,
    setSelectedObject,
}: Props) {
    const { data = [], isLoading } = useQuery({
        queryKey: ['objects-page', { page, departmentId, title }],
        queryFn: () => {
            const skip = Math.ceil((page - 1) * PAGE_COUNT);
            const remainder = total - (page - 1) * PAGE_COUNT;
            const take = remainder > PAGE_COUNT ? PAGE_COUNT : remainder;

            return getObjectsPage(skip, take, departmentId, title);
        },
        retry: 2,
        retryDelay: 5000,
    });

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Stack spacing={5} sx={{ alignItems: 'center', width: '100%' }}>
                {data.map((item) => {
                    return (
                        <ObjectListItem
                            key={item.objectID}
                            objectID={item.objectID}
                            title={item.title}
                            department={item.department}
                            onSelect={() => setSelectedObject(item)}
                        />
                    );
                })}
            </Stack>
        </Box>
    );
}
