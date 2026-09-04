import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getObjectsTotal, type MetObject } from '../../api/api.js';
import {
    Button,
    Drawer,
    Grid,
    Pagination,
    Stack,
    Typography,
} from '@mui/material';
import ObjectsList from './ObjectsList.js';
import { PAGE_COUNT } from '../../../../lib/constants.js';
import FilterDrawer from './FilterDrawer.js';
import SearchObject from '../searchObject/SearchObject.js';

export interface Props {
    setSelectedObject: React.Dispatch<React.SetStateAction<MetObject>>;
}

export default function ObjectsTable({ setSelectedObject }: Props) {
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<
        number | undefined
    >();
    const [titleSearchTerm, setTitleSearchTerm] = useState<
        string | undefined
    >();
    const [page, setPage] = useState(1);

    // Used for slowing down how fast a user clicks through pages
    const [isChangeStepDisabled, setChanegStepDisabled] = useState(false);

    const { data: total, isLoading: isTotalLoading } = useQuery({
        queryKey: ['objects', { selectedDepartmentId, titleSearchTerm }],
        queryFn: () => getObjectsTotal(selectedDepartmentId, titleSearchTerm),
    });

    if (isTotalLoading) {
        return <Typography>Loading...</Typography>;
    }

    const pageCount = Math.ceil(total / PAGE_COUNT);

    const changePage = (pageNumber: number) => {
        setChanegStepDisabled(true);
        setPage(pageNumber);
        new Promise((resolve) => setTimeout(resolve, 750)).then(() =>
            setChanegStepDisabled(false),
        );
    };

    const onFilter = (departmentId?: number, searchTerm?: string) => {
        if (departmentId !== selectedDepartmentId) {
            setSelectedDepartmentId(departmentId);
        }
        if (searchTerm !== titleSearchTerm) {
            setTitleSearchTerm(searchTerm);
        }
        setPage(1);
        setIsFilterDrawerOpen(false);
    };

    const paginationComponent = (
        <Pagination
            disabled={isChangeStepDisabled}
            count={pageCount}
            page={page}
            onChange={(_e, pageNumber) => changePage(pageNumber)}
            size={window.innerWidth < 400 ? 'small' : 'medium'}
        />
    );

    return (
        <Stack spacing={2} sx={{ maxWidth: '1000px', width: '100vw'}}>
            <Grid
                container
                sx={{ justifyContent: 'end', alignItems: 'center', paddingRight: '10px' }}
            >
                <SearchObject setSelectedObject={setSelectedObject} />
                <Button
                    variant="contained"
                    onClick={() => setIsFilterDrawerOpen(true)}
                >
                    Filter
                </Button>
            </Grid>
            {total > 0 ? (
                <>
                    {paginationComponent}
                    <ObjectsList
                        total={total}
                        page={page}
                        setSelectedObject={setSelectedObject}
                        departmentId={selectedDepartmentId}
                        title={titleSearchTerm}
                    />
                    {paginationComponent}
                </>
            ) : (
                <Typography>
                    No objects exist. Please change filter selection.
                </Typography>
            )}
            <Drawer
                open={isFilterDrawerOpen}
                onClose={() => setIsFilterDrawerOpen(false)}
                anchor="right"
            >
                <FilterDrawer
                    departmentId={selectedDepartmentId}
                    onFilter={onFilter}
                    searchTerm={titleSearchTerm}
                />
            </Drawer>
        </Stack>
    );
}
